import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { AuthException } from 'src/exceptions/app/auth.exception';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async get(): Promise<any> {
    return await this.userRepository.find();
  }

  async show(id: number): Promise<any> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw AuthException.userNotFound();
    }

    return user;
  }
}
