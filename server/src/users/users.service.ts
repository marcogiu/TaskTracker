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
import { generateActivationToken } from 'utils/utilities';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const activationToken = generateActivationToken();
    const user = new this.userModel({
      ...createUserDto,
      activationToken,
      isActivated: false,
    });

    await user.save();
    return user;
  }

  async sendActivationEmail(
    email: string,
    activationToken: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: 'api',
        pass: 'e21ccbb02f8bdfa15032ffd278293e89',
      },
    });

    const mailOptions = {
      from: 'gnagni.mg@gmail.com',
      to: email,
      subject: 'Activate Your Account',
      html: `Please click on the following link to activate your account: <a href="http://yourdomain.com/activate/${activationToken}">Activate Account</a>`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Activation email sent:', info.response);
    } catch (error) {
      console.error('Error sending activation email:', error);
      throw error; // Re-throw if you need to handle this error further up in your application
    }
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
    const { password, email } = loginDto;
    const user = await this.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordsMatch = await this.checkPassword(password, user.password);
    if (!passwordsMatch) {
      throw new UnauthorizedException('Password not valid');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async checkPassword(
    enteredPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, storedPassword);
  }
}
