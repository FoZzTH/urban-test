import { ConnectionOptions } from 'typeorm';

import { env } from '../env';

export const typeORMConfig: ConnectionOptions = {
  type: 'mysql',
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.name,
  entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
  synchronize: true,
};
