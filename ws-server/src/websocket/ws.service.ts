import { 
  WebSocketGateway, 
  WebSocketServer, 
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  SubscribeMessage, 
  MessageBody 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
@WebSocketGateway({ cors: { origin: '*' } })
export class WebSocketService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private clients: Record<number, string> = {};
  private nextUserId = 1;

  constructor(private readonly fileUploadService: FileUploadService) {}

  handleConnection(client: Socket) {
    const userId = this.nextUserId++;
    this.clients[userId] = client.id;
    client.emit('userId', userId);
  }

  handleDisconnect(client: Socket) {
    const userId = Object.keys(this.clients).find((key) => this.clients[+key] === client.id);
    if (userId) delete this.clients[+userId];
  }

  private sendNotification(userId: number, message: string) {
    if (this.clients[userId]) {
      this.server.to(this.clients[userId]).emit('notification', message);
    }
  }

  @SubscribeMessage('uploadFile')
  handleFileUpload(@MessageBody() data: { senderId: number; recipientIds: string; filename: string }) {
    this.fileUploadService.handleFileUpload(data.senderId, data.recipientIds, data.filename, this.clients, this.sendNotification.bind(this));
  }
}
