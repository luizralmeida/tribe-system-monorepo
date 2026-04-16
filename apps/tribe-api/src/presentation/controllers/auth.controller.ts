import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/auth/login.use-case.js';
import { LoginDto } from '../../application/dtos/auth/login.dto.js';
import { AuthResponseDto, AuthUserDto } from '../../application/dtos/auth/auth-response.dto.js';
import { Public } from '../../infrastructure/auth/decorators/public.decorator.js';

interface AuthenticatedRequest {
  user: AuthUserDto;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.loginUseCase.execute(loginDto);
  }

  @Get('me')
  getProfile(@Request() req: AuthenticatedRequest): AuthUserDto {
    return req.user;
  }
}
