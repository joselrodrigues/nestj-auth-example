import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './auth.entity';
import { AuthCrendentialsDto } from './dto/auth-user.dto';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
  ) {}

  async createUser(authCrendentials: AuthCrendentialsDto) {
    const { username, password } = authCrendentials;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.authRepository.create({
      username,
      password: hashPassword,
    });

    await this.authRepository.save(user);
  }

  async findUser(username: string): Promise<User> {
    return await this.authRepository.findOneByOrFail({ username });
  }
}
