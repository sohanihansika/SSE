import { IQuery } from "@nestjs/cqrs";

export class GetFilesQuery implements IQuery {
    constructor(
        public readonly userId:number
    ){}
}