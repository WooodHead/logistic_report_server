import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './modules/auth/auth.module';
import { AutoModule } from './modules/auto/auto.module';
import { ReportModule } from './modules/report/report.module';
import { AutoBrandModule } from './modules/autoBrand/autoBrand.module';
import { CompanyModule } from './modules/company/company.module';
import { ConfigModule } from '@nestjs/config';
// import { StripeModule } from './modules/stripe/stripe.module';
import { LiqPayModule } from './modules/liqpay/liqpay.module';
import { LardiTransModule } from './modules/lardi-trans/lardi-trans.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';

@Module({
    imports: [
        HttpModule,
        AuthModule,
        AutoModule,
        ReportModule,
        AutoBrandModule,
        CompanyModule,
        // StripeModule,
        LiqPayModule,
        LardiTransModule,
        ConfigModule.forRoot(),
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
