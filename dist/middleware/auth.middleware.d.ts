import { NextFunction, Response } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { CutsomRequest } from '../dtos';
import { DatabaseService } from '../services';
export declare class AuthMiddleware extends BaseMiddleware {
    private db;
    constructor(db: DatabaseService);
    handler(req: CutsomRequest<any>, res: Response, next: NextFunction): Promise<void>;
}
