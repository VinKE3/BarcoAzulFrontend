import { ModalCrudType } from "../../../types";

export interface IGuiaRemisionTransportista {
  tipoModal: ModalCrudType;

  item: number;
  tipoConductor: string | null;

  transportistaId: string;
  tipoDocumentoIdentidadId: string;
  numeroDocumentoIdentidad: string;

  nombre: string;
  apellidos: string;

  correoElectronico: string | null;
  direccion: string | null;

  licenciaConducir: string | null;
  numeroRegistroMTC: string | null;
}

export const defaultGuiaRemisionTransportista: IGuiaRemisionTransportista = {
  tipoModal: "registrar",

  item: 0,
  tipoConductor: null,

  transportistaId: "",
  tipoDocumentoIdentidadId: "",
  numeroDocumentoIdentidad: "",
  nombre: "",
  apellidos: "",

  correoElectronico: null,
  direccion: null,

  licenciaConducir: null,
  numeroRegistroMTC: null,
};
