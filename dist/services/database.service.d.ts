import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
export declare class DatabaseService {
    private connection;
    constructor(connection: DataSource);
    getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T>;
}
