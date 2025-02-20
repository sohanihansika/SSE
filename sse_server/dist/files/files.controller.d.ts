import { CommandBus, QueryBus } from '@nestjs/cqrs';
export declare class FilesController {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    uploadFile(senderId: number, recipientIds: string, fileName: string): Promise<any>;
    getFiles(userId: number): Promise<any>;
}
