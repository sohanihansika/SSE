import { CommandHandler , ICommandHandler } from "@nestjs/cqrs";
import { UploadFileCommand } from "../upload-file.command";
import { FilesService} from "../../files.service";

@CommandHandler(UploadFileCommand)
export class UploadFileHandler implements ICommandHandler<UploadFileCommand>{
    constructor(
        private readonly filesService : FilesService,
    ){}

    async execute(command: UploadFileCommand): Promise<{ success: boolean; message: string}>{
        const { senderId, recipientIds, fileName} = command;
        
        return this.filesService.uploadFile(senderId, recipientIds, fileName);

    }
}