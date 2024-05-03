import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
