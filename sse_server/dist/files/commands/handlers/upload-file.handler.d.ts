import { ICommandHandler } from "@nestjs/cqrs";
import { UploadFileCommand } from "../upload-file.command";
import { FilesService } from "../../files.service";
export declare class UploadFileHandler implements ICommandHandler<UploadFileCommand> {
    private readonly filesService;
    constructor(filesService: FilesService);
    execute(command: UploadFileCommand): Promise<{
        success: boolean;
        message: string;
    }>;
}
