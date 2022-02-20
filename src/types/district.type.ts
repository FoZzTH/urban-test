export type District = {
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  properties: {
    Description: string;
    Name: string;
  };
};
