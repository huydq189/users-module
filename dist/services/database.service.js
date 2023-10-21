"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const types_1 = require("../constants/types");
let DatabaseService = class DatabaseService {
    constructor(connection) {
        this.connection = connection;
    }
    getRepository(entity) {
        return this.connection.getRepository(entity);
    }
};
DatabaseService = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(types_1.TOKENS.DATABASE_CONNECTION)),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.DataSource])
], DatabaseService);
exports.DatabaseService = DatabaseService;
