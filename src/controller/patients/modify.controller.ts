import { Body, Controller, Param, Patch } from '@nestjs/common';
import { decodeId } from 'src/common/helpers/hash-id.helper';
import { PatientsUpdateDto } from 'src/dto/patients-update.dto';
import { ApiResource } from 'src/resources/api.resource';
import { PatientsService } from 'src/services/patients.service';

@Controller('patients')
export class ModifyController {
  constructor(private readonly patientsService: PatientsService) {}

  @Patch(':id')
  async store(
    @Param('id') id: string,
    @Body() params: PatientsUpdateDto,
  ): Promise<ApiResource> {
    try {
      const data = await this.patientsService.update(
        decodeId(id) as number,
        params,
      );

      return ApiResource.successResponse(data);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
