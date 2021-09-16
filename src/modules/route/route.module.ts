import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';

@Module({
    controllers: [RouteController],
    providers: [RouteService, PrismaService],
    exports: [RouteService],
})
export class RouteModule {}
