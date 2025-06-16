import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule, // <- Thêm dòng này
    JwtModule.register({
      secret: process.env.JWT_SECRET, // hoặc dùng ConfigService nếu bạn đã inject
      signOptions: { expiresIn: '10d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
