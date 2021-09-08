import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './filters/error.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { validatorOptions } from './config/validation-options.pipe';
import * as bodyParser from 'body-parser';
import { useContainer } from 'class-validator';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.enableCors();
    app.useGlobalFilters(new ErrorFilter());
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
