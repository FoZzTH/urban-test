import { Router } from 'express';

import { addressController } from '../controllers/address.controller';
import { addressSchema } from '../schemas/address.schema';
import { tryCatch } from '../utils/tryCatch.util';
import { validator } from '../utils/validator.util';

export const addressRouter = Router();

addressRouter.get(
  '/',
  validator.query(addressSchema),
  tryCatch(addressController.getAddressInfo)
);
