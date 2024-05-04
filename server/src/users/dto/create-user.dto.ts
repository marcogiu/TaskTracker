import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Indirizzo email non valido' })
  email: string;

  @IsString({ message: 'La password deve essere una stringa' })
  @MinLength(8, { message: 'La password deve contenere almeno 8 caratteri' })
  password: string;

  @IsString({ message: "L'username deve essere una stringa" })
  @MinLength(4, { message: "L'username deve contenere almeno 4 caratteri" })
  @IsNotEmpty({ message: "L'username non può essere vuoto" })
  username: string;
}
