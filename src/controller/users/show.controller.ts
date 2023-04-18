import { Controller, Get, Param } from '@nestjs/common';
import { decodeId } from 'src/common/helpers/hash-id.helper';
import { ApiResource } from 'src/resources/api.resource';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class ShowController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  async show(@Param('id') id: string): Promise<ApiResource> {
    try {
      const data = await this.userService.show(decodeId(id) as number);

      return ApiResource.successResponse(data);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
