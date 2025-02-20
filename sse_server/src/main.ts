import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: "http://localhost:3000" });

  await app.listen(process.env.PORT ?? 4005);
  // console.log("NestJs SSE serer is running on port 4005")
}
bootstrap();
