import { NestFactory } from '@nestjs/core';
import { applyGlobalConfig } from './nest-modules/global-config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  applyGlobalConfig(app);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
