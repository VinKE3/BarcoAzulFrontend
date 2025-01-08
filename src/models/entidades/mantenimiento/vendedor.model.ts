export interface IVendedor {
  id: string;
  nombre: string;
  clave: string;
}

export const defaultVendedor: IVendedor = {
  id: "",
  nombre: "",
  clave: "",
};

export interface IVendedorFilter {
  nombre: string;
}

export const defaultVendedorFilter: IVendedorFilter = {
  nombre: "",
};

export interface IVendedorTable {
  clave: string;
  id: string;
  nombre: string;
}
