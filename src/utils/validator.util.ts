import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import { ValidationException } from '../exceptions/validation.exception';

class Validator {
  body(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);
      if (error) {
        next(new ValidationException(error.message));
      }

      next();
    };
  }
}

export const validator = new Validator();
