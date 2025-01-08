export interface IUnidadMedida {
  id: string;
  descripcion: string;
}

export const defaultUnidadMedida: IUnidadMedida = {
  id: "",
  descripcion: "",
};

export interface IUnidadMedidaFilter {
  descripcion: string;
}

export const defaultUnidadMedidaFilter: IUnidadMedidaFilter = {
  descripcion: "",
};

export interface IUnidadMedidaTable {
  descripcion: string;
  id: string;
}
