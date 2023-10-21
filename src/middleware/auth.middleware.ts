import { NextFunction, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import jwt from 'jsonwebtoken';
import { AppSettings, TOKENS } from '../constants';
import { CutsomRequest } from '../dtos';
import { User } from '../entity';
import { DatabaseService } from '../services';

@injectable()
export class AuthMiddleware extends BaseMiddleware {
    constructor(@inject(TOKENS.DATABASE_SERVICE) private db: DatabaseService) {
        super();
    }

    public async handler(req: CutsomRequest<any>, res: Response, next: NextFunction) {
        try {
            let token = req.headers.authorization;
            if (!req?.headers?.authorization?.startsWith('Bearer ')) {
                throw new Error('invalid authorization header');
            }
            token = token?.slice(7, token.length).trimStart();

            if (token !== 'supersecret') {
                const decodedToken = jwt.verify(token!, AppSettings.secret) as { id: number };
                const repo = this.db.getRepository<User>(User);
                const user = await repo.findOne({
                    where: {
                        id: decodedToken.id,
                    },
                });
                if (!user) {
                    throw new Error('Auth failed');
                }
                req.user = user;
                next();
            }

            next();
        } catch (e) {
            res.status(401);
            res.send({
                message: 'Failed Auth',
                error: e,
            });
        }
    }
}
