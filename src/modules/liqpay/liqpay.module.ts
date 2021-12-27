import { Module } from '@nestjs/common';
import { StripeModule as NestStripeModule } from 'nestjs-stripe';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { LiqPayController } from './liqpay.controller';
import { LiqPayService } from './liqpay.service';
import stripeConfig from '../../config/stripe.config';
import { UserModule } from '../user/user.module';
import { SubscriptionService } from './subscription.service';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../../services/prisma.service';

@Module({
    controllers: [LiqPayController],
    imports: [UserModule, HttpModule, AuthModule, NestStripeModule.forRoot(stripeConfig)],
    exports: [
        // StripeService
    ],
    providers: [LiqPayService, ConfigService, SubscriptionService, PrismaService],
})
export class LiqPayModule {}
