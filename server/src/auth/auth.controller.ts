import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const userInfo = await this.authService.login(loginDto);
    if (!userInfo) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return {
      token: userInfo.access_token,
      _id: userInfo.user.id,
    };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return {
      message: 'User registered successfully',
      user: user,
    };
  }
}
