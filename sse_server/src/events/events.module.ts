import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [EventsController],
})
export class EventsModule {}
