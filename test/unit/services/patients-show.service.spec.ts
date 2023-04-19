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

    const result = await service.show(1);
    expect(get(result, 'id', 0)).toEqual(1);
    done();
  });

  it('should be err', async (done) => {
    jest.spyOn(patientRepository, 'findOne').mockResolvedValue(null);

    try {
      await service.show(99);
    } catch (err) {
      expect(get(err.getResponse(), 'errorCode')).toEqual(400001);
      expect(get(err.getResponse(), 'errorMessage')).toEqual(
        'PATIENT_NOT_FOUND',
      );
      done();
    }
  });
});
