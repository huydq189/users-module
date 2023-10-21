import { inject } from 'inversify';
import { controller, httpDelete, httpGet, httpPatch, httpPost } from 'inversify-express-utils';
import { TOKENS } from '../constants';
import { CutsomRequest, NewUserRequest, SignInRequest, UserViewModel } from '../dtos';
import { UserService } from '../services';

@controller('/auth')
export class UserController {
    constructor(@inject(TOKENS.USER_SERVICE) private userService: UserService) {}

    @httpGet('/', TOKENS.AUTH_MIDDLEWARE)
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

    @httpPatch('/:id')
    public async updateUser(req: CutsomRequest<SignInRequest>): Promise<any> {
        return this.userService.updateUserEmail(parseInt(req.params.id), req.body.email);
    }

    @httpDelete('/')
    public async deleteUser(req: CutsomRequest<SignInRequest>): Promise<any> {
        return this.userService.deleteUser(req.body.email);
    }
}
