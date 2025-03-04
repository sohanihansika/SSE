import { Module } from '@nestjs/common';
import { WebSocketService } from './ws.service';

@Module({
  providers: [WebSocketService],
  exports: [WebSocketService],
})
export class WsModule {}
