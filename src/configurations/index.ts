import {Sequelize} from 'sequelize';

import config from './config';


const {
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_HOST,
    DB_PASSWORD,
    DB_SCHEMA
} = config

export const database = new Sequelize(
    DB_NAME!,
    DB_USERNAME!,
    DB_PASSWORD as string,
{
    host: DB_HOST,
    port: DB_PORT as unknown as number,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        encrypt: true,
        searchPath: DB_SCHEMA,
    }
}
)