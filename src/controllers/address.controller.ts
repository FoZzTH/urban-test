import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { addressService } from '../services/address.service';
import { AddressStatus } from '../types/addressStatus.enum';

class AddressController {
  async getAddressInfo(req: Request, res: Response) {
    const address = req.query.address as string;

    const addressInfo = await addressService.getAddressInfo(address);
    if (addressInfo.status === AddressStatus.NOT_FOUND) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: addressInfo.status,
        search: addressInfo.message,
      });
    }

    return res.status(StatusCodes.OK).json({
      status: addressInfo.status,
      search: address,
      location: addressInfo.location,
    });
  }
}

export const addressController = new AddressController();
