export interface IMarca {
  id: number;
  nombre: string;
}

export const defaultMarca: IMarca = {
  id: 0,
  nombre: "",
};

export interface IMarcaFilter {
  nombre: string;
}

export const defaultMarcaFilter: IMarcaFilter = {
  nombre: "",
};

export interface IMarcaTable {
  nombre: string;
  id: number;
}
