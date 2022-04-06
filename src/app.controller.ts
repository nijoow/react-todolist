import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Res,
  Logger,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Response } from 'express';
import { UsersService } from './users/users.service';
import { JwtRefreshGuard } from './auth/jwt-refresh.guard';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, ...options } =
      await this.authService.login(req.user);

    this.usersService.setCurrentRefreshToken(refreshToken, req.user.username);
    res.cookie('Refresh', refreshToken, options);
    return { accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh')
  refresh(@Request() req) {
    const user = req.user;
    const accessToken = this.authService.getNewAccessToken(user);
    return { accessToken };
  }
}
