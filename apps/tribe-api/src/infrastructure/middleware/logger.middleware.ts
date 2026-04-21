import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    // Log immediately on arrival
    this.logger.debug(`Incoming request ::: ${method} ${originalUrl}`);

    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.debug(`Completed Request: ${method} ${originalUrl} ${statusCode} - ${userAgent}`);
    });

    next();
  }
}
