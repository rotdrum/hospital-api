import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { StoreController } from 'src/controller/patients/store.controller';
import { PatientsStoreDto } from 'src/dto/patients-store.dto';
import { Patients } from 'src/entities/patient.entity';
import { PatientsService } from 'src/services/patients.service';

const param: PatientsStoreDto = {
  email: 'drum@gmail.com',
  firstName: 'drum',
  lastName: 'drum',
  gender: 'male',
  phone: '',
  comment: '',
};

describe('StoreController', () => {
  let controller: StoreController;
  let fakeService: Partial<PatientsService>;

  beforeEach(async () => {
    fakeService = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [
        {
          provide: PatientsService,
          useValue: fakeService,
        },
      ],
    }).compile();

    controller = module.get<StoreController>(StoreController);
  });

  it('should return data ok', async () => {
    const patient: Patients = plainToInstance(Patients, {
      id: 1,
      email: 'drum@gmail.com',
      firstName: 'drum',
      lastName: 'drum',
      gender: 'male',
      phone: '',
      comment: '',
    });

    jest.spyOn(fakeService, 'create').mockResolvedValue(patient);

    const response = await controller.store(param);

    expect(get(response, 'data.id', 0)).toEqual(1);
    expect(get(response, 'data.firstName', '')).toEqual('drum');
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
