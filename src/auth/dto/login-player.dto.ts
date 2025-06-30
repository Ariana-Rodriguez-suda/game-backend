import { IsString } from 'class-validator';

export class LoginPlayerDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
