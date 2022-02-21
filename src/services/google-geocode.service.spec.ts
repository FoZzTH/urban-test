import { Client } from '@googlemaps/google-maps-services-js';

import { googleGeocodeService } from './google-geocode.service';

import {
  successResponse,
  zeroResultsResponse,
} from '../../__mocks__/services/google-geocode/serverResponses';
import { successResult } from '../../__mocks__/services/google-geocode/result';

describe('Google geocode service', () => {
  describe('getAddressInfo', () => {
    test('Should return null if address is not found', async () => {
      jest
        .spyOn(Client.prototype, 'geocode')
        .mockImplementation(async () => zeroResultsResponse);

      const response = await googleGeocodeService.getAddressInfo('Address');

      expect(response).toBe(null);
    });
    test('Should return correct GeocodeInfo if address is found', async () => {
      jest
        .spyOn(Client.prototype, 'geocode')
        .mockImplementation(async () => successResponse);

      const response = await googleGeocodeService.getAddressInfo('Address');

      expect(response).toStrictEqual(successResult);
    });
  });
});
