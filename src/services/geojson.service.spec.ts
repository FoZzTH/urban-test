import { District } from '../types/district.type';
import { geoJSONService } from './geojson.service';

describe('GeoJSON service', () => {
  describe('getPointDistrict', () => {
    test('Should return district if point in district list', async () => {
      const district: District = {
        type: 'Polygon',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [0, 0, 0],
              [0, 1, 0],
              [1, 1, 0],
              [1, 0, 0],
              [0, 0, 0],
            ],
          ],
        },
        properties: {
          Description: '',
          Name: '',
        },
      };
      const point = [0.5, 0.5];

      const result = await geoJSONService.getPointDistrict([district], point);

      expect(result).toBe(district);
    });
    test('Should return null if point not in district list', async () => {
      const district: District = {
        type: 'Polygon',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [0, 0, 0],
              [0, 1, 0],
              [1, 1, 0],
              [1, 0, 0],
              [0, 0, 0],
            ],
          ],
        },
        properties: {
          Description: '',
          Name: '',
        },
      };
      const point = [2, 2];

      const result = await geoJSONService.getPointDistrict([district], point);

      expect(result).toBe(null);
    });
  });
});
