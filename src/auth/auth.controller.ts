import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthCrendentialsDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async singUp(@Body() authCrendentials: AuthCrendentialsDto): Promise<void> {
    try {
      return await this.authService.signUp(authCrendentials);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('Username already exists');
      else throw new InternalServerErrorException();
    }
  }

  @Post('/signin')
  async signIn(
    @Body() authCrendentials: AuthCrendentialsDto,
  ): Promise<{ accessToken: string }> {
    try {
      const { accessToken } = await this.authService.signIn(authCrendentials);
      if (!accessToken) {
        throw new Error();
      }
      return { accessToken };
    } catch (error) {
      throw new NotFoundException('Your credentials are not valid');
    }
  }
}
