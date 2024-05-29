import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UserLogin, UserLoginSchema } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UserSignup, UserSignupSchema } from './entities/userSignup.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserLogin.name, schema: UserLoginSchema },
      { name: UserSignup.name, schema: UserSignupSchema },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
  controllers: [UsersController],
})
export class UsersModule {}
