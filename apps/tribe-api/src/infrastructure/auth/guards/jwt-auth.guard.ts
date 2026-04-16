import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { firstValueFrom, Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator.js';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  private readonly logger = new Logger(JwtAuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    try {
      const result = super.canActivate(context);
      const canActivate = result instanceof Observable ? await firstValueFrom(result) : await result;

      if (canActivate) {
        this.logger.log(`[canActivate] Session validated successfully`);
      }

      return canActivate;
    } catch (error) {
      this.logger.error(`[canActivate] Authentication failed: ${error.message}`);
      return false;
    }
  }
}
