import { StatusCodes } from 'http-status-codes';
import { ServerException } from './server.exception';

export class NotFoundException extends ServerException {
  constructor(message = 'Not Found') {
    super(StatusCodes.NOT_FOUND, message);
  }
}
