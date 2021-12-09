import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { DateFormatInterceptor } from '../../interceptors/dateFormat.interceptor';
import { MomentService } from '../../services/moment.service';
import { CargoModule } from '../cargo/cargo.module';
import { RouteModule } from '../route/route.module';
import { ChartsController } from './charts.controller';
import { CompanyService } from '../company/company.service';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [CargoModule, RouteModule],
    controllers: [ReportController, ChartsController],
    providers: [
        ReportService,
        PrismaService,
        DateFormatInterceptor,
        MomentService,
        CompanyService,
        MomentService,
        ConfigService,
    ],
    exports: [],
})
export class ReportModule {}
