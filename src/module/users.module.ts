import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetController } from 'src/controller/users/get.controller';
import { LoginController } from 'src/controller/users/login.controller';
import { ShowController } from 'src/controller/users/show.controller';
import { StoreController } from 'src/controller/users/store.controller';
import { Users } from 'src/entities/user.entity';
import { UsersService } from 'src/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, JwtService],
  controllers: [
    GetController,
    ShowController,
    StoreController,
    LoginController,
  ],
})
export class UsersModule {}
