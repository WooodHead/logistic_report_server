import {
    ExceptionFilter,
    Catch,
    HttpException,
    ArgumentsHost,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ErrorFilter implements ExceptionFilter {
    private readonly logger = new Logger(ErrorFilter.name);

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorMsg: string | Record<string, any> = 'Internal server error';

        if (exception instanceof HttpException) {
            let { message } = exception.getResponse() as { message: string };
            message = Array.isArray(message) ? message.pop() : message;
            statusCode = exception.getStatus();
            errorMsg = message || exception.getResponse() || errorMsg;
            this.logger.error(`${exception.message}. Message: ${JSON.stringify(errorMsg)}`);
        } else {
            this.logger.error(exception, exception.stack);
        }

        response.status(statusCode).json({
            statusCode,
            message: errorMsg,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
