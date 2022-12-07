import { entities } from './entities/entities.module';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'db-mysql-nyc1-40864-do-user-11495862-0.b.db.ondigitalocean.com',
  port: 25060,
  username: 'doadmin',
  password: 'AVNS_G1PBt9YIuA0xCFid85c',
  database: 'defaultdb',
  synchronize: true,
  // uncomment to see sql queries
  // logging: true,
  entities: entities,
});
