import { entities } from './entities/entities.module';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'sql5.freemysqlhosting.net',
  port: 3306,
  username: 'sql5520452',
  password: 'ymwP2d1XPQ',
  database: 'sql5520452',
  synchronize: true,
  // uncomment to see sql queries
  logging: true,
  entities: entities,
});
