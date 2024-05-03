import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    // Apply the updates from DTO
    user.username = updateUserDto.username;
    user.email = updateUserDto.email;
    if (updateUserDto.password) {
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return user.save();
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    const { password, username } = loginDto;
    const user = await this.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordsMatch = await this.checkPassword(password, user.password);
    if (!passwordsMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async checkPassword(
    enteredPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, storedPassword);
  }
}
