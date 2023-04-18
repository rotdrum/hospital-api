import {
  NestMiddleware,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('authorization');

    if (!authorization || !(authorization as string).split(' ')[1]) {
      throw new UnauthorizedException();
    }

    const token = (authorization as string).split(' ')[1];
    const decodeToken = this.jwtService.decode(token);

    if (!decodeToken) {
      throw new UnauthorizedException();
    }

    const user = this.userService.findUser(decodeToken);
    if (!user) {
      throw new UnauthorizedException();
    }

    next();
  }
}
