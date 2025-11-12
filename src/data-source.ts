import { DataSource } from 'typeorm';
import { Products } from './products/entities/product.entity';
import { Users } from './users/entities/user.entity';
import { Transactions } from './transactions/entities/transactions.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Abcd@1234',
  database: 'ellatech',
  synchronize: false,
  logging: true,
  entities: [Products, Users, Transactions],
  migrations: ['src/migrations/*.ts'],
});
