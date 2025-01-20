export interface IVehiculoFindModal {
  inputFocus: string;
}

export interface IVehiculoFindFilter {
  numeroPlaca: string;
}

export const defaultVehiculoFindFilter: IVehiculoFindFilter = {
  numeroPlaca: "",
};

export interface IVehiculoFind extends IVehiculoFindTable {
  origen: string;
}

export interface IVehiculoFindTable {
  id: string;
  numeroPlaca: string;
  marca: string;
  modelo: string;
}
