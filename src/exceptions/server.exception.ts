import { StatusCodes } from 'http-status-codes';

export class ServerException {
  public status: number;
  public message: string;

  constructor(
    status: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string
  ) {
    this.status = status;
    this.message = message;
  }
}
