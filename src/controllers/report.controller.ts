import { Body, Controller, Get, ParseArrayPipe, Post } from '@nestjs/common';
import { Report as ReportModel, Prisma } from '@prisma/client';
import { ReportService } from '../services/report.service';
import { CompanyModel } from '../models/Company.model';
import { RouteModel } from '../models/Route.model';
import { CargoModel } from '../models/Cargo.model';
import { response } from 'express';
import { CustomReportCreateInput } from '../models/Report.model';

@Controller()
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Get('reports')
    index(): Promise<ReportModel[]> {
        return this.reportService.reports({
            include: { company: true, route: true, cargo: true },
        });
    }

    @Post('reports')
    async store(
        @Body(new ParseArrayPipe({ items: CustomReportCreateInput }))
        reportData: CustomReportCreateInput[]
    ) {
        const butchData: Prisma.ReportCreateInput[] = [];

        reportData.forEach((reportData: CustomReportCreateInput) => {
            const { route, cargo, company, date, ...restData } = reportData;

            butchData.push({
                ...restData,
                date: new Date(date),
                route: RouteModel.createOrConnect(route),
                cargo: CargoModel.createOrConnect(cargo),
                company: CompanyModel.connect(company),
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
