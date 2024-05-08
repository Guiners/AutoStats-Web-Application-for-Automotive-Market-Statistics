export interface IGearbox {
  [gearBox: string]: string[];
}

export interface IGearboxRes {
  label: string;
  rows: IGearbox;
}
