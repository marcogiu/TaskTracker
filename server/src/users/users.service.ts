import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Update username if provided
    if (updateUserDto.username) {
      user.username = updateUserDto.username;
    }

    // Update email if provided
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    // Update password if provided and confirmed
    if (updateUserDto.password) {
      if (updateUserDto.password !== updateUserDto.confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
