import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsModule } from './websocket/ws.module';
// import { FilesModule } from './files/files.module';

@Module({
  imports: [WsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
