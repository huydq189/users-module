"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const entity_1 = require("../entity");
const services_1 = require("../services");
let AuthMiddleware = class AuthMiddleware extends inversify_express_utils_1.BaseMiddleware {
    constructor(db) {
        super();
        this.db = db;
    }
    handler(req, res, next) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let token = req.headers.authorization;
                if (!((_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.startsWith('Bearer '))) {
                    throw new Error('invalid authorization header');
                }
                token = token === null || token === void 0 ? void 0 : token.slice(7, token.length).trimStart();
                const decodedToken = jsonwebtoken_1.default.verify(token, constants_1.AppSettings.secret);
                const repo = this.db.getRepository(entity_1.User);
                const user = yield repo.findOne({
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
            catch (e) {
                res.status(401);
                res.send({
                    message: 'Failed Auth',
                    error: e,
                });
            }
        });
    }
};
AuthMiddleware = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(constants_1.TOKENS.DATABASE_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [services_1.DatabaseService])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
