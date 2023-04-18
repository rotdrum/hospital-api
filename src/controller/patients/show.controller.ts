import { Controller, Get, Param } from '@nestjs/common';
import { decodeId } from 'src/common/helpers/hash-id.helper';
import { ApiResource } from 'src/resources/api.resource';
import { PatientsService } from 'src/services/patients.service';

@Controller('patients')
export class ShowController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get(':id')
  async show(@Param('id') id: string): Promise<ApiResource> {
    try {
      const data = await this.patientsService.show(decodeId(id) as number);

      return ApiResource.successResponse(data);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
