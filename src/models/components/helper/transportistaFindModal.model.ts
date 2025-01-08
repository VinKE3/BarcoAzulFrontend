export interface ITransportistaFindModal {
  modalidad: string;
  inputFocus: string;
}

export interface ITransportistaFindFilter {
  numeroDocumentoIdentidad: string;
  nombre: string;
}

export const defaultTransportistaFindFilter: ITransportistaFindFilter = {
  numeroDocumentoIdentidad: "",
  nombre: "",
};

export interface ITransportistaFind extends ITransportistaFindTable {
  origen: string;
}

export interface ITransportistaFindTable {
  id: string;
  numeroDocumentoIdentidad: string;
  nombre: string;
  direccion: string | null;
}
