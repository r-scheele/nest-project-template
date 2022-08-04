import { Module, INestApplication } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as Joi from "joi";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmConfigService } from "./utils/database/typeorm-config.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_URI: Joi.string(),
      }),
      envFilePath: `.env`,
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get("PORT");
  }

  /**
   *
   * @param app  - Nest application
   * @returns string - base url
   */
  static getBaseUrl(app: INestApplication): string {
    let baseUrl = app.getHttpServer().address().address;
    if (baseUrl === "0.0.0.0" || baseUrl === "::") {
      return (baseUrl = "localhost");
    }
  }
}
