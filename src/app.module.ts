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

@Module({
    imports: [HttpModule],
    controllers: [UserController, AutoController, CompanyController, AutoBrandController, LardiTransController],
    providers: [UserService, AutoService, PrismaService, CompanyService, AutoBrandService, LardiTransService],
})
export class AppModule {}
