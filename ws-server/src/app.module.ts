import { Module } from '@nestjs/common';
import { WebSocketModule } from './websocket/ws.module';
import { FileUploadModule } from './file-upload/file-upload.module';


@Module({
  imports: [WebSocketModule, FileUploadModule],
  
})
export class AppModule {}
