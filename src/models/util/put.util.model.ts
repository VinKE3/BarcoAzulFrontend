import { IGlobalContext } from "../context";
import { ModalIdType, ModalPropType } from "../types";

/**
 * Parámetros utilizados para configurar y realizar una solicitud HTTP PUT en la aplicación.
 * @interface IPutParams
 * @property {IGlobalContext} globalContext - El contexto global de la aplicación que contiene la configuración del API.
 * @property {string} menu - El identificador del menú que determina el endpoint al que se enviará la solicitud.
 * @property {ModalIdType} [id] - (Opcional) El identificador único del recurso que se actualizará.
 * @property {URLSearchParams} [urlParams] - (Opcional) Parámetros adicionales para incluir en la URL de la solicitud.
 * @property {any} data - Los datos que se enviarán en el cuerpo de la solicitud.
 * @property {boolean} [isBlob=false] - Indica si la respuesta debe devolverse en formato Blob.
 * @property {boolean} [allData=false] - Indica si se debe devolver toda la respuesta o solo los mensajes contenidos en ella.
 */
export interface IPutParams {
  globalContext: IGlobalContext;
  menu: string;
  id?: ModalIdType;
  urlParams?: URLSearchParams;
  data?: unknown;
  isBlob?: boolean;
  allData?: boolean;
}

/**
 * Parámetros utilizados para configurar y realizar una solicitud HTTP PUT en la aplicación.
 * @interface IPutAnularParams
 * @property {IGlobalContext} globalContext - El contexto global de la aplicación que contiene la configuración del API.
 * @property {string} menu - El identificador del menú que determina el endpoint al que se enviará la solicitud.
 * @property {ModalIdType} [id] - (Opcional) El identificador único del recurso que se actualizará.
 * @property {URLSearchParams} [urlParams] - (Opcional) Parámetros adicionales para incluir en la URL de la solicitud.
 * @property {any} data - Los datos que se enviarán en el cuerpo de la solicitud.
 * @property {boolean} [allData=false] - Indica si se debe devolver toda la respuesta o solo los mensajes contenidos en ella.
 */
export interface IPutAnularParams {
  globalContext: IGlobalContext;
  modalProp: ModalPropType;
  menu?: string;
  isPermitido: boolean;
  allData?: boolean;
}
