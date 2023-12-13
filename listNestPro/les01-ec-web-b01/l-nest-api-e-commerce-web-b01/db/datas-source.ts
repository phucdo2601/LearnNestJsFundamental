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
    database: process.env.DB_DATABASE,
    entities: [
        'dist/**/*.entity{.ts,.js}',
    ],
    migrations: [

    ],
    logging: false,
    /**
     * synchronize is turned true it means auto creating entities (migrate)
     */
    synchronize: true,
}

const dataSource = new DataSource(dataSourceOption);

export default dataSource;