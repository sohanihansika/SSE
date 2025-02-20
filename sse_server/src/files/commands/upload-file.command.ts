import { ICommand } from "@nestjs/cqrs";

export class UploadFileCommand implements ICommand {
    constructor(
        public readonly senderId: number,
        public readonly recipientIds: string,
        public readonly fileName: string,
    ){}
}