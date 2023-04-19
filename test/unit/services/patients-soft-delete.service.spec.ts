import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { Patients } from 'src/entities/patient.entity';
import { PatientsService } from 'src/services/patients.service';
import { Repository } from 'typeorm';

const user = plainToInstance(Patients, {
  id: 1,
  firstName: 'fff',
  lastName: 'lll',
  gender: 'ggg',
});

describe('PatientsService', () => {
  let patientRepository: Repository<Patients>;
  let service: PatientsService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Patients])],
      providers: [PatientsService, JwtService],
    }).compile();

    patientRepository = module.get<Repository<Patients>>(
      getRepositoryToken(Patients),
    );
    service = module.get<PatientsService>(PatientsService);
  });

  it('should be ok', async (done) => {
    jest.spyOn(patientRepository, 'findOne').mockResolvedValue(user);
    jest.spyOn(patientRepository, 'softDelete').mockReturnThis();

    try {
      await service.softDelete(1);
      done();
    } catch (error) {
      done();
    }
  });

  it('should be err', async (done) => {
    jest.spyOn(patientRepository, 'findOne').mockResolvedValue(user);
    jest
      .spyOn(patientRepository, 'softDelete')
      .mockRejectedValue(new Error('error'));

    try {
      await service.softDelete(99);
    } catch (err) {
      expect(get(err.getResponse(), 'errorCode')).toEqual(400002);
      expect(get(err.getResponse(), 'errorMessage')).toEqual(
        'PATIENT_DELETE_ERROR',
      );
      done();
    }
  });
});
