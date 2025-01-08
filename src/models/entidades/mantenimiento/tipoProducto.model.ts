export interface ITipoProducto {
  id: string;
  descripcion: string;
}

export const defaultTipoProducto: ITipoProducto = {
  id: "",
  descripcion: "",
};

export interface ITipoProductoFilter {
  descripcion: string;
}

export const defaultTipoProductoFilter: ITipoProductoFilter = {
  descripcion: "",
};

export interface ITipoProductoTable {
  descripcion: string;
  id: string;
}
