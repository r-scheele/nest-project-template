"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("./utils/swagger");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const logger = new common_1.Logger('Main');
    (0, swagger_1.setupSwagger)(app);
    app.use((0, helmet_1.default)());
    await app.listen(app_module_1.AppModule.port);
    const baseUrl = app_module_1.AppModule.getBaseUrl(app);
    const url = `http://${baseUrl}:${app_module_1.AppModule.port}`;
    logger.log(`API Documentation available at ${url}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map