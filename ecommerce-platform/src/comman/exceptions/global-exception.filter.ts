import { Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { setErrorResponse, setResponse } from '../set-response';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('GlobalExceptionFilter');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception.response && exception.response.message) {
      // If exception has a response with message (e.g., TypeORM validation errors)
      message = exception.response.message;
    }

    this.logger.error(`Exception on ${request.method} ${request.url}`, exception.stack);

    response.status(status).json(setErrorResponse(true,message,[message]));
  }
}
