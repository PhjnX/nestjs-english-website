import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { bodyLogin } from './dto/login.dto';
import { BodySignup } from './dto/signup.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() bodyLogin: bodyLogin) {
    try {
      return await this.authService.login(bodyLogin);
    } catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException('Lỗi...', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get user information
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('get-info')
  async getMyInfo(@Req() req) {
    // req.user được gắn từ validate() trong jwt.strategy.ts:
    // { userId, username, role }
    const userId = req.user.userId;
    return this.authService.getMyInfo(userId);
  }

  @Post('signup')
  async signup(@Body() bodySignup: BodySignup) {
    return this.authService.signup(bodySignup);
  }

  // --- Có thể mở lại các route dưới nếu cần ---
  // @Post('send-reset-password-email')
  // async sendResetPasswordEmail(@Body() resetPasswordDto: ResetPasswordDto) {
  //   return this.authService.sendResetPasswordEmail(resetPasswordDto);
  // }

  // @Post('reset-password')
  // async resetPassword(@Body() newPasswordDto: NewPasswordDto) {
  //   return this.authService.resetPassword(newPasswordDto);
  // }
}
