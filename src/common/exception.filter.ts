import { Catch, ArgumentsHost, HttpException, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { isObject } from 'util';
import { AppLogger } from './applogger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger){}

  catch(exception: unknown, host: ArgumentsHost) {

    this.logger.error(exception, 'AllExceptionsFilter');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  // public isExceptionObject(err: any): err is Error {
  //   return isObject(err) && !!(err as Error).message;
  // }
}
