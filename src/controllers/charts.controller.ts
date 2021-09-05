import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    ParseArrayPipe,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { Prisma, Report as ReportModel } from '@prisma/client';
import { ReportService } from '../services/report.service';
import { CompanyModel } from '../models/Company.model';
import { RouteModel } from '../models/Route.model';
import { CargoModel } from '../models/Cargo.model';
import { CustomReportCreateInput } from '../models/Report.model';
import { RouteService } from '../services/route.service';
import { CargoService } from '../services/cargo.service';
import { MomentService } from '../services/moment.service';
import { DateFormatInterceptor } from '../interceptors/dateFormat.interceptor';
import { groupBy as _groupBy, maxBy as _maxBy } from 'lodash';
import { maxFrequencyInArray } from '../utils/utils';

@Controller()
export class ChartsController {
    constructor(
        private readonly reportService: ReportService,
        private readonly routeService: RouteService,
        private readonly cargoService: CargoService,
        private readonly momentService: MomentService
    ) {}

    // @UseInterceptors(DateFormatInterceptor)
    @Get('charts/amount-per-year')
    async amountPerYear(): Promise<any> {
        const curYearGroupByMonth = await this.reportService.rawQuery(`
            SELECT MONTH(date), COUNT(id) FROM Report as t
            WHERE YEAR(t.date) = YEAR(CURRENT_DATE())
            GROUP BY MONTH(date);
        `);
        const prevYearGroupByMonth = await this.reportService.rawQuery(`
            SELECT MONTH(date), COUNT(id) FROM Report as t
            WHERE YEAR(t.date) = YEAR(DATE_SUB(CURDATE(), INTERVAL 1 YEAR))
            GROUP BY MONTH(date);
        `);

        const curYearChart = curYearGroupByMonth.map((val) => val['COUNT(id)']);
        const prevYearChart = prevYearGroupByMonth.map((val) => val['COUNT(id)']);

        // // ToDo make Pipe
        // if (!Date.parse(from) || !Date.parse(to)) {
        //     return [];
        // }
        // return await this.reportService.reports({
        //     include: { autoOwner: true, cargoOwner: true, route: true, cargo: true },
        //     where: {
        //         date: { gte: new Date(from), lte: new Date(to) },
        //     },
        //     orderBy: [{ date: Prisma.SortOrder.desc }, { created_at: Prisma.SortOrder.asc }],
        // });
        // const reports = await this.reportService.reportsGroupBy(['date', 'id'], {});
        // const groupedByYear = _groupBy(reports, (val) => new Date(val.date).getFullYear());
        // console.log("-> curYearGroupByMonth", curYearCount);
        // console.log("-> prevYearGroupByMonth", prevYearCount);
        return { curYearChart, prevYearChart };
    }
    // @HttpCode(HttpStatus.OK)
    // @Post('reports/history')
    // async history(@Body() bodyData) {
    //     const { autoNums } = bodyData;
    //     const reportsWithAutos = await this.reportService.reports({
    //         include: { autoOwner: true, cargoOwner: true, route: true, cargo: true },
    //         where: { autoNum: { in: autoNums } },
    //         orderBy: [{ date: Prisma.SortOrder.desc }, { created_at: Prisma.SortOrder.asc }],
    //     });
    //
    //     if (!reportsWithAutos.length) {
    //         return {};
    //     }
    //
    //     const reportsGroupedByAutos = _groupBy(reportsWithAutos, 'autoNum');
    //
    //     // get only last 5 reports for every auto
    //     autoNums.forEach((num) => {
    //         // if no reports for any auto create empty array for it
    //         reportsGroupedByAutos[num] = reportsGroupedByAutos[num] || [];
    //         reportsGroupedByAutos[num] = reportsGroupedByAutos[num].splice(0, 5);
    //     });
    //
    //     // get most popular cargos, routes and autoOwners
    //     const allCargoIds = [],
    //         allRouteIds = [],
    //         allCargoOwnerIds = [];
    //     autoNums.forEach((num) => {
    //         reportsGroupedByAutos[num].forEach((report) => {
    //             report.cargoId && allCargoIds.push(report.cargoId);
    //             report.routeId && allRouteIds.push(report.routeId);
    //             report.cargoOwnerId && allCargoOwnerIds.push(report.cargoOwnerId);
    //         });
    //     });
    //     const maxCargoId = maxFrequencyInArray(allCargoIds),
    //         maxRouteId = maxFrequencyInArray(allRouteIds),
    //         maxCargoOwnerId = maxFrequencyInArray(allCargoOwnerIds);
    //
    //     // get most popular rates
    //     const allAutoNumRates = {};
    //     autoNums.forEach((num) => {
    //         allAutoNumRates[num] = [];
    //         reportsGroupedByAutos[num].forEach((report) => {
    //             report.rate && allAutoNumRates[num].push(report.rate);
    //         });
    //     });
    //
    //     const maxAutoNumRates = {};
    //     autoNums.forEach((num) => {
    //         maxAutoNumRates[num] = maxFrequencyInArray(allAutoNumRates[num]);
    //     });
    //
    //     return {
    //         cargoId: maxCargoId,
    //         routeId: maxRouteId,
    //         cargoOwnerId: maxCargoOwnerId,
    //         autoNumRates: maxAutoNumRates,
    //     };
    // }
}
