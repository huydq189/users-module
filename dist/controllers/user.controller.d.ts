import { CutsomRequest, NewUserRequest, SignInRequest, UserViewModel } from '../dtos';
import { UserService } from '../services';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<UserViewModel[]>;
    signUp(req: CutsomRequest<NewUserRequest>): Promise<UserViewModel>;
    signIn(req: CutsomRequest<SignInRequest>): Promise<any>;
}
