import { ModalCrudType } from "../../../types/modal.types";
import { ICombo } from "../../../global";

export interface IProveedorContacto {
  tipo: ModalCrudType; //Para validar crud de detalles
  id: string;
  proveedorId: string;
  contactoId: number;
  nombres: string;
  numeroDocumentoIdentidad: string | null;
  celular: string | null;
  telefono: string | null;
  cargoId: number | null;
  correoElectronico: string | null;
  direccion: string | null;
}

export const defaultProveedorContacto: IProveedorContacto = {
  tipo: "registrar",
  id: "",
  proveedorId: "",
  contactoId: 0,
  nombres: "",
  numeroDocumentoIdentidad: null,
  celular: null,
  telefono: null,
  cargoId: 0,
  correoElectronico: null,
  direccion: null,
};

export interface IProveedorContactoTablas {
  cargos: ICombo[];
}

export const defaultProveedorContactoTablas: IProveedorContactoTablas = {
  cargos: [],
};
