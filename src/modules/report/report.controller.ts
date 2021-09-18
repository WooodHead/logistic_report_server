import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    ParseArrayPipe,
    Post,
    Query, UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Prisma, Report as ReportModel } from '@prisma/client';
import { ReportService } from './report.service';
import { CompanyModel } from '../../models/Company.model';
import { RouteModel } from '../../models/Route.model';
import { CargoModel } from '../../models/Cargo.model';
import { CustomReportCreateInput } from '../../models/Report.model';
import { RouteService } from '../route/route.service';
import { CargoService } from '../cargo/cargo.service';
import { DateFormatInterceptor } from '../../interceptors/dateFormat.interceptor';
import { groupBy as _groupBy, maxBy as _maxBy } from 'lodash';
import { maxFrequencyInArray } from '../../utils/utils';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('reports')
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
        private readonly routeService: RouteService,
        private readonly cargoService: CargoService
    ) {}

    @UseInterceptors(DateFormatInterceptor)
    @Get()
    async index(@Query('from') from, @Query('to') to): Promise<ReportModel[]> {
        // ToDo make Pipe
        if (!Date.parse(from) || !Date.parse(to)) {
            return [];
        }
        return await this.reportService.reports({
            include: { autoOwner: true, cargoOwner: true, route: true, cargo: true },
            where: {
                date: { gte: new Date(from), lte: new Date(to) },
            },
            orderBy: [{ date: Prisma.SortOrder.desc }, { created_at: Prisma.SortOrder.asc }],
        });
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    async store(
        @Body(new ParseArrayPipe({ items: CustomReportCreateInput }))
        reportData: CustomReportCreateInput[]
    ) {
        const butchData: Prisma.ReportCreateInput[] = [];
        const { route, cargo } = reportData[0]; // TODo? [0]

        const routeFromDb = await this.routeService.findOrCreateRoute(route);
        const cargoFromDb = await this.cargoService.findOrCreateCargo(cargo);

        reportData.forEach((report: CustomReportCreateInput) => {
            const { autoOwner, cargoOwner, date, ...restData } = report;

            butchData.push({
                ...restData,
                date: new Date(date),
                route: RouteModel.createOrConnect(routeFromDb),
                cargo: CargoModel.createOrConnect(cargoFromDb),
                autoOwner: CompanyModel.connectCompany(autoOwner),
                cargoOwner: CompanyModel.createOrConnect(cargoOwner),
            });
        });

        await this.reportService.createReports(butchData);
        return {};
    }

    @HttpCode(HttpStatus.OK)
    @Post('history')
    async history(@Body() bodyData) {
        const { autoNums } = bodyData;
        const reportsWithAutos = await this.reportService.reports({
            include: { autoOwner: true, cargoOwner: true, route: true, cargo: true },
            where: { autoNum: { in: autoNums } },
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
        const maxCargoId = maxFrequencyInArray(allCargoIds),
            maxRouteId = maxFrequencyInArray(allRouteIds),
            maxCargoOwnerId = maxFrequencyInArray(allCargoOwnerIds);

        // get most popular rates
        const allAutoNumRates = {};
        autoNums.forEach((num) => {
            allAutoNumRates[num] = [];
            reportsGroupedByAutos[num].forEach((report) => {
                report.rate && allAutoNumRates[num].push(report.rate);
            });
        });

        const maxAutoNumRates = {};
        autoNums.forEach((num) => {
            maxAutoNumRates[num] = maxFrequencyInArray(allAutoNumRates[num]);
        });

        return {
            cargoId: maxCargoId,
            routeId: maxRouteId,
            cargoOwnerId: maxCargoOwnerId,
            autoNumRates: maxAutoNumRates,
        };
    }
}
