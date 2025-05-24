import { Controller, Get } from '@nestjs/common';

@Controller('api/test')
export class TestController {
  @Get()
  getTestData() {
    return {
      message: 'Hello from backend!',
      timestamp: new Date().toISOString(),
      status: 'OK',
    };
  }
}
