import {
    DataSource, DataSourceOptions
} from 'typeorm'

import {config} from 'dotenv'
import { UserEntity } from 'src/users/entities/user.entity';

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
        'dist/db/migrations/*{.ts,.js}'
    ],
    logging: false,
    
    /**
     * synchronize - Indicates if database schema should be auto created on every application launch. Be careful with 
     * this option and don't use this in production - otherwise you can lose production data. This option is useful 
     * during debug and development. As an alternative to it, you can use CLI and run schema:sync command. Note that 
     * for MongoDB database it does not create schema, because MongoDB is schemaless. Instead, it syncs just by 
     * creating indices.
     */
    synchronize: false,
}

const dataSource = new DataSource(dataSourceOption);
dataSource.initialize();

export default dataSource;