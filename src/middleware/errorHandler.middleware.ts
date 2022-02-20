import { Request, Response, NextFunction } from 'express';
import { ServerException } from '../exceptions/server.exception';

export const errorHandler = (
  error: ServerException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.status).json({
    status: error.status,
    message: error.message,
  });
};
