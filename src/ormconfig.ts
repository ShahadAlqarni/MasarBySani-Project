import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/auth/decorators/user.decorator';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'masarjwt',
  entities: ['src/**/*.entity{.ts,.js}'], // include any other entities
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();

export default dataSource;

