import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        console.error(error);
        // TODO!
        let status;

        if (error instanceof BadRequestException) {
            // console.log(error.getResponse());
            // const { message } = error.getResponse();
            // const resMsg = message.map(msg => ({ property: msg.property, error: msg.constraints }))
            // console.log("-> message", message);
            return response.status(HttpStatus.BAD_REQUEST).json(error);
        }

        // handle status
        if (error instanceof HttpException) {
            status = error.getStatus();
        }
        // else if (error instanceof PrismaClientValidationError) {
            // status = HttpStatus.UNPROCESSABLE_ENTITY;
        // }
        else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        // if (status === HttpStatus.BAD_REQUEST) {
        //     console.log(error);
        //     return response.status(status).json(error);
        // }
        // handle message
        if (status === HttpStatus.UNAUTHORIZED) {
            return response.status(status).render('views/401');
        }
        if (status === HttpStatus.NOT_FOUND) {
            return response.status(status).render('views/404');
        }
        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            if (process.env.NODE_ENV === 'production') {
                console.error(error.stack);
                return response.status(status).render('views/500');
            } else {
                const message = error.stack;
                return response.status(status).json('Server error');
            }
        }

        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json('Server error');
    }
}
