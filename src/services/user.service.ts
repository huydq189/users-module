import crypto from 'crypto';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { AppSettings, TOKENS } from '../constants';
import { NewUserRequest, UserViewModel } from '../dtos';
import { User } from '../entity';
import { UserFactory } from '../factories/user.factory';
import { DatabaseService } from './database.service';

@injectable()
export class UserService {
    userRepository: Repository<User>;

    constructor(
        @inject(TOKENS.DATABASE_SERVICE) private db: DatabaseService,
        @inject(TOKENS.USER_FACTORY) private userFactory: UserFactory,
    ) {
        this.userRepository = this.db.getRepository<User>(User);
    }

    async signUp(user: NewUserRequest): Promise<UserViewModel> {
        const { hash, salt } = this.generateHash(user.password);

        const dbUser = this.userFactory.buildUser(user, hash, salt);
        const savedUser = await this.userRepository.save(dbUser);
        return this.userFactory.buildUserViewModel(savedUser);
    }

    async signIn(email: string, newPassword: string): Promise<{ token: string }> {
        console.log('HUYDEV TEST');
        const { id, password, salt } = await this.userRepository.findOneOrFail({
            where: {
                email: email,
            },
        });

        const { hash } = this.generateHash(newPassword, salt);
        if (hash != password) {
            throw new Error('Invalid Password');
        }

        const token = this.generateToken(id);
        console.log('TEST');
        return { token };
    }

    async getUsers(): Promise<UserViewModel[]> {
        const users = await this.userRepository.find();
        return users.map(this.userFactory.buildUserViewModel);
    }

    async updateUserEmail(id: number, email: string): Promise<void> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error('User not found');
        }
        await this.userRepository.update({ email }, user);
    }

    async deleteUser(email: string): Promise<void> {
        await this.userRepository.delete({
            email,
        });
    }
    generateHash(password: string, salt?: string): { hash: string; salt: string } {
        const saltLength = 16;

        if (!salt) {
            salt = crypto
                .randomBytes(Math.ceil(saltLength / 2))
                .toString('hex') /** convert to hexadecimal format */
                .slice(0, saltLength); /** return required number of characters */
        }

        const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);

        const hashValue = hash.digest('hex');

        return { hash: hashValue, salt };
    }

    generateToken(userId: number): string {
        const token = jwt.sign({ id: userId }, AppSettings.secret, { expiresIn: '1h' });
        return token;
    }
}
