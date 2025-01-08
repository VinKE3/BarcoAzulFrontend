export interface ILinea {
  id: string;
  descripcion: string;
}

export const defaultLinea: ILinea = {
  id: "",
  descripcion: "",
};

export interface ILineaFilter {
  descripcion: string;
}

export const defaultLineaFilter: ILineaFilter = {
  descripcion: "",
};

export interface ILineaTable {
  descripcion: string;
  id: string;
}
