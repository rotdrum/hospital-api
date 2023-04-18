import { Controller, Delete, Param } from '@nestjs/common';
import { decodeId } from 'src/common/helpers/hash-id.helper';
import { ApiResource } from 'src/resources/api.resource';
import { PatientsService } from 'src/services/patients.service';

@Controller('patients')
export class DestroyController {
  constructor(private readonly patientsService: PatientsService) {}

  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<ApiResource> {
    try {
      const data = await this.patientsService.softDelete(
        decodeId(id) as number,
      );

      return ApiResource.successResponse(data);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
