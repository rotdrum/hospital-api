import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { UsersStoreDto } from 'src/dto/users-store.dto';
import { Users } from 'src/entities/user.entity';
import { UsersService } from 'src/services/users.service';
import { Repository } from 'typeorm';

const param: UsersStoreDto = {
  username: 'drum',
  email: 'drum@mail.com',
  password: 'drum',
};

const user = plainToInstance(Users, {
  id: 1,
  username: 'drum',
  email: 'drum@mail.com',
  password: 'drum',
});

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
    jest.spyOn(userRepository, 'save').mockResolvedValue(user);

    const result = await service.create(param);
    expect(get(result, 'id', 0)).toEqual(1);
    done();
  });

  it('should be err', async (done) => {
    jest.spyOn(userRepository, 'save').mockRejectedValue(new Error('error'));

    try {
      await service.create(param);
    } catch (err) {
      expect(get(err.getResponse(), 'errorCode')).toEqual(300005);
      expect(get(err.getResponse(), 'errorMessage')).toEqual(
        'USER_CREATE_ERROR',
      );
      done();
    }
  });
});
