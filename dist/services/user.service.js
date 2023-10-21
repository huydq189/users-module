"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const inversify_1 = require("inversify");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const entity_1 = require("../entity");
const user_factory_1 = require("../factories/user.factory");
const database_service_1 = require("./database.service");
let UserService = class UserService {
    constructor(db, userFactory) {
        this.db = db;
        this.userFactory = userFactory;
        this.userRepository = this.db.getRepository(entity_1.User);
    }
    signUp(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { hash, salt } = this.generateHash(user.password);
            const dbUser = this.userFactory.buildUser(user, hash, salt);
            const savedUser = yield this.userRepository.save(dbUser);
            return this.userFactory.buildUserViewModel(savedUser);
        });
    }
    signIn(email, newPassword) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('HUYDEV TEST');
            const { id, password, salt } = yield this.userRepository.findOneOrFail({
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
        });
    }
    getUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.find();
            return users.map(this.userFactory.buildUserViewModel);
        });
    }
    generateHash(password, salt) {
        const saltLength = 16;
        if (!salt) {
            salt = crypto_1.default
                .randomBytes(Math.ceil(saltLength / 2))
                .toString('hex')
                .slice(0, saltLength);
        }
        const hash = crypto_1.default.createHmac('sha512', salt);
        hash.update(password);
        const hashValue = hash.digest('hex');
        return { hash: hashValue, salt };
    }
    generateToken(userId) {
        const token = jsonwebtoken_1.default.sign({ id: userId }, constants_1.AppSettings.secret, { expiresIn: '1h' });
        return token;
    }
};
UserService = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(constants_1.TOKENS.DATABASE_SERVICE)),
    tslib_1.__param(1, (0, inversify_1.inject)(constants_1.TOKENS.USER_FACTORY)),
    tslib_1.__metadata("design:paramtypes", [database_service_1.DatabaseService,
        user_factory_1.UserFactory])
], UserService);
exports.UserService = UserService;
