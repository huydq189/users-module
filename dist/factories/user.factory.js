"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const entity_1 = require("../entity");
let UserFactory = class UserFactory {
    buildUser(userRequest, hash, salt) {
        const { firstName, lastName, age, email } = userRequest;
        const user = new entity_1.User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        user.email = email;
        user.password = hash;
        user.salt = salt;
        return user;
    }
    buildUserViewModel(user) {
        const { id, firstName, lastName, email, age } = user;
        return {
            id,
            firstName,
            lastName,
            email,
            age,
        };
    }
};
UserFactory = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], UserFactory);
exports.UserFactory = UserFactory;
