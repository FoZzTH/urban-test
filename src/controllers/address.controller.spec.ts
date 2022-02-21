import { addressController } from './address.controller';
import { addressService } from '../services/address.service';
import { Request, Response } from 'express';
import { AddressStatus } from '../types/addressStatus.enum';
import { StatusCodes } from 'http-status-codes';

describe('Address controller', () => {
  describe('getAddressInfo', () => {
    test('Should specific response if address info is not found', async () => {
      const req = { query: { address: 'Address' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const serviceMock = {
        status: AddressStatus.NOT_FOUND,
        message: 'message',
      };
      addressService.getAddressInfo = jest
        .fn()
        .mockResolvedValueOnce(serviceMock);

      await addressController.getAddressInfo(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(res.status).toBeCalledWith(StatusCodes.NOT_FOUND);
      expect(res.json).toBeCalledWith({
        status: serviceMock.status,
        search: serviceMock.message,
      });
    });
    test('Should specific response if address info is found', async () => {
      const address = 'Address';

      const req = { query: { address } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const serviceMock = {
        status: AddressStatus.OK,
        location: {
          latitude: 1,
          longitude: 2,
          serviceArea: 'Area',
          postcode: 'postcode',
        },
      };
      addressService.getAddressInfo = jest
        .fn()
        .mockResolvedValueOnce(serviceMock);

      await addressController.getAddressInfo(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(res.status).toBeCalledWith(StatusCodes.OK);
      expect(res.json).toBeCalledWith({
        status: serviceMock.status,
        search: address,
        location: serviceMock.location,
      });
    });
  });
});
