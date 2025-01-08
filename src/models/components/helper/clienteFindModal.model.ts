export interface IClienteFindModal {
  inputFocus: string;
}

export interface IClienteFindFilter {
  numeroDocumentoIdentidad: string;
  nombre: string;
}

export const defaultClienteFindFilter: IClienteFindFilter = {
  numeroDocumentoIdentidad: "",
  nombre: "",
};

export interface IClienteFind extends IClienteFindTable {
  origen: string;
}

export interface IClienteFindTable {
  id: string;
  numeroDocumentoIdentidad: string;
  nombre: string;
}
