import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'object') {
      response.status(status).json({
        ...exceptionResponse,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: exceptionResponse,
        error: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
      });
    }
  }
}
