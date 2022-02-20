import * as districts from '../../public/formatted-districts.json';

import { District } from '../types/district.type';

class DistrictsService {
  async getDistricts(): Promise<District[]> {
    return districts.features;
  }
}

export const districtsService = new DistrictsService();
