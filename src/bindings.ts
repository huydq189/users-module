import { Container } from 'inversify';
import { TOKENS } from './constants';
import { UserFactory } from './factories/user.factory';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AdminMiddleware } from './middleware/role.middleware';
import { DatabaseService } from './services/database.service';
import { UserService } from './services/user.service';

export const container = new Container();

container.bind<DatabaseService>(TOKENS.DATABASE_SERVICE).to(DatabaseService).inSingletonScope();

container.bind<UserFactory>(TOKENS.USER_FACTORY).to(UserFactory);
container.bind<UserService>(TOKENS.USER_SERVICE).to(UserService);

container.bind<AuthMiddleware>(TOKENS.AUTH_MIDDLEWARE).to(AuthMiddleware);
container.bind<AdminMiddleware>(TOKENS.ADMIN_MIDDLEWARE).to(AdminMiddleware);
