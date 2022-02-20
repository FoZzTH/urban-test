import {
  AddressType,
  GeocodeResponse,
  LocationType,
  Status,
} from '@googlemaps/google-maps-services-js';

export const successResponse: GeocodeResponse = {
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  data: {
    results: [
      {
        address_components: [
          {
            long_name: 'White Bear Yard',
            short_name: 'White Bear Yard',
            types: [AddressType.route],
          },
          {
            long_name: 'London',
            short_name: 'London',
            types: [AddressType.postal_town],
          },
          {
            long_name: 'Greater London',
            short_name: 'Greater London',
            types: [
              AddressType.administrative_area_level_2,
              AddressType.political,
            ],
          },
          {
            long_name: 'England',
            short_name: 'England',
            types: [
              AddressType.administrative_area_level_1,
              AddressType.political,
            ],
          },
          {
            long_name: 'United Kingdom',
            short_name: 'GB',
            types: [AddressType.country, AddressType.political],
          },
          {
            long_name: 'EC1R 5DP',
            short_name: 'EC1R 5DP',
            types: [AddressType.postal_code],
          },
        ],
        formatted_address: 'White Bear Yard, London EC1R 5DP, UK',
        geometry: {
          bounds: {
            northeast: {
              lat: 51.5222872,
              lng: -0.1097556,
            },
            southwest: {
              lat: 51.5220304,
              lng: -0.1098482,
            },
          },
          location: {
            lat: 51.5222691,
            lng: -0.1098115,
          },
          location_type: LocationType.GEOMETRIC_CENTER,
          viewport: {
            northeast: {
              lat: 51.5235077802915,
              lng: -0.108452919708498,
            },
            southwest: {
              lat: 51.5208098197085,
              lng: -0.111150880291502,
            },
          },
        },
        place_id: 'ChIJ5XwA5k4bdkgRJ15fCYrsX3A',
        types: [AddressType.route],
        partial_match: true,
        plus_code: {
          compound_code: '',
          global_code: '',
        },
        postcode_localities: [],
      },
    ],
    status: Status.OK,
    error_message: '',
  },
};

export const zeroResultsResponse: GeocodeResponse = {
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  data: {
    results: [],
    status: Status.ZERO_RESULTS,
    error_message: '',
  },
};
