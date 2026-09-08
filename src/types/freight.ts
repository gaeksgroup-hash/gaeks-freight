// filepath: /src/types/freight.ts
export type ShippingMode = 'ocean_fcl' | 'ocean_lcl' | 'air_freight' | 'trucking';

export interface ServiceDetail {
  id: string;
  title: string;
  badge: string;
  description: string;
  highlights: string[];
}

export interface CargoCalcState {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  pieces: number;
  actualWeightKg: number;
  mode: 'air' | 'ocean';
}