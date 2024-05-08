export interface IFuelType {
  [fuelType: string]: string[];
}

export interface IFuelTypeRes {
  label: string;
  rows: IFuelType;
}
