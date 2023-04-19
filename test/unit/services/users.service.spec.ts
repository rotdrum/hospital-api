import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { Users } from 'src/entities/user.entity';
import { UsersService } from 'src/services/users.service';
import { Repository } from 'typeorm';

const users = [
  plainToInstance(Users, {
    id: 1,
    username: 'ddd',
    email: 'ddd',
    password: 'ddd',
  }),
  plainToInstance(Users, {
    id: 2,
    username: 'ddd',
    email: 'ddd',
    password: 'ddd',
  }),
  plainToInstance(Users, {
    id: 3,
    username: 'ddd',
    email: 'ddd',
    password: 'ddd',
  }),
];

describe('UsersService', () => {
  let userRepository: Repository<Users>;
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Users])],
      providers: [UsersService, JwtService],
    }).compile();

    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
    service = module.get<UsersService>(UsersService);
  });

  it('should be ok', async () => {
    // Users
    jest.spyOn(userRepository, 'find').mockResolvedValue(users);

    const result = await service.get();
    expect(get(result, 'length', 0)).toEqual(3);
  });
});
