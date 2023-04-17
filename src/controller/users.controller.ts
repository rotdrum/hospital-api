import { Controller, Get } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @Get()
  async getHello(): Promise<any> {
    return await this.appService.getHello();
  }
}
