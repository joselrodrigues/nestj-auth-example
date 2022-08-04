import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { User } from './auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { hourInSeconds } from './auth.constants';
import { JwtStrategy } from './auth.strategy';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: hourInSeconds,
        },
      }),
    }),
    ConfigModule.forRoot({ envFilePath: ['.env.dev', '.env.prod'] }),
  ],
  providers: [AuthService, AuthRepository, JwtStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, AuthRepository],
})
export class AuthModule {}
