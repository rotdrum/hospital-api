import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';

const dbConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [join(__dirname, './src/entities/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './src/migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
};

if (process.env.NODE_ENV === 'test') {
  Object.assign(dbConfig, {});
}

module.exports = dbConfig;
