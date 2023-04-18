import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from 'src/dto/auth-login.dto';
import { ApiResource } from 'src/resources/api.resource';
import { UsersService } from 'src/services/users.service';

@Controller('login')
export class LoginController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async login(@Body() param: AuthLoginDto): Promise<ApiResource> {
    try {
      const user = await this.usersService.login(param);

      return ApiResource.successResponse(user);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
