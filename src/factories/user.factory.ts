import { injectable } from 'inversify';
import { NewUserRequest } from '../dtos/new-user-request.dto';
import { UserViewModel } from '../dtos/user-view.dto';
import { User } from '../entity';

@injectable()
export class UserFactory {
    buildUser(userRequest: NewUserRequest, hash: string, salt: string) {
        const { firstName, lastName, age, email } = userRequest;

        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        user.email = email;
        user.password = hash;
        user.salt = salt;
        return user;
    }

    buildUserViewModel(user: User): UserViewModel {
        const { id, firstName, lastName, email, age } = user;
        return {
            id,
            firstName,
            lastName,
            email,
            age,
        };
    }
}
