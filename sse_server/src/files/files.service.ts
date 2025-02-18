import { Injectable } from '@nestjs/common';
import { SseService } from '../common/sse.service';

@Injectable()
export class FilesService {
  constructor(private readonly sseService: SseService) {}

  uploadFile(senderId: number, recipientIds: string, fileName: string) {
    const recipients = recipientIds.split(',').map(id => id.trim()).filter(id => id !== senderId.toString());

    const validRecipients: number[] = [];
    const invalidRecipients: number[] = [];

    recipients.forEach(userId => {
      if (this.sseService['clients'][+userId]) {
        validRecipients.push(+userId);
      } else {
        invalidRecipients.push(+userId);
      }
    });

    let senderMessage: string;
    if (validRecipients.length > 0 && invalidRecipients.length === 0) {
      senderMessage = `File ${fileName} has been sent to ${validRecipients.join(', ')}`;
    } else if (validRecipients.length === 0 && invalidRecipients.length > 0) {
      senderMessage = `No user with ID ${invalidRecipients.join(', ')}`;
    } else if (validRecipients.length > 0 && invalidRecipients.length > 0) {
      senderMessage = `${fileName} sent to ${validRecipients.join(', ')}, but no user with ID ${invalidRecipients.join(', ')}`;
    } else {
      senderMessage = `Cannot send file to yourself`;
    }

    // Notify recipients
    validRecipients.forEach(userId => {
      this.sseService.sendMessage(userId, `User ${senderId} uploaded: ${fileName}`);
    });

    // Notify sender
    this.sseService.sendMessage(senderId, senderMessage);

    return { success: true, message: senderMessage };
  }
}
