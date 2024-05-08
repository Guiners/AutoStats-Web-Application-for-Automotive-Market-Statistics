export interface IAddFavouriteReq {
  userEmail: string;
  queryName: string;
  inputColumns: string[];
  inputValues: any[];
}

export interface IGetFavouriteReq {
  userEmail: string;
}

export interface IGetFavouriteRes {
  message: IFavourites[];
}

export interface IFavourites {
  Brand: string;
  CapacityHigh: number;
  CapacityLow: number;
  DriveType: string;
  Fueltype: string;
  Gearbox: string;
  Generation: string;
  HorsepowerHigh: number;
  HorsepowerLow: number;
  Id: number;
  MilageHigh: number;
  MilageLow: number;
  Model: string;
  PriceHigh: number;
  PriceLow: number;
  ProductionYearHigh: number;
  ProductionYearLow: number;
  Segment: string;
}
