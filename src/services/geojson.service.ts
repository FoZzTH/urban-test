import * as turf from '@turf/turf';

import { District } from '../types/district.type';

class GeoJSONService {
  async getPointDistrict(districts: District[], point: turf.Position) {
    const result = districts.find(district => {
      return turf.booleanPointInPolygon(
        point,
        turf.polygon(district.geometry.coordinates)
      );
    });

    return result ?? null;
  }
}

export const geoJSONService = new GeoJSONService();
