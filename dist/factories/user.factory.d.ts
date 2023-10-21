import { NewUserRequest } from '../dtos/new-user-request.dto';
import { UserViewModel } from '../dtos/user-view.dto';
import { User } from '../entity';
export declare class UserFactory {
    buildUser(userRequest: NewUserRequest, hash: string, salt: string): User;
    buildUserViewModel(user: User): UserViewModel;
}
