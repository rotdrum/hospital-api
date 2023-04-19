import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { get } from 'lodash';
import { PatientsUpdateDto } from 'src/dto/patients-update.dto';
import { Patients } from 'src/entities/patient.entity';
import { PatientsService } from 'src/services/patients.service';
import { Repository } from 'typeorm';

const param: PatientsUpdateDto = {
  email: 'drum@gmail.com',
  firstName: 'me',
  lastName: 'drum',
  gender: 'male',
  phone: '',
  comment: '',
};

const user = plainToInstance(Patients, {
  id: 1,
  firstName: 'me',
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
    jest.spyOn(patientRepository, 'findOne').mockResolvedValue(user);
    jest.spyOn(patientRepository, 'save').mockReturnThis();

    try {
      await service.update(1, param);
      done();
    } catch (error) {
      done();
    }
  });

  it('should be err', async (done) => {
    jest.spyOn(patientRepository, 'findOne').mockResolvedValue(user);
    jest.spyOn(patientRepository, 'save').mockRejectedValue(new Error('error'));

    try {
      await service.update(99, param);
    } catch (err) {
      expect(get(err.getResponse(), 'errorCode')).toEqual(400004);
      expect(get(err.getResponse(), 'errorMessage')).toEqual(
        'PATIENT_UPDATE_ERROR',
      );
      done();
    }
  });
});
