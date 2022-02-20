import {
  AddressType,
  Client,
  GeocodeResult,
  Status,
} from '@googlemaps/google-maps-services-js';

import { env } from '../env';
import { IGeocodeService } from '../interfaces/geocodeService.interface';
import { GeocodeInfo } from '../types/geocodeInfo.type';
import { Nullable } from '../types/nullable.type';

class GoogleGeocodeService implements IGeocodeService {
  async getAddressInfo(address: string): Promise<Nullable<GeocodeInfo>> {
    const response = await this.fetchGeocode(address);
    if (response.data.status === Status.ZERO_RESULTS) {
      return null;
    }

    return this.mapResponse(response.data.results[0]);
  }

  private async fetchGeocode(address: string) {
    const client = new Client({});

    return await client.geocode({
      params: {
        address,
        key: env.google.apiKey,
      },
    });
  }

  private mapResponse(response: GeocodeResult): GeocodeInfo {
    return {
      location: response.geometry.location,
      postcode:
        response.address_components.find(a =>
          a.types.includes(AddressType.postal_code)
        )?.long_name ?? '',
    };
  }
}

export const googleGeocodeService = new GoogleGeocodeService();
