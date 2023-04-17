import { Controller, Get } from '@nestjs/common';
import { ApiResource } from 'src/resources/api.resource';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getHello(): Promise<any> {
    try {
      const hello = await this.userService.getHello();

      return ApiResource.successResponse(hello);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
