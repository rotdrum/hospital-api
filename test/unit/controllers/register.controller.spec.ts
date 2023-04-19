import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { StoreController } from 'src/controller/users/store.controller';
import { UsersStoreDto } from 'src/dto/users-store.dto';
import { Users } from 'src/entities/user.entity';
import { UsersService } from 'src/services/users.service';

const param: UsersStoreDto = {
  email: 'drum@gmail.com',
  username: 'drum',
  password: 'drum',
};

describe('StoreController', () => {
  let controller: StoreController;
  let fakeService: Partial<UsersService>;

  beforeEach(async () => {
    fakeService = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeService,
        },
      ],
    }).compile();

    controller = module.get<StoreController>(StoreController);
  });

  it('should return data ok', async () => {
    const user: Users = plainToInstance(Users, {
      id: 1,
      username: 'drum',
      email: 'drum@gmail.com',
      password: 'drum',
    });

    jest.spyOn(fakeService, 'create').mockResolvedValue(user);

    const response = await controller.store(param);

    expect(get(response, 'data.id', 0)).toEqual(1);
    expect(get(response, 'data.username', '')).toEqual('drum');
  });

  it('throw an exception', async (done) => {
    jest.spyOn(fakeService, 'create').mockRejectedValue(new Error('error'));

    try {
      await controller.store(param);
    } catch (error) {
      done();
    }
  });
});
