import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { SseService } from '../common/sse.service';

@Controller('events')
export class EventsController {
  constructor(private readonly sseService: SseService) {}

  @Get()
  getEvents(@Res() res: Response) {
    this.sseService.addClient(res);
  }
}
