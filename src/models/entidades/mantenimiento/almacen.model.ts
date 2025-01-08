export interface IAlmacen {
  id: string;
  descripcion: string;
}

export const defaultAlmacen: IAlmacen = {
  id: "",
  descripcion: "",
};

export interface IAlmacenFilter {
  descripcion: string;
}

export const defaultAlmacenFilter: IAlmacenFilter = {
  descripcion: "",
};

export interface IAlmacenTable {
  id: string;
  descripcion: string;
}

export interface IAlmacenRelacionado extends IAlmacen {
  isDefault: boolean;
}

export const defaultAlmacenRelacionado: IAlmacenRelacionado = {
  ...defaultAlmacen,
  isDefault: false,
};
