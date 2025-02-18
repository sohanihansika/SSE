import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [EventsModule,CommonModule,FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
