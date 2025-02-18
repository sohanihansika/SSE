import { Controller, Post, Body } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  uploadFile(
    @Body('senderId') senderId: number,
    @Body('recipientIds') recipientIds: string,
    @Body('filename') fileName: string,
  ) {
    return this.filesService.uploadFile(senderId, recipientIds, fileName);
  }
}
