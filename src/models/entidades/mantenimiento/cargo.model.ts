export interface ICargo {
  id: number;
  descripcion: string;
  sueldo: number;
}

export const defaultCargo: ICargo = {
  id: 0,
  descripcion: "",
  sueldo: 0,
};

export interface ICargoFilter {
  descripcion: string;
}

export const defaultCargoFilter: ICargoFilter = {
  descripcion: "",
};

export interface ICargoTable {
  id: number;
  descripcion: string;
  sueldo: number;
}
