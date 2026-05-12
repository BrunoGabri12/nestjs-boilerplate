import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const BearerToken = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const auth = request.headers.authorization ?? '';
    return auth.replace(/^Bearer\s+/i, '');
  },
);
