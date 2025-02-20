import { IQuery } from "@nestjs/cqrs";
export declare class GetFilesQuery implements IQuery {
    readonly userId: number;
    constructor(userId: number);
}
