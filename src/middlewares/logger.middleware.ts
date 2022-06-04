import {
  ForbiddenException,
  HttpException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.ip.toString().search('192.168.1.201') != -1) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    next();
  }
}
