import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthRepository } from './auth.repository';
import { AuthCrendentialsDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}
  signUp(authCrendentials: AuthCrendentialsDto): Promise<void> {
    return this.authRepository.createUser(authCrendentials);
  }

  async signIn(
    authCrendentials: AuthCrendentialsDto,
  ): Promise<{ accessToken: string }> {
    let accessToken: string;
    const { username, password } = authCrendentials;
    const user = await this.authRepository.findUser(username);
    const isValidPassword = await bcrypt.compare(password, user?.password);

    if (isValidPassword) {
      const payload = { username };
      accessToken = this.jwtService.sign(payload);
    }

    return { accessToken };
  }
}
