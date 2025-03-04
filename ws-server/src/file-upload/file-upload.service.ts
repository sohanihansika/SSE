import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  handleFileUpload(
    senderId: number, 
    recipientIds: string, 
    filename: string, 
    clients: Record<number, string>, 
    sendNotification: (userId: number, message: string) => void
  ) {
    const recipients = recipientIds.split(',')
      .map(id => +id.trim())
      .filter(id => id !== senderId);

    const validRecipients: number[] = [];
    const invalidRecipients: number[] = [];

    recipients.forEach(userId => {
      if (clients[userId]) {
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
      sendNotification(userId, `User ${senderId} uploaded: ${filename}`);
    });

    // Notify sender
    sendNotification(senderId, senderMessage);
  }
}
