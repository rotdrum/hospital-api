import {
  NestMiddleware,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('authorization');

    if (!authorization || !(authorization as string).split(' ')[1]) {
      throw new UnauthorizedException();
    }

    const token = (authorization as string).split(' ')[1];
    if (token !== 'ss') {
      throw new UnauthorizedException();
    }

    next();
  }
}
