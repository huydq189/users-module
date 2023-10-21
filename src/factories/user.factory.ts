import { injectable } from 'inversify';
import { ROLES } from '../constants';
import { Role, User } from '../entity';
import { NewUserRequest } from '../dtos/new-user-request.dto';
import { UserViewModel } from '../dtos/user-view.dto';

@injectable()
export class UserFactory {
    buildUser(userRequest: NewUserRequest, hash: string, salt: string, roles: Role[]) {
        const { firstName, lastName, age, email } = userRequest;

        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        user.email = email;
        user.password = hash;
        user.salt = salt;
        user.roles = roles;
        return user;
    }

    buildUserViewModel(user: User): UserViewModel {
        const { id, firstName, lastName, email, age, roles } = user;
        return {
            id,
            firstName,
            lastName,
            email,
            age,
            roles,
        };
    }

    buildRole(name: ROLES, description: string) {
        const role = new Role();

        role.name = name;
        role.description = description;

        return role;
    }
}
