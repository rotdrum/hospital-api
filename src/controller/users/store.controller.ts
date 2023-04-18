import { Body, Controller, Post } from '@nestjs/common';
import { UsersStoreDto } from 'src/dto/users-store.dto';
import { ApiResource } from 'src/resources/api.resource';
import { UsersService } from 'src/services/users.service';

@Controller('register')
export class StoreController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async store(@Body() params: UsersStoreDto): Promise<ApiResource> {
    try {
      const data = await this.userService.create(params);

      return ApiResource.successResponse(data);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
