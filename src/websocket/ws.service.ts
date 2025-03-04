import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class WebSocketService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private clients: Record<number, string> = {}; // Mapping user IDs to their socket IDs
  private nextUserId = 1;

  // Handle new connections
  handleConnection(client: Socket) {
    const userId = this.nextUserId++;
    this.clients[userId] = client.id;
    client.emit('userId', userId); // Send back the assigned userId to the client
  }

  // Handle disconnections
  handleDisconnect(client: Socket) {
    const userId = Object.keys(this.clients).find((key) => this.clients[+key] === client.id);
    if (userId) delete this.clients[+userId];
  }

  // Handle file upload notification
  @SubscribeMessage('uploadFile')
  handleFileUpload(@MessageBody() data: { senderId: number; recipientIds: string; filename: string }) {
    const { senderId, recipientIds, filename } = data;
    const recipients = recipientIds.split(',').map(id => +id.trim()).filter(id => id !== senderId);

    const validRecipients: number[] = [];
    const invalidRecipients: number[] = [];

    // Check if recipient clients exist
    recipients.forEach(userId => {
      if (this.clients[userId]) {
        validRecipients.push(userId);
      } else {
        invalidRecipients.push(userId);
      }
    });

    let senderMessage: string;
    if (validRecipients.length > 0 && invalidRecipients.length === 0) {
      senderMessage = `File ${filename} sent to ${validRecipients.join(', ')}`;
    } else if (validRecipients.length === 0 && invalidRecipients.length > 0) {
      senderMessage = `No user with ID ${invalidRecipients.join(', ')}`;
    } else {
      senderMessage = `${filename} sent to ${validRecipients.join(', ')}, but no user with ID ${invalidRecipients.join(', ')}`;
    }

    // Notify valid recipients
    validRecipients.forEach(userId => {
      this.server.to(this.clients[userId]).emit('notification', `User ${senderId} uploaded: ${filename}`);
    });

    // Notify sender
    this.server.to(this.clients[senderId]).emit('notification', senderMessage);
  }
}
