import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "./utils/swagger";
import { Logger } from "@nestjs/common";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger("Main");

  setupSwagger(app);
  app.use(helmet());
  await app.listen(AppModule.port);

  // Log documentation url
  const baseUrl = AppModule.getBaseUrl(app);
  const url = `http://${baseUrl}:${AppModule.port}`;
  logger.log(`API Documentation available at ${url}/docs`);
}
bootstrap();
