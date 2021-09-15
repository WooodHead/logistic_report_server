import { Module } from '@nestjs/common';
import { AutoService } from './auto.service';
import { AutoController } from './auto.controller';
import { PrismaService } from '../../services/prisma.service';

@Module({
    providers: [AutoService, PrismaService],
    exports: [],
    controllers: [AutoController],
})
export class AutoModule {}
