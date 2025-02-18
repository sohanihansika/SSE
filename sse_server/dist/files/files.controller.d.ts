import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(senderId: number, recipientIds: string, fileName: string): {
        success: boolean;
        message: string;
    };
}
