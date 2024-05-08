export interface ICarModel {
  [model: string]: string[] | null;
}

export interface ICarBrand {
  [brand: string]: ICarModel;
}

export interface ICarDetails {
  label: string;
  rows: ICarBrand;
}
