interface RootObject {
  type: string;
  features: Feature[];
}

interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

interface Properties {
  neighbourhood: string;
  neighbourhood_group?: any;
}

interface Geometry {
  type: string;
  coordinates: number[][][][];
}