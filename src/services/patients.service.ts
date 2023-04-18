import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patients } from 'src/entities/patient.entity';
import { PatientException } from 'src/exceptions/app/patient.exception';
import { PatientsStoreDto } from 'src/dto/patients-store.dto';
import { PatientsUpdateDto } from 'src/dto/patients-update.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patients)
    private patientRepository: Repository<Patients>,
  ) {}

  /**
   * @returns Patients | object
   */
  async get(): Promise<Patients | object> {
    let patient = await this.patientRepository.find();

    if (!patient) {
      patient = [];
    }

    return patient;
  }

  /**
   * @param id
   * @returns Patients
   */
  async show(id: number): Promise<Patients> {
    const patient = await this.patientRepository.findOne(id);

    if (!patient) {
      throw PatientException.notFound();
    }

    return patient;
  }

  /**
   * @param id
   * @returns []
   */
  async softDelete(id: number): Promise<[]> {
    const patient = await this.show(id);

    if (!patient) {
      throw PatientException.notFound();
    }

    try {
      await this.patientRepository.softDelete(id);
    } catch (error) {
      throw PatientException.deleteError(error);
    }

    return [];
  }

  /**
   * @param id
   * @param params
   * @returns []
   */
  async update(id: number, params: PatientsUpdateDto): Promise<Patients> {
    const patient = await this.show(id);

    if (!patient) {
      throw PatientException.notFound();
    }

    try {
      return await this.patientRepository.save({
        id: id,
        firstName: params.firstName,
        lastName: params.lastName,
        gender: params.gender,
        phone: params?.phone || patient.phone,
        email: params?.email || patient.email,
        comment: params?.comment || patient.comment,
      });
    } catch (error) {
      throw PatientException.updateError(error);
    }
  }

  /**
   * @param params
   * @returns Patients
   */
  async create(params: PatientsStoreDto): Promise<Patients> {
    try {
      return await this.patientRepository.save({
        firstName: params.firstName,
        lastName: params.lastName,
        gender: params.gender,
        phone: params?.phone || null,
        email: params?.email || null,
        comment: params?.comment || null,
      });
    } catch (error) {
      throw PatientException.createError(error);
    }
  }
}
