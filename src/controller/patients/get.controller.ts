import { Controller, Get } from '@nestjs/common';
import { ApiResource } from 'src/resources/api.resource';
import { PatientsService } from 'src/services/patients.service';

@Controller('patients')
export class GetController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  async get(): Promise<ApiResource> {
    try {
      const data = await this.patientsService.get();

      return ApiResource.successResponse(data);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
