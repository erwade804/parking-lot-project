import { DataSource } from 'typeorm';
import { Member } from './entities/member/member.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'sql5.freemysqlhosting.net',
  port: 3306,
  username: 'sql5520452',
  password: 'ymwP2d1XPQ',
  database: 'sql5520452',
  synchronize: true,
  logging: true,
  entities: [Member],
});
