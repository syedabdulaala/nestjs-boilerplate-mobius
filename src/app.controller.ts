import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private appService: AppService) {}

    @Get()
    ping(): string {
        return 'PONG!';
    }

    @Get('health-check')
    async healthCheck(): Promise<object> {
        return this.appService.healthCheck();
    }
}
