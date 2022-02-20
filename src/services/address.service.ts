import { googleGeocodeService } from './google-geocode.service';
import { geoJSONService } from './geojson.service';
import { AddressStatus } from '../types/addressStatus.enum';
import { AddressStatusMessage } from '../types/addressStatusMessage.enum';
import { AddressInfo } from '../types/addressInfo.type';
import { addressRepository } from '../repositories/address.repository';
import { IGeocodeService } from '../interfaces/geocodeService.interface';
import { GeocodeInfo } from '../types/geocodeInfo.type';
import { Nullable } from '../types/nullable.type';
import { districtsService } from './districts.service';

const geocodeServices: IGeocodeService[] = [googleGeocodeService];

class AddressService {
  async getAddressInfo(address: string): Promise<AddressInfo> {
    const cachedAddress = await addressRepository.findByAddress(address);
    if (cachedAddress) {
      return {
        status: AddressStatus.OK,
        location: cachedAddress.info,
      };
    }

    let geocodeInfo: Nullable<GeocodeInfo> = null;
    for (const geocodeService of geocodeServices) {
      geocodeInfo = await geocodeService.getAddressInfo(address);
      if (geocodeInfo) {
        break;
      }
    }

    if (!geocodeInfo) {
      return {
        status: AddressStatus.NOT_FOUND,
        message: AddressStatusMessage.NOT_EXISTS,
      };
    }

    const { location, postcode } = geocodeInfo;

    const districts = await districtsService.getDistricts();
    const point = [location.lng, location.lat];

    const district = await geoJSONService.getPointDistrict(districts, point);

    if (!district) {
      return {
        status: AddressStatus.NOT_FOUND,
        message: AddressStatusMessage.NOT_IN_SERVICE_AREA,
      };
    }

    const addressInfo = {
      status: AddressStatus.OK,
      location: {
        latitude: location.lat,
        longitude: location.lng,
        serviceArea: district.properties.Name,
        postcode,
      },
    };

    await addressRepository.save(address, addressInfo.location);

    return addressInfo;
  }
}

export const addressService = new AddressService();
