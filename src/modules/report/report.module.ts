import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { DateFormatInterceptor } from '../../interceptors/dateFormat.interceptor';
import { MomentService } from '../../services/moment.service';
import { CargoModule } from '../cargo/cargo.module';
import { RouteModule } from '../route/route.module';
import { ChartsController } from './charts.controller';

@Module({
    imports: [CargoModule, RouteModule],
    controllers: [ReportController, ChartsController],
    providers: [ReportService, PrismaService, DateFormatInterceptor, MomentService],
    exports: [],
})
export class ReportModule {}
