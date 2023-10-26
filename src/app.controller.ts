import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log('demo');
  }

  @Get('')
  getHello(): string {
    return 'quiz-2.2.2';
  }

  @Get('hello')
  xinChao(): string {
    return 'hello';
  }
}
