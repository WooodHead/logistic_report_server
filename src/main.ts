import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './filters/error.filter';
import { BadRequestException, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { validatorOptions } from './pipes/validation-options.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalFilters(new ErrorFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            ...validatorOptions,
            exceptionFactory: (errors) => new BadRequestException(errors),
        })
    );
    await app.listen(process.env.SERVER_PORT || 3300);
}
bootstrap();
