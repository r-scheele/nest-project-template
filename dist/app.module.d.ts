import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class AppModule {
    private readonly configService;
    static port: number | string;
    constructor(configService: ConfigService);
    static getBaseUrl(app: INestApplication): string;
}
