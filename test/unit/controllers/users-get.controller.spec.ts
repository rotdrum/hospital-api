import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { GetController } from 'src/controller/users/get.controller';
import { Users } from 'src/entities/user.entity';
import { UsersService } from 'src/services/users.service';

describe('GetController', () => {
  let controller: GetController;
  let fakeService: Partial<UsersService>;

  beforeEach(async () => {
    fakeService = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeService,
        },
      ],
    }).compile();

    controller = module.get<GetController>(GetController);
  });

  it('should return data ok', async () => {
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

    jest.spyOn(fakeService, 'get').mockResolvedValue(users);

    const response = await controller.get();

    expect(get(response, 'data', []).length).toEqual(3);
  });
});
