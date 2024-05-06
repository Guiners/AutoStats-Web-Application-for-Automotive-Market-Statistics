import { IStatType } from '../shared/models/stat.model';

export const StatsTypeConst: IStatType[] = [
  { value: 'min', label: 'Wartość minimalna' },
  { value: 'max', label: 'Wartość maksymalna' },
  { value: 'avg', label: 'Średnia' },
  { value: 'median', label: 'Mediana' },
  { value: 'mode', label: 'Dominanta' },
];

export const StatsFieldConst: IStatType[] = [
  { value: 'Capacity', label: 'pojemność' },
  { value: 'Horsepower', label: 'moc' },
  { value: 'Milage', label: 'przebieg' },
  { value: 'FuelType', label: 'rodzaj paliwa' },
  { value: 'Fearbox', label: 'skrzynia biegów' },
  { value: 'ProductionYear', label: 'rok produkcji' },
  { value: 'Price', label: 'cena' },
];
