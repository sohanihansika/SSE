import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CommonModule } from '../common/common.module';
import { UploadFileHandler } from './commands/handlers/upload-file.handler';
import { GetFilesHandler } from './queries/handlers/get-files.handler';

@Module({
  imports: [CommonModule,CqrsModule],
  controllers: [FilesController],
  providers: [FilesService, UploadFileHandler, GetFilesHandler],
})
export class FilesModule {}
