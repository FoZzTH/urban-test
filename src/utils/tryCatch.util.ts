import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ServerException } from '../exceptions/server.exception';

export const tryCatch = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(
        new ServerException(
          StatusCodes.INTERNAL_SERVER_ERROR,
          error?.message || error
        )
      );
    }
  };
};
