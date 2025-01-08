export interface IPorcentajes {
  porcentaje: number;
  default: boolean;
}

export const defaultPorcentajesIGV: IPorcentajes[] = [
  { default: false, porcentaje: 0 },
  { default: true, porcentaje: 18 },
];