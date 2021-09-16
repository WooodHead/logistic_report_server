import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
    controllers: [CompanyController],
    providers: [CompanyService, PrismaService],
    exports: [],
})
export class CompanyModule {}
