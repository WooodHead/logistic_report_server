import { Body, Controller, Get, ParseArrayPipe, Post, UseInterceptors } from '@nestjs/common';
import { Report as ReportModel, Prisma } from '@prisma/client';
import { ReportService } from '../services/report.service';
import { CompanyModel } from '../models/Company.model';
import { RouteModel } from '../models/Route.model';
import { CargoModel } from '../models/Cargo.model';
import { response } from 'express';
import { CustomReportCreateInput, ReportResponse } from '../models/Report.model';
import { RouteService } from '../services/route.service';
import { CargoService } from '../services/cargo.service';
import { MomentService } from '../services/moment.service';
import { DateFormatInterceptor } from '../interceptors/dateFormat.interceptor';

@Controller()
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
        private readonly routeService: RouteService,
        private readonly cargoService: CargoService,
        private readonly momentService: MomentService
    ) {}

    @UseInterceptors(DateFormatInterceptor)
    @Get('reports')
    async index(): Promise<ReportModel[]> {
        const reports = await this.reportService.reports({
            include: { autoOwner: true, cargoOwner: true, route: true, cargo: true },
        });

        return reports;
    }

    @Post('reports')
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
                autoOwner: CompanyModel.connectAutoOwner(autoOwner),
                cargoOwner: CompanyModel.connectCargoOwner(cargoOwner),
            });
        });

        const createdReports = await this.reportService.createReports(butchData);
        //
        // const params = {
        //     include: { company: true, route: true, cargo: true },
        // };

        // return this.reportService.report({ id }, params);
        return response.status(200);
    }
}
