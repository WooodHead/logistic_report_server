import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { AutoBrandController } from './controllers/autoBrand.controller';
import { LardiTransController } from './controllers/lardiTrans.controller';
import { LardiTransService } from './services/lardiTrans.service';
import { AutoBrandService } from './services/autoBrand.service';
import { HttpModule } from '@nestjs/axios';
import { MomentService } from './services/moment.service';
import { ChartsController } from './modules/report/charts.controller';
import { AuthModule } from './modules/auth/auth.module';
import { AutoModule } from './modules/auto/auto.module';
import { ReportModule } from './modules/report/report.module';

@Module({
    imports: [
        HttpModule,
        AuthModule,
        AutoModule,
        ReportModule
    ],
    controllers: [
        CompanyController,
        AutoBrandController,
        LardiTransController,
    ],
    providers: [
        PrismaService,
        CompanyService,
        AutoBrandService,
        LardiTransService,
        MomentService,
    ],
})
export class AppModule {}
