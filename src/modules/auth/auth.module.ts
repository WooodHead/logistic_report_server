import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './services/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UniqueEmailProvider } from './services/uniqueEmail.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './services/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth.guard';
import { SubscriptionService } from '../liqpay/subscription.service';
import { PrismaService } from '../../services/prisma.service';
// import { LiqPayModule } from '../liqpay/liqpay.module';

@Module({
    controllers: [AuthController],
    imports: [
        UserModule,
        PassportModule,
        ConfigModule,
        // LiqPayModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
                },
            }),
            inject: [ConfigService],
        }),
        // JwtModule.register({
        //     secret: process.env.JWT_SECRET,
        //     signOptions: { expiresIn: '60s' },
        // }),
    ],
    exports: [AuthService],
    providers: [
        AuthService,
        LocalStrategy,
        SubscriptionService,
        PrismaService,
        UniqueEmailProvider,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AuthModule {}
