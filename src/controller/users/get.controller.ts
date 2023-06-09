import { Controller, Get } from '@nestjs/common';
import { ApiResource } from 'src/resources/api.resource';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class GetController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async get(): Promise<ApiResource> {
    try {
      const data = await this.userService.get();

      return ApiResource.successResponse(data);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
