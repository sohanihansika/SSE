import { Module } from '@nestjs/common';
import { WebSocketService } from './ws.service';
import { FileUploadModule } from '../file-upload/file-upload.module';

@Module({
  imports: [FileUploadModule],  
  providers: [WebSocketService],
})
export class WebSocketModule {}
