import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { LoginController } from 'src/controller/users/login.controller';
import { Users } from 'src/entities/user.entity';
import { UsersService } from 'src/services/users.service';
import * as bcrypt from 'bcrypt';

describe('LoginController', () => {
  let controller: LoginController;
  let fakeService: Partial<UsersService>;

  beforeEach(async () => {
    fakeService = {
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeService,
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should return data ok', async () => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash('drum', salt);
    const user: Users = plainToInstance(Users, {
      id: 1,
      username: 'drum',
      email: 'drum@gmail.com',
      password: hash,
    });

    jest.spyOn(fakeService, 'login').mockResolvedValue(user);

    const response = await controller.login({
      email: 'drum@gmail.com',
      password: 'drum',
    });

    expect(get(response, 'data.id', 0)).toEqual(1);
    expect(get(response, 'data.username', '')).toEqual('drum');
  });

  it('throw an exception', async (done) => {
    jest.spyOn(fakeService, 'login').mockRejectedValue(new Error('error'));

    try {
      await controller.login({
        email: 'drum@gmail.com',
        password: 'drum',
      });
    } catch (error) {
      done();
    }
  });
});
