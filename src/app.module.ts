import { Module } from '@nestjs/common';
import { LardiTransController } from './controllers/lardiTrans.controller';
import { LardiTransService } from './services/lardiTrans.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './modules/auth/auth.module';
import { AutoModule } from './modules/auto/auto.module';
import { ReportModule } from './modules/report/report.module';
import { AutoBrandModule } from './modules/autoBrand/autoBrand.module';
import { CompanyModule } from './modules/company/company.module';
import { ConfigModule } from '@nestjs/config';
import { StripeModule } from './modules/stripe/stripe.module';

@Module({
    imports: [
        HttpModule,
        AuthModule,
        AutoModule,
        ReportModule,
        AutoBrandModule,
        CompanyModule,
        StripeModule,
        ConfigModule.forRoot(),
    ],
    controllers: [LardiTransController],
    providers: [LardiTransService],
})
export class AppModule {}
