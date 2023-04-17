import {
  ExceptionFilter as ExceptionFilterInterface,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  UnprocessableEntityException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorCodes } from './constants/error-codes.constant';
import { HttpStatusMessages } from './constants/http-status-messages.constant';
import { ApiException } from './app/api.exception';
import { get } from 'lodash';

@Catch()
export class ExceptionFilter implements ExceptionFilterInterface {
  constructor() {}

  /**
   * Catchs all exception filter
   * @param exception
   * @param host
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = 0;
    let errorMessage: string = ErrorCodes[errorCode];
    let errors: string[] = [];

    if (exception instanceof Error) {
      errors = [exception.message];
    }

    const payload = {
      status: {
        code: statusCode,
        message: HttpStatusMessages[statusCode],
      },
      error: {
        code: errorCode,
        message: errorMessage,
        errors,
      },
    } as ErrorResponseInterface;

    response.status(statusCode).json(payload);
  }

  /**
   * Handles http exception
   * @param exception
   * @returns HandleHttpExceptionResponseInterface
   */
  private handleHttpException(
    exception: HttpException,
  ): HandleHttpExceptionResponseInterface {
    let errorCode = 0;
    let errorMessage: string = ErrorCodes[errorCode];
    let errors: string[] = [];

    const exceptionResponse: HttpExceptionResponseInterface =
      exception.getResponse() as HttpExceptionResponseInterface;

    if (exception instanceof UnprocessableEntityException) {
      errorCode = 900422;
      errorMessage = ErrorCodes[errorCode];
      if (Array.isArray(exceptionResponse.message)) {
        errors = exceptionResponse.message;
      } else {
        errors = exceptionResponse.message
          ? [exceptionResponse.message]
          : get(exception.getResponse(), 'error.errors', []);
      }
    }

    if (
      exception instanceof ForbiddenException ||
      exception instanceof UnauthorizedException
    ) {
      errorCode = 900403;
      errorMessage = ErrorCodes[errorCode];
    }

    if (exception instanceof ApiException) {
      errorCode = exceptionResponse.errorCode;
      errorMessage = exceptionResponse.errorMessage;
      errors = exceptionResponse.errors;
    }

    return {
      statusCode: exception.getStatus(),
      errorCode,
      errorMessage,
      errors,
    };
  }
}

interface HandleHttpExceptionResponseInterface {
  statusCode: number;
  errorCode: number;
  errorMessage: string;
  errors: string[];
}

export interface HttpExceptionResponseInterface {
  errorCode: number;
  errorMessage: string;
  errors: string[];
  message?: string | string[];
}

export interface ErrorResponseInterface {
  status: { code: number; message: string };
  error: { code: number; message: string; errors: string[] };
}
