import { IsString, IsInt, IsNumberString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsNumberString()
  age: number;


}