import { Controller, Get } from '@nestjs/common';
import { encodeId } from 'src/common/helpers/hash-id.helper';
import { ApiResource } from 'src/resources/api.resource';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class GetController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async get(): Promise<any> {
    console.log(encodeId(1));
    try {
      const hello = await this.userService.get();

      return ApiResource.successResponse(hello);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
