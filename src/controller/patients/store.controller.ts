import { Body, Controller, Post } from '@nestjs/common';
import { PatientsStoreDto } from 'src/dto/patients-store.dto';
import { ApiResource } from 'src/resources/api.resource';
import { PatientsService } from 'src/services/patients.service';

@Controller('patients')
export class StoreController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  async store(@Body() params: PatientsStoreDto): Promise<ApiResource> {
    try {
      const data = await this.patientsService.create(params);

      return ApiResource.successResponse(data);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
