import { GeocodeInfo } from '../types/geocodeInfo.type';
import { Nullable } from '../types/nullable.type';

export interface IGeocodeService {
  getAddressInfo(address: string): Promise<Nullable<GeocodeInfo>>;
}
