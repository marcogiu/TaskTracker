import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to TaskTracker server!';
  }

  checkHealth(): string {
    return 'OK';
  }
}
