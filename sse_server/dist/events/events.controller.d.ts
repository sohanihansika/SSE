import { Response } from 'express';
import { SseService } from '../common/sse.service';
export declare class EventsController {
    private readonly sseService;
    constructor(sseService: SseService);
    getEvents(res: Response): void;
}
