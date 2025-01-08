export interface IProveedorFindModal {
  inputFocus: string;
}

export interface IProveedorFindFilter {
  numeroDocumentoIdentidad: string;
  nombre: string;
}

export const defaultProveedorFindFilter: IProveedorFindFilter = {
  numeroDocumentoIdentidad: "",
  nombre: "",
};

export interface IProveedorFind extends IProveedorFindTable {
  origen: string;
}

export interface IProveedorFindTable {
  id: string;
  nombre: string;
  numeroDocumentoIdentidad: string;
  telefono: string;
  direccion: string;
}
