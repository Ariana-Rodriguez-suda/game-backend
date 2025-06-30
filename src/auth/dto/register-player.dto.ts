import { IsString, MinLength } from 'class-validator';

export class RegisterPlayerDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(4)
  password: string;
}
