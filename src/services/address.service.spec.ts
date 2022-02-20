import { addressService } from './address.service';
import { addressRepository } from '../repositories/address.repository';
import { googleGeocodeService } from './google-geocode.service';
import { geoJSONService } from './geojson.service';
import { districtsService } from './districts.service';

import * as districts from '../../public/formatted-districts.json';

import { AddressStatus } from '../types/addressStatus.enum';
import { AddressStatusMessage } from '../types/addressStatusMessage.enum';

import { cacheData } from '../../static/services/address/cacheData';

describe('Address service', () => {
  describe('getAddressInfo', () => {
    beforeAll(() => {
      addressRepository.findByAddress = jest.fn().mockResolvedValue(null);
      addressRepository.save = jest.fn();
    });

    test('Should use cached data if exist', async () => {
      addressRepository.findByAddress = jest
        .fn()
        .mockResolvedValueOnce(cacheData);

      const result = await addressService.getAddressInfo('Address');

      expect(result).toStrictEqual({
        status: AddressStatus.OK,
        location: cacheData.info,
      });
    });

    test('Should return specific message if address is not found', async () => {
      googleGeocodeService.getAddressInfo = jest
        .fn()
        .mockResolvedValueOnce(null);

      const result = await addressService.getAddressInfo('Address');

      expect(result).toStrictEqual({
        status: AddressStatus.NOT_FOUND,
        message: AddressStatusMessage.NOT_EXISTS,
      });
    });

    test('Should return specific message if address not service area', async () => {
      googleGeocodeService.getAddressInfo = jest.fn().mockResolvedValueOnce({
        location: { lat: 0, lng: 0 },
        postcode: 'postcode',
      });
      districtsService.getDistricts = jest
        .fn()
        .mockResolvedValueOnce(districts);

      geoJSONService.getPointDistrict = jest.fn().mockResolvedValueOnce(null);

      const result = await addressService.getAddressInfo('Address');

      expect(result).toStrictEqual({
        status: AddressStatus.NOT_FOUND,
        message: AddressStatusMessage.NOT_IN_SERVICE_AREA,
      });
    });

    test('Should return address info if address in service area', async () => {
      const addressInfo = {
        location: { lat: 1, lng: 2 },
        postcode: 'postcode',
      };

      const districtInfo = {
        properties: { Name: 'District Name' },
      };

      googleGeocodeService.getAddressInfo = jest
        .fn()
        .mockResolvedValueOnce(addressInfo);
      districtsService.getDistricts = jest
        .fn()
        .mockResolvedValueOnce(districts);
      geoJSONService.getPointDistrict = jest
        .fn()
        .mockResolvedValueOnce(districtInfo);

      const result = await addressService.getAddressInfo('Address');

      expect(result).toStrictEqual({
        status: AddressStatus.OK,
        location: {
          latitude: addressInfo.location.lat,
          longitude: addressInfo.location.lng,
          serviceArea: districtInfo.properties.Name,
          postcode: addressInfo.postcode,
        },
      });
    });
  });
});
