import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { encodeId } from 'src/common/helpers/hash-id.helper';
import { ModifyController } from 'src/controller/patients/modify.controller';
import { PatientsUpdateDto } from 'src/dto/patients-update.dto';
import { Patients } from 'src/entities/patient.entity';
import { PatientsService } from 'src/services/patients.service';

const param: PatientsUpdateDto = {
  email: 'drum@gmail.com',
  firstName: 'me',
  lastName: 'drum',
  gender: 'male',
  phone: '',
  comment: '',
};

describe('ModifyController', () => {
  let controller: ModifyController;
  let fakeService: Partial<PatientsService>;

  beforeEach(async () => {
    fakeService = {
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModifyController],
      providers: [
        {
          provide: PatientsService,
          useValue: fakeService,
        },
      ],
    }).compile();

    controller = module.get<ModifyController>(ModifyController);
  });

  it('should return data ok', async () => {
    const patient: Patients = plainToInstance(Patients, {
      id: 1,
      firstName: 'fff',
      lastName: 'lll',
      gender: 'ggg',
    });

    jest.spyOn(fakeService, 'update').mockResolvedValue(patient);

    const response = await controller.modify(encodeId(1), param);

    expect(get(response, 'data.id', 0)).toEqual(1);
    expect(get(response, 'data.firstName', '')).toEqual('fff');
  });

  it('throw an exception', async (done) => {
    jest.spyOn(fakeService, 'update').mockRejectedValue(new Error('error'));

    try {
      await controller.modify(encodeId(1), param);
    } catch (error) {
      done();
    }
  });
});
