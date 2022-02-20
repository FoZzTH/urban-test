import { Router } from 'express';

import { addressRouter } from './address.router';
import { notFound } from '../middleware/notFound.middleware';

export const router = Router();

router.use('/address', addressRouter);
router.use(notFound);
