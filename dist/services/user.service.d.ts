import { Repository } from 'typeorm';
import { NewUserRequest, UserViewModel } from '../dtos';
import { User } from '../entity';
import { UserFactory } from '../factories/user.factory';
import { DatabaseService } from './database.service';
export declare class UserService {
    private db;
    private userFactory;
    userRepository: Repository<User>;
    constructor(db: DatabaseService, userFactory: UserFactory);
    signUp(user: NewUserRequest): Promise<UserViewModel>;
    signIn(email: string, newPassword: string): Promise<{
        token: string;
    }>;
    getUsers(): Promise<UserViewModel[]>;
    generateHash(password: string, salt?: string): {
        hash: string;
        salt: string;
    };
    generateToken(userId: number): string;
}
