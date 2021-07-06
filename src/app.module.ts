import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { PrismaService } from './services/prisma.service';
import { AutoController } from './controllers/auto.controller';
import { AutoService } from './services/auto.service';

@Module({
    imports: [],
    controllers: [UserController, AutoController],
    providers: [UserService, AutoService, PrismaService],
})
export class AppModule {}
