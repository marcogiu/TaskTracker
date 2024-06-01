// src/users/dto/update-user.dto.ts
import {
  IsString,
  IsOptional,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, {
    message: 'Password is too short. It should be at least 8 characters.',
  })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
    message:
      'Password too weak. It should contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, {
    message:
      'Confirm Password is too short. It should be at least 8 characters.',
  })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
    message:
      'Confirm Password too weak. It should contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  confirmPassword?: string;
}
