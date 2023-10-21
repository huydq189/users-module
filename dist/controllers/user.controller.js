"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const constants_1 = require("../constants");
const services_1 = require("../services");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.getUsers();
        });
    }
    signUp(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.signUp(req.body);
        });
    }
    signIn(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.signIn(req.body.email, req.body.password);
        });
    }
};
tslib_1.__decorate([
    (0, inversify_express_utils_1.httpGet)('/', constants_1.TOKENS.AUTH_MIDDLEWARE, constants_1.TOKENS.ADMIN_MIDDLEWARE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
tslib_1.__decorate([
    (0, inversify_express_utils_1.httpPost)('/signup'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
tslib_1.__decorate([
    (0, inversify_express_utils_1.httpPost)('/signin'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "signIn", null);
UserController = tslib_1.__decorate([
    (0, inversify_express_utils_1.controller)('/auth'),
    tslib_1.__param(0, (0, inversify_1.inject)(constants_1.TOKENS.USER_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [services_1.UserService])
], UserController);
exports.UserController = UserController;
