import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { Users } from 'src/entities/user.entity';
import { UsersService } from 'src/services/users.service';
import { Repository } from 'typeorm';

const user = plainToInstance(Users, {
  id: 1,
  username: 'ddd',
  email: 'ddd@mail.com',
  password: 'ddd',
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
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

    const result = await service.findUser({
      username: 'ddd',
      email: 'ddd@mail.com',
    });
    expect(get(result, 'id', 0)).toEqual(1);
    done();
  });
});
