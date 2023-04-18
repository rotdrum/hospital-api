import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestroyController } from 'src/controller/patients/destroy.controller';
import { GetController } from 'src/controller/patients/get.controller';
import { ModifyController } from 'src/controller/patients/modify.controller';
import { ShowController } from 'src/controller/patients/show.controller';
import { StoreController } from 'src/controller/patients/store.controller';
import { Patients } from 'src/entities/patient.entity';
import { PatientsService } from 'src/services/patients.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patients])],
  providers: [PatientsService],
  controllers: [
    GetController,
    ShowController,
    StoreController,
    DestroyController,
    ModifyController,
  ],
})
export class PatientModule {}
