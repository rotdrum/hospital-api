import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UsersModule } from './module/users.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from './exceptions/exception.filter';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './services/users.service';
import { Patients } from './entities/patient.entity';
import { PatientModule } from './module/patients.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Users, Patients],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PatientModule,
  ],
  providers: [
    JwtService,
    UsersService,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('register', 'login')
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}
