import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { PatientsStoreDto } from 'src/dto/patients-store.dto';
import { Patients } from 'src/entities/patient.entity';
import { PatientsService } from 'src/services/patients.service';
import { Repository } from 'typeorm';

const param: PatientsStoreDto = {
  email: 'drum@gmail.com',
  firstName: 'drum',
  lastName: 'drum',
  gender: 'male',
  phone: '',
  comment: '',
};

const patient: Patients = plainToInstance(Patients, {
  id: 1,
  email: 'drum@gmail.com',
  firstName: 'drum',
  lastName: 'drum',
  gender: 'male',
  phone: '',
  comment: '',
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
    jest.spyOn(patientRepository, 'save').mockResolvedValue(patient);

    const result = await service.create(param);
    expect(get(result, 'id', 0)).toEqual(1);
    done();
  });

  it('should be err', async (done) => {
    jest.spyOn(patientRepository, 'save').mockRejectedValue(new Error('error'));

    try {
      await service.create(param);
    } catch (err) {
      expect(get(err.getResponse(), 'errorCode')).toEqual(400003);
      expect(get(err.getResponse(), 'errorMessage')).toEqual(
        'PATIENT_CREATE_ERROR',
      );
      done();
    }
  });
});
