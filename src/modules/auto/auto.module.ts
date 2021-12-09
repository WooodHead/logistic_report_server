import { Module } from '@nestjs/common';
import { AutoService } from './auto.service';
import { AutoController } from './auto.controller';
import { PrismaService } from '../../services/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [AutoService, PrismaService, ConfigService],
    exports: [],
    controllers: [AutoController],
})
export class AutoModule {}
