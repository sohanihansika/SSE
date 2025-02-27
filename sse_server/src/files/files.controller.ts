import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UploadFileCommand } from './commands/upload-file.command';
import { GetFilesQuery } from './queries/get-files.query';

@Controller('files')
export class FilesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('upload')
  async uploadFile(
    @Body('senderId') senderId: number,
    @Body('recipientIds') recipientIds: string,
    @Body('filename') fileName: string,
  ) {
    return this.commandBus.execute(new UploadFileCommand(senderId,recipientIds,fileName));  
  }

  @Get()
  async getFiles(@Query('userId') userId: number){
    return this.queryBus.execute(new GetFilesQuery(userId));
  }
}
