import { inject, injectable } from 'inversify';
import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { TOKENS } from '../constants/types';

@injectable()
export class DatabaseService {
    constructor(@inject(TOKENS.DATABASE_CONNECTION) private connection: DataSource) {}

    getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> {
        return this.connection.getRepository(entity);
    }
}
