import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetFilesQuery } from "../get-files.query";

@QueryHandler(GetFilesQuery)
export class GetFilesHandler implements IQueryHandler<GetFilesQuery>{
    async execute(query: GetFilesQuery): Promise<string[]> {
        const { userId } = query;

        return[`UserId : ${userId}`];
        
    }
}