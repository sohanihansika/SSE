import { SseService } from '../common/sse.service';
export declare class FilesService {
    private readonly sseService;
    constructor(sseService: SseService);
    uploadFile(senderId: number, recipientIds: string, fileName: string): {
        success: boolean;
        message: string;
    };
}
