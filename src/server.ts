import express from 'express';

import { env } from './env';
import { errorHandler } from './middleware/errorHandler.middleware';
import { router } from './routers';

export default class Server {
  private expressServer: express.Express;

  constructor() {
    this.expressServer = express();
    this.initialization();
  }

  public start(): void {
    this.expressServer.listen(env.server.port, () => {
      console.log(`Server started on ${env.server.port}`);
    });
  }

  private initialization(): void {
    this.expressServer.use(router);
    this.expressServer.use(errorHandler);
  }
}
