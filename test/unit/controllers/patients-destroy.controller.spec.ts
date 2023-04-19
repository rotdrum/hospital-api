import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { encodeId } from 'src/common/helpers/hash-id.helper';
import { DestroyController } from 'src/controller/patients/destroy.controller';
import { Patients } from 'src/entities/patient.entity';
import { PatientsService } from 'src/services/patients.service';

describe('DestroyController', () => {
  let controller: DestroyController;
  let fakeService: Partial<PatientsService>;

  beforeEach(async () => {
    fakeService = {
      softDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DestroyController],
      providers: [
        {
          provide: PatientsService,
          useValue: fakeService,
        },
      ],
    }).compile();

    controller = module.get<DestroyController>(DestroyController);
  });

  it('should return data ok', async () => {
    plainToInstance(Patients, {
      id: 1,
      firstName: 'fff',
      lastName: 'lll',
      gender: 'ggg',
    });

    jest.spyOn(fakeService, 'softDelete').mockReturnThis();

    const response = await controller.destroy(encodeId(1));

    expect(get(response, 'status.code', '')).toEqual(200);
    expect(get(response, 'status.message', '')).toEqual('OK');
  });

  it('throw an exception', async (done) => {
    jest.spyOn(fakeService, 'softDelete').mockRejectedValue(new Error('error'));

    try {
      await controller.destroy(encodeId(1));
    } catch (error) {
      done();
    }
  });
});
