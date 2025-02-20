import { IQueryHandler } from "@nestjs/cqrs";
import { GetFilesQuery } from "../get-files.query";
export declare class GetFilesHandler implements IQueryHandler<GetFilesQuery> {
    execute(query: GetFilesQuery): Promise<string[]>;
}
