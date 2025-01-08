import { IGlobalContext } from "../context";
import { ModalCrudType, ModalIdType, ModalPropType } from "../types";

export interface IGetParams {
  globalContext: IGlobalContext;
  menu?: string;
  id?: ModalIdType;
  urlParams?: URLSearchParams;
  data?: unknown;
  isBlob?: boolean;
  allData?: boolean;
}

export interface IGetIsPermitidoParams {
  globalContext: IGlobalContext;
  accion: ModalCrudType;
  modalProp?: ModalPropType;
  id?: ModalIdType;
  menu?: string;
}
