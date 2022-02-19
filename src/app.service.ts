import { Injectable, ServiceUnavailableException } from '@nestjs/common';

@Injectable()
export class AppService {
    constructor() {}

    public readonly title = 'Mobius';

    public async healthCheck(): Promise<object> {
        return {
            statusCode: 200,
            message: this.title + ' is up and running',
            date: new Date()
        };
    }
}
