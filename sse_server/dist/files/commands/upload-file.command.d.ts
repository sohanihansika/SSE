import { ICommand } from "@nestjs/cqrs";
export declare class UploadFileCommand implements ICommand {
    readonly senderId: number;
    readonly recipientIds: string;
    readonly fileName: string;
    constructor(senderId: number, recipientIds: string, fileName: string);
}
