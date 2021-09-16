import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CargoService } from './cargo.service';
import { CargoController } from './cargo.controller';

@Module({
    controllers: [CargoController],
    providers: [CargoService, PrismaService],
    exports: [CargoService],
})
export class CargoModule {}
