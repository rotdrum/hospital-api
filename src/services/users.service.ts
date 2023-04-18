import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { AuthException } from 'src/exceptions/app/auth.exception';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersStoreDto } from 'src/dto/users-store.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  /**
   * @returns Users | object
   */
  async get(): Promise<Users | object> {
    let user = await this.userRepository.find();

    if (!user) {
      user = [];
    }

    return user;
  }

  /**
   * @param id
   * @returns Users
   */
  async show(id: number): Promise<Users> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw AuthException.userNotFound();
    }

    return user;
  }

  /**
   * @param param
   * @returns Users
   */
  async findUser(param: any): Promise<Users> {
    const user = await this.userRepository.findOne({
      username: param?.username,
      email: param?.email,
    });

    return user;
  }

  /**
   * @param params
   * @returns Users
   */
  async create(params: UsersStoreDto): Promise<Users> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(params.password, salt);

    return await this.userRepository.save({
      email: params.email,
      password: hash,
      username: params.username,
    });
  }
}
