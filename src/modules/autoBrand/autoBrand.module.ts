import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { AutoBrandService } from './autoBrand.service';
import { AutoBrandController } from './autoBrand.controller';

@Module({
    controllers: [AutoBrandController],
    providers: [AutoBrandService, PrismaService],
    exports: [],
})
export class AutoBrandModule {}
