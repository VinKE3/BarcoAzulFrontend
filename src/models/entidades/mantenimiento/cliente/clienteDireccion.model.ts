import { ModalCrudType } from "../../../types/modal.types";
import { IDepartamento } from "../departamento.model";

export interface IClienteDireccion {
  tipo: ModalCrudType; //Para validar crud de detalles
  id: number;
  clienteId: string;
  comentario: string;
  direccion: string;
  departamentoId: string;
  provinciaId: string;
  distritoId: string;
  isActivo: boolean;
}

export const defaultClienteDireccion: IClienteDireccion = {
  tipo: "registrar",
  id: 0,
  clienteId: "",
  comentario: "",
  direccion: "",
  departamentoId: "",
  provinciaId: "",
  distritoId: "",
  isActivo: true,
};

export interface IClienteDireccionTablas {
  departamentos: IDepartamento[];
}

export const defaultClienteDireccionTablas: IClienteDireccionTablas = {
  departamentos: [],
};
