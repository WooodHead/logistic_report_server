import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { PrismaService } from './services/prisma.service';
import { AutoController } from './controllers/auto.controller';
import { AutoService } from './services/auto.service';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { AutoBrandController } from './controllers/autoBrand.controller';
import { AutoBrandService } from './services/autoBrand.service';

@Module({
    imports: [],
    controllers: [UserController, AutoController, CompanyController, AutoBrandController],
    providers: [UserService, AutoService, PrismaService, CompanyService, AutoBrandService],
})
export class AppModule {}
