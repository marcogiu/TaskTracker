import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environments } from 'config/enviroments';

@Module({
  imports: [
    AuthModule,
    TaskModule,
    UsersModule,
    MongooseModule.forRoot(environments.mongoUri, { dbName: 'TaskTracker' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
