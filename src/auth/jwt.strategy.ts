import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    const secret = config.get<string>('JWT_SECRET');
    console.log('JWT_SECRET on production:', process.env.JWT_SECRET);
    if (!secret) {
      throw new UnauthorizedException(
        'JWT_SECRET environment variable is missing.',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    // Trả ra các thông tin quan trọng từ payload
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
