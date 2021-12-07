import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    ParseArrayPipe,
    Post,
    Query,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { Prisma, Report as ReportModel } from '@prisma/client';
import { ReportService } from './report.service';
import { CompanyModel } from '../company/models/company.model';
import { RouteModel } from '../route/models/route.model';
import { CargoModel } from '../cargo/models/cargo.model';
import { ReportDto } from './models/report.dto';
import { RouteService } from '../route/route.service';
import { CargoService } from '../cargo/cargo.service';
import { DateFormatInterceptor } from '../../interceptors/dateFormat.interceptor';
import { groupBy as _groupBy, maxBy as _maxBy } from 'lodash';
import { maxFrequencyInArray } from '../../utils/utils';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { UserModel } from '../user/models/user.model';
import { CompanyService } from '../company/company.service';

// @UseGuards(AuthGuard('jwt'))
@Controller('reports')
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
        private readonly routeService: RouteService,
        private readonly cargoService: CargoService,
        private readonly companyService: CompanyService
    ) {}

    @UseInterceptors(DateFormatInterceptor)
    @Get()
    async index(
        @Query('from') from,
        @Query('to') to,
        @Req() req: { user: User }
    ): Promise<ReportModel[]> {
        // ToDo make Pipe
        if (!Date.parse(from) || !Date.parse(to)) {
            return [];
        }
        return await this.reportService.findAll({
            include: { autoOwner: true, cargoOwner: true, route: true, cargo: true },
            where: {
                date: { gte: new Date(from), lte: new Date(to) },
                userId: req.user.id,
            },
            orderBy: [{ date: Prisma.SortOrder.desc }, { created_at: Prisma.SortOrder.asc }],
        });
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    async store(
        @Body(new ParseArrayPipe({ items: ReportDto }))
        reportData: ReportDto[],
        @Req() req: { user: UserModel }
    ) {
        const butchData: Prisma.ReportCreateInput[] = [];
        const { route, cargo, cargoOwner } = reportData[0];

        const routeFromDb = await this.routeService.findOrCreateRoute({
            ...route,
            userId: req.user.id,
        });
        const cargoFromDb = await this.cargoService.findOrCreateCargo({
            ...cargo,
            userId: req.user.id,
        });
        const cargoOwnerFromDb = await this.companyService.findOrCreateCompany({
            ...cargoOwner,
            userId: req.user.id,
        });

        reportData.forEach((report: ReportDto) => {
            const { autoOwner, date, ...restData } = report;

            butchData.push({
                ...restData,
                date: new Date(date),
                route: RouteModel.connect(routeFromDb),
                cargo: CargoModel.connect(cargoFromDb),
                cargoOwner: CompanyModel.connect(cargoOwnerFromDb),
                autoOwner: CompanyModel.connect({
                    ...autoOwner,
                    userId: req.user.id,
                }),
                user: UserModel.connect(req.user),
            });
        });

        await this.reportService.createReports(butchData);
        return {};
    }

    @HttpCode(HttpStatus.OK)
    @Post('history')
    async history(@Body() bodyData, @Req() req: { user: User }) {
        const { autoNums } = bodyData;
        const reportsWithAutos = await this.reportService.findAll({
            include: { autoOwner: true, cargoOwner: true, route: true, cargo: true },
            where: {
                autoNum: { in: autoNums },
                userId: req.user.id,
            },
            orderBy: [{ date: Prisma.SortOrder.desc }, { created_at: Prisma.SortOrder.asc }],
        });

        if (!reportsWithAutos.length) {
            return {};
        }

        const reportsGroupedByAutos = _groupBy(reportsWithAutos, 'autoNum');

        // get only last 5 reports for every auto
        autoNums.forEach((num) => {
            // if no reports for any auto create empty array for it
            reportsGroupedByAutos[num] = reportsGroupedByAutos[num] || [];
            reportsGroupedByAutos[num] = reportsGroupedByAutos[num].splice(0, 5);
        });

        // get most popular cargos, routes and autoOwners
        const allCargoIds = [],
            allRouteIds = [],
            allCargoOwnerIds = [];
        autoNums.forEach((num) => {
            reportsGroupedByAutos[num].forEach((report) => {
                report.cargoId && allCargoIds.push(report.cargoId);
                report.routeId && allRouteIds.push(report.routeId);
                report.cargoOwnerId && allCargoOwnerIds.push(report.cargoOwnerId);
            });
        });
        console.log(allCargoOwnerIds);
        const maxCargoId = maxFrequencyInArray(allCargoIds),
            maxRouteId = maxFrequencyInArray(allRouteIds),
            maxCargoOwnerId = maxFrequencyInArray(allCargoOwnerIds);

        // get most popular rates
        const allAutoNumRates = {};
        autoNums.forEach((num) => {
            allAutoNumRates[num] = [];
            reportsGroupedByAutos[num].forEach((report) => {
                if (report.rate) {
                    allAutoNumRates[num].push(`${report.rate}:${report.rateUnits}`);
                }
            });
        });

        const maxAutoNumRates = {};
        autoNums.forEach((num) => {
            const autoNumRateKey = maxFrequencyInArray(allAutoNumRates[num]);
            if (autoNumRateKey) {
                const [rate, rateUnits] = autoNumRateKey.split(':');
                maxAutoNumRates[num] = { rate, rateUnits };
            }
        });

        return {
            cargoId: maxCargoId,
            routeId: maxRouteId,
            cargoOwnerId: maxCargoOwnerId,
            autoNumRates: maxAutoNumRates,
        };
    }
}
