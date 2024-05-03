import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'Username must be at least 4 characters long' })
  @MaxLength(20, { message: 'Username cannot be longer than 20 characters' })
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must include upper case and lower case letters, numbers, and symbols',
  })
  password: string;
}
