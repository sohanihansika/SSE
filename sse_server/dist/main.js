"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: "http://localhost:3000" });
    await app.listen(process.env.PORT ?? 4000);
    console.log("NestJs SSE serer is running on port 4000");
}
bootstrap();
//# sourceMappingURL=main.js.map