import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { AutoBrandController } from './controllers/autoBrand.controller';
import { LardiTransController } from './controllers/lardiTrans.controller';
import { LardiTransService } from './services/lardiTrans.service';
import { AutoBrandService } from './services/autoBrand.service';
import { HttpModule } from '@nestjs/axios';
import { RouteController } from './controllers/route.controller';
import { RouteService } from './services/route.service';
import { CargoController } from './controllers/cargo.controller';
import { CargoService } from './services/cargo.service';
import { ReportController } from './controllers/report.controller';
import { ReportService } from './services/report.service';
import { MomentService } from './services/moment.service';
import { ChartsController } from './controllers/charts.controller';
import { AuthModule } from './modules/auth/auth.module';
import { AutoModule } from './modules/auto/auto.module';

@Module({
    imports: [
        HttpModule,
        AuthModule,
        AutoModule
    ],
    controllers: [
        CompanyController,
        AutoBrandController,
        LardiTransController,
        RouteController,
        CargoController,
        ReportController,
        ChartsController,
    ],
    providers: [
        PrismaService,
        CompanyService,
        AutoBrandService,
        LardiTransService,
        RouteService,
        CargoService,
        ReportService,
        MomentService,
    ],
})
export class AppModule {}
