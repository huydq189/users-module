import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { DataSource } from 'typeorm';
import { container } from './bindings';
import { AppSettings, TOKENS } from './constants';
import './controllers';

const configServer = (app: any) => {
    app.use(
        bodyParser.urlencoded({
            extended: true,
        }),
    );
    app.use(bodyParser.json());
};

const configError = (app: express.Application) => {
    app.use((err: any, req: any, res: any) => {
        console.error(err);
        res.status(500).json(err).send();
    });
};

const dataSource = new DataSource(require('../ormconfig.json'));
dataSource.initialize().then((connection) => {
    container.bind<DataSource>(TOKENS.DATABASE_CONNECTION).toConstantValue(connection);
    const server = new InversifyExpressServer(container);

    server.setConfig(configServer);
    server.setErrorConfig(configError);

    const app = server.build();
    app.listen(AppSettings.port);
    console.log(`server listening on port ${AppSettings.port}`);
});
