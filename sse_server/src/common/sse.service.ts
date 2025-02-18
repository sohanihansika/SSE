import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class SseService {
  private clients: Record<number, Response[]> = {};
  private nextUserId = 1;

  addClient(res: Response): number {
    const userId = this.nextUserId++;
    
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    if (!this.clients[userId]) {
      this.clients[userId] = [];
    }
    this.clients[userId].push(res);
    res.write(`data: ${JSON.stringify({ userId })}\n\n`);
    res.on('close', () => this.removeClient(userId, res));
    
    return userId;
  }

  removeClient(userId: number, res: Response) {
    this.clients[userId] = this.clients[userId].filter(client => client !== res);
    if (this.clients[userId].length === 0) {
      delete this.clients[userId];
    }
  }

  sendMessage(userId: number, message: string) {
    if (this.clients[userId]) {
      this.clients[userId].forEach(client =>
        client.write(`data: ${JSON.stringify({ message })}\n\n`)
      );
    }
  }

}
