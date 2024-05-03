import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const { email, username, password } = createUserDto;
    return this.usersService.createUser({ username, email, password });
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return this.usersService.validateUser(loginDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
