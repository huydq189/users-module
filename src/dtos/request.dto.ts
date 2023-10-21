import { Request } from 'express';
import { User } from '../entity/user.entity';

export interface CutsomRequest<bodyType> extends Request {
    auth: string;
    user: User;
    body: bodyType;
}
