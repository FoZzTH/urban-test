import { StatusCodes } from 'http-status-codes';
import { ServerException } from './server.exception';

export class ValidationException extends ServerException {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}
