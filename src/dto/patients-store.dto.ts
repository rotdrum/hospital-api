import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PatientsStoreDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  gender: string;

  @IsOptional()
  @Transform(({ value }) => (value ? value.toLowerCase() : ''))
  @IsEmail()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  comment: string;
}
