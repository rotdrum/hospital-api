import {
  NestMiddleware,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('authorization');

    if (!authorization || !(authorization as string).split(' ')[1]) {
      AuthMiddleware.errorUnauthorized();
    }

    const token = (authorization as string).split(' ')[1];
    if (token !== 'ss') {
      AuthMiddleware.errorUnauthorized();
    }
    
    next();
  }

  private static errorUnauthorized() {
    throw new HttpException(
      {
        status: {
          code: HttpStatus.UNAUTHORIZED,
          message: 'UNAUTHORIZED',
        },
        error: {
          code: 100000,
          message: 'UNAUTHENTICATED',
        },
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
