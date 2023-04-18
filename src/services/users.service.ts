import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { AuthException } from 'src/exceptions/app/auth.exception';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersStoreDto } from 'src/dto/users-store.dto';
import { AuthLoginDto } from 'src/dto/auth-login.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
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

  /**
   * @param params
   * @returns Users
   */
  async login(params: AuthLoginDto): Promise<any> {
    const user = await this.userRepository.findOne({
      email: params.email,
    });

    if (!user) {
      throw AuthException.userNotFound();
    }

    const isMatch = await bcrypt.compare(params.password, user.password);

    if (!isMatch) {
      throw AuthException.userNotFound();
    }

    const payload = {
      email: user.email,
      username: user.username,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: 'secret',
    });

    return {
      ...user,
      access_token: accessToken,
    };
  }
}
