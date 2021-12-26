import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './filters/error.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { validatorOptions } from './config/validation-options.config';
import * as bodyParser from 'body-parser';
import { useContainer } from 'class-validator';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from 'fs';

async function bootstrap() {
    const staticAssetsPath = join(__dirname, '../assets');
    const httpsOptions = {
        key: fs.readFileSync(join(__dirname, 'ssl/private.key')),
        cert: fs.readFileSync(join(__dirname, 'ssl/certificate.crt')),
        ca: fs.readFileSync(join(__dirname, 'ssl/ca_bundle.crt')),
    };
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { httpsOptions });
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useStaticAssets(staticAssetsPath);
    app.enableCors();
    app.useGlobalFilters(new ErrorFilter());
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalPipes(
        new ValidationPipe({
            ...validatorOptions,
            // exceptionFactory: (errors) => new BadRequestException(errors),
        })
    );
    app.use(bodyParser.json({ limit: '1mb' }));
    app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
    await app.listen(process.env.SERVER_PORT || 3300);
}
bootstrap();
