export const TOKENS = {
    DATABASE_SERVICE: Symbol.for('DATABASE_SERVICE'),
    DATABASE_CONNECTION: Symbol.for('DatabaseConnection'),

    USER_SERVICE: Symbol.for('USER_SERVICE'),
    USER_FACTORY: Symbol.for('USER_FACTORY'),

    AUTH_MIDDLEWARE: Symbol.for('AuthMiddleware'),
    ADMIN_MIDDLEWARE: Symbol.for('AdminMiddleware'),
};
