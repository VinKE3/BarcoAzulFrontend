import { ModalCrudType } from "../../../types/modal.types";
import { ICombo } from "../../../global";

export interface IClienteContacto {
  tipo: ModalCrudType; //Para validar crud de detalles
  id: string;
  clienteId: string;
  contactoId: number;
  nombres: string;
  numeroDocumentoIdentidad: string | null;
  celular: string | null;
  telefono: string | null;
  cargoId: number | null;
  correoElectronico: string | null;
  direccion: string | null;
}

export const defaultClienteContacto: IClienteContacto = {
  tipo: "registrar",
  id: "",
  clienteId: "",
  contactoId: 0,
  nombres: "",
  numeroDocumentoIdentidad: null,
  celular: null,
  telefono: null,
  cargoId: 0,
  correoElectronico: null,
  direccion: null,
};

export interface IClienteContactoTablas {
  cargos: ICombo[];
}

export const defaultClienteContactoTablas: IClienteContactoTablas = {
  cargos: [],
};
