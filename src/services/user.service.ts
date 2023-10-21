import crypto from 'crypto';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { In, Repository } from 'typeorm';
import { AppSettings, ROLES, TOKENS } from '../constants';
import { NewUserRequest, UserViewModel } from '../dtos';
import { Role, User } from '../entity';
import { UserFactory } from '../factories/user.factory';
import { DatabaseService } from './database.service';

@injectable()
export class UserService {
    userRepository: Repository<User>;
    roleRepository: Repository<Role>;

    constructor(
        @inject(TOKENS.DATABASE_SERVICE) private db: DatabaseService,
        @inject(TOKENS.USER_FACTORY) private userFactory: UserFactory,
    ) {
        this.userRepository = this.db.getRepository<User>(User);
        this.roleRepository = this.db.getRepository<Role>(User);
    }

    async signUp(user: NewUserRequest): Promise<UserViewModel> {
        const { hash, salt } = this.generateHash(user.password);
        const roles = await this.roleRepository.find({
            where: {
                id: In(user.roles),
            },
        });

        const dbUser = this.userFactory.buildUser(user, hash, salt, roles);
        const savedUser = await this.userRepository.save(dbUser);
        return this.userFactory.buildUserViewModel(savedUser);
    }

    async signIn(email: string, newPassword: string): Promise<{ token: string }> {
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

        return { token };
    }

    async getUsers(): Promise<UserViewModel[]> {
        const users = await this.userRepository.find();
        return users.map(this.userFactory.buildUserViewModel);
    }

    async saveRole(name: ROLES, description: string): Promise<Role> {
        const role = this.userFactory.buildRole(name, description);
        const savedRole = await this.roleRepository.save(role);
        return savedRole;
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
