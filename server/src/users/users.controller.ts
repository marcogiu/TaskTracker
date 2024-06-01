// src/users/users.controller.ts
import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<User[]> {
    console.log('Tutti gli utenti');
    const users = await this.usersService.findAll();
    console.log('Fetched users:', users);
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
