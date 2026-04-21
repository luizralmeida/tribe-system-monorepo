"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_module_js_1 = require("./infrastructure/modules/app.module.js");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_js_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true }
    }));
    app.enableCors();
    app.setGlobalPrefix('api');
    app.use((req, res, next) => {
        const { method, originalUrl } = req;
        const logger = new common_1.Logger('HTTP');
        logger.log(`--> ${method} ${originalUrl}`);
        next();
    });
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('APP_PORT', 3000);
    await app.listen(port);
}
void bootstrap();
//# sourceMappingURL=main.js.map