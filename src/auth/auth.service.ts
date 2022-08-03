import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthRepository } from './auth.repository';
import { AuthCrendentialsDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}
  signUp(authCrendentials: AuthCrendentialsDto): Promise<void> {
    return this.authRepository.createUser(authCrendentials);
  }

  async signIn(authCrendentials: AuthCrendentialsDto): Promise<boolean> {
    const { username, password } = authCrendentials;
    const user = await this.authRepository.findUser(username);
    const isValidPassword = await bcrypt.compare(password, user?.password);

    return isValidPassword;
  }
}
