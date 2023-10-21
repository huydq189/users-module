import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { TOKENS } from '../constants';
import { CutsomRequest, NewUserRequest, SignInRequest, UserViewModel } from '../dtos';
import { Role } from '../entity';
import { UserService } from '../services';

@controller('/auth')
export class UserController {
    constructor(@inject(TOKENS.USER_SERVICE) private userService: UserService) {}

    @httpGet('/', TOKENS.AUTH_MIDDLEWARE, TOKENS.ADMIN_MIDDLEWARE)
    public async getUsers(): Promise<UserViewModel[]> {
        return this.userService.getUsers();
    }

    @httpPost('/signup')
    public async signUp(req: CutsomRequest<NewUserRequest>): Promise<UserViewModel> {
        return this.userService.signUp(req.body);
    }

    @httpPost('/signin')
    public async signIn(req: CutsomRequest<SignInRequest>): Promise<any> {
        return this.userService.signIn(req.body.email, req.body.password);
    }

    @httpPost('/role')
    public async saveRole(req: CutsomRequest<Role>): Promise<Role> {
        return this.userService.saveRole(req.body.name, req.body.description);
    }
}
