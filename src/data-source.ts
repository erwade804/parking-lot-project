import { DataSource } from 'typeorm';
import { Member } from './entities/member/member.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true,
  logging: true,
  entities: [Member],
  subscribers: [],
  migrations: [],
});
