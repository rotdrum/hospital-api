import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { Patients } from 'src/entities/patient.entity';
import { PatientsService } from 'src/services/patients.service';
import { Repository } from 'typeorm';

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
    jest.spyOn(patientRepository, 'find').mockResolvedValue(patients);

    const result = await service.get();
    expect(get(result, 'length', 0)).toEqual(3);
    done();
  });

  it('should be empty', async (done) => {
    jest.spyOn(patientRepository, 'find').mockResolvedValue(null);

    const result = await service.get();
    expect(result).toEqual([]);
    done();
  });
});
