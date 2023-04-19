import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { encodeId } from 'src/common/helpers/hash-id.helper';
import { ShowController } from 'src/controller/patients/show.controller';
import { Patients } from 'src/entities/patient.entity';
import { PatientsService } from 'src/services/patients.service';

describe('ShowController', () => {
  let controller: ShowController;
  let fakeService: Partial<PatientsService>;

  beforeEach(async () => {
    fakeService = {
      show: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowController],
      providers: [
        {
          provide: PatientsService,
          useValue: fakeService,
        },
      ],
    }).compile();

    controller = module.get<ShowController>(ShowController);
  });

  it('should return data ok', async () => {
    const patient: Patients = plainToInstance(Patients, {
      id: 1,
      firstName: 'fff',
      lastName: 'lll',
      gender: 'ggg',
    });

    jest.spyOn(fakeService, 'show').mockResolvedValue(patient);

    const response = await controller.show(encodeId(1));

    expect(get(response, 'data.id', 0)).toEqual(1);
    expect(get(response, 'data.firstName', '')).toEqual('fff');
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
