import { Module } from '@nestjs/common';
import { StripeModule as NestStripeModule } from 'nestjs-stripe';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import stripeConfig from '../../config/stripe.config';
import { UserModule } from '../user/user.module';
import { SubscriptionService } from './subscription.service';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../../services/prisma.service';

@Module({
    controllers: [StripeController],
    imports: [UserModule, HttpModule, AuthModule, NestStripeModule.forRoot(stripeConfig)],
    exports: [
        // StripeService
    ],
    providers: [StripeService, ConfigService, SubscriptionService, PrismaService],
})
export class StripeModule {}
