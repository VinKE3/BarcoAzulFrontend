export interface ITipoVenta {
  id: string;
  descripcion: string;
}

export const defaultTipoVenta: ITipoVenta = {
  id: "",
  descripcion: "",
};

export interface ITipoVentaFilter {
  descripcion: string;
}

export const defaultTipoVentaFilter: ITipoVentaFilter = {
  descripcion: "",
};

export interface ITipoVentaTable {
  descripcion: string;
  id: string;
}
