import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { PrismaService } from './services/prisma.service';
import { AutoController } from './controllers/auto.controller';
import { AutoService } from './services/auto.service';
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
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UniqueEmailProvider } from './providers/UniqueEmail.provider';

@Module({
    imports: [HttpModule],
    controllers: [
        UserController,
        AutoController,
        CompanyController,
        AutoBrandController,
        LardiTransController,
        RouteController,
        CargoController,
        ReportController,
        ChartsController,
        AuthController,
    ],
    providers: [
        UserService,
        AutoService,
        PrismaService,
        CompanyService,
        AutoBrandService,
        LardiTransService,
        RouteService,
        CargoService,
        ReportService,
        MomentService,
        AuthService,
        UniqueEmailProvider,
    ],
})
export class AppModule {}
