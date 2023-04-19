import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { GetController } from 'src/controller/patients/get.controller';
import { Patients } from 'src/entities/patient.entity';
import { PatientsService } from 'src/services/patients.service';

describe('GetController', () => {
  let controller: GetController;
  let fakeService: Partial<PatientsService>;

  beforeEach(async () => {
    fakeService = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetController],
      providers: [
        {
          provide: PatientsService,
          useValue: fakeService,
        },
      ],
    }).compile();

    controller = module.get<GetController>(GetController);
  });

  it('should return data ok', async () => {
    const patients = [
      plainToInstance(Patients, {
        id: 1,
        firstName: 'fff',
        lastName: 'lll',
        gender: 'ggg',
      }),
      plainToInstance(Patients, {
        id: 2,
        firstName: 'fff',
        lastName: 'lll',
        gender: 'ggg',
      }),
      plainToInstance(Patients, {
        id: 3,
        firstName: 'fff',
        lastName: 'lll',
        gender: 'ggg',
      }),
    ];

    jest.spyOn(fakeService, 'get').mockResolvedValue(patients);

    const response = await controller.get();

    expect(get(response, 'data', []).length).toEqual(3);
  });

  it('throw an exception', async (done) => {
    jest.spyOn(fakeService, 'get').mockRejectedValue(new Error('error'));

    try {
      await controller.get();
    } catch (error) {
      done();
    }
  });
});
