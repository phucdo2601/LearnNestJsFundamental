import {
    DataSource, DataSourceOptions
} from 'typeorm'

import {config} from 'dotenv'

config();

export const dataSourceOption:DataSourceOptions={
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [

    ],
    migrations: [

    ],
    logging: false,
    synchronize: false,
}

const dataSource = new DataSource(dataSourceOption);

export default dataSource;