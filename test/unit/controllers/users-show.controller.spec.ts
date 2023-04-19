import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { encodeId } from 'src/common/helpers/hash-id.helper';
import { ShowController } from 'src/controller/users/show.controller';
import { Users } from 'src/entities/user.entity';
import { UsersService } from 'src/services/users.service';

describe('ShowController', () => {
  let controller: ShowController;
  let fakeService: Partial<UsersService>;

  beforeEach(async () => {
    fakeService = {
      show: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeService,
        },
      ],
    }).compile();

    controller = module.get<ShowController>(ShowController);
  });

  it('should return data ok', async () => {
    const user: Users = plainToInstance(Users, {
      id: 1,
      username: 'drum',
      email: 'drum@gmail.com',
      password: 'drum',
    });

    jest.spyOn(fakeService, 'show').mockResolvedValue(user);

    const response = await controller.show(encodeId(1));

    expect(get(response, 'data.id', 0)).toEqual(1);
    expect(get(response, 'data.username', '')).toEqual('drum');
  });

  it('throw an exception', async (done) => {
    jest.spyOn(fakeService, 'show').mockRejectedValue(new Error('error'));

    try {
      await controller.show(encodeId(1));
    } catch (error) {
      done();
    }
  });
});
