import { DataBase } from './database';
import Server from './server';

(async () => {
  try {
    await DataBase.connect();
  } catch (e) {
    return console.log(e);
  }

  const server = new Server();
  server.start();
})();
