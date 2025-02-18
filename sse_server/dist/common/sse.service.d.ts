import { Response } from 'express';
export declare class SseService {
    private clients;
    private nextUserId;
    addClient(res: Response): number;
    removeClient(userId: number, res: Response): void;
    sendMessage(userId: number, message: string): void;
}
