"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const bodyParser = tslib_1.__importStar(require("body-parser"));
const inversify_express_utils_1 = require("inversify-express-utils");
const typeorm_1 = require("typeorm");
const bindings_1 = require("./bindings");
const constants_1 = require("./constants");
require("./controllers");
const configServer = (app) => {
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(bodyParser.json());
};
const dataSource = new typeorm_1.DataSource(require('../ormconfig.json'));
dataSource.initialize().then((connection) => {
    bindings_1.container.bind(constants_1.TOKENS.DATABASE_CONNECTION).toConstantValue(connection);
    const server = new inversify_express_utils_1.InversifyExpressServer(bindings_1.container);
    server.setConfig(configServer);
    const app = server.build();
    app.listen(constants_1.AppSettings.port);
    console.log(`server listening on port ${constants_1.AppSettings.port}`);
});
