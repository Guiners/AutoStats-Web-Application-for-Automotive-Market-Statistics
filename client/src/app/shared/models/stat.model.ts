export interface IStatType {
  label: string;
  value: string;
}

export interface ICalcStatReq {
  inputColumns: string[];
  inputValues: any[];
  columnToCount: string;
}
