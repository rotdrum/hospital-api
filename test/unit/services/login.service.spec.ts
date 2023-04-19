import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { AuthLoginDto } from 'src/dto/auth-login.dto';
import { Users } from 'src/entities/user.entity';
import { UsersService } from 'src/services/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let userRepository: Repository<Users>;
  let service: UsersService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Users])],
      providers: [UsersService, JwtService],
    }).compile();

    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
    service = module.get<UsersService>(UsersService);
  });

  it('should be ok', async (done) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash('ddd', salt);
    const param: AuthLoginDto = {
      email: 'drum@mail.com',
      password: 'ddd',
    };
    const user = plainToInstance(Users, {
      id: 1,
      username: 'ddd',
      email: 'ddd@mail.com',
      password: hash,
    });
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

    const result = await service.login(param);
    expect(get(result, 'id', 0)).toEqual(1);
    done();
  });

  it('should be err email', async (done) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash('ddd', salt);
    const param: AuthLoginDto = {
      email: 'drum@mail.c',
      password: 'ddd',
    };
    plainToInstance(Users, {
      id: 1,
      username: 'ddd',
      email: 'ddd@mail.com',
      password: hash,
    });
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

    try {
      await service.login(param);
    } catch (err) {
      expect(get(err.getResponse(), 'errorCode')).toEqual(300004);
      expect(get(err.getResponse(), 'errorMessage')).toEqual(
        'AUTH_USER_NOT_FOUND',
      );
      done();
    }
  });

  it('should be err password', async (done) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash('ddd', salt);
    const param: AuthLoginDto = {
      email: 'drum@mail.com',
      password: 'dddrr',
    };
    const user = plainToInstance(Users, {
      id: 1,
      username: 'ddd',
      email: 'ddd@mail.com',
      password: hash,
    });
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

    try {
      await service.login(param);
    } catch (err) {
      expect(get(err.getResponse(), 'errorCode')).toEqual(300004);
      expect(get(err.getResponse(), 'errorMessage')).toEqual(
        'AUTH_USER_NOT_FOUND',
      );
      done();
    }
  });
});
