import { Connection, createConnection } from 'typeorm';

import { typeORMConfig } from '../configs/typeorm.config';

export class DataBase {
  public static async connect(): Promise<Connection> {
    return await createConnection(typeORMConfig);
  }
}
