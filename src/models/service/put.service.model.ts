import { ConfigResponseType } from "../types";

/**
 * Parámetros utilizados para configurar y realizar una solicitud HTTP PUT en la aplicación.
 * @interface IPutServiceParams
 * @property {string} endPoint - La URL completa del endpoint al que se enviará la solicitud PUT.
 * @property {any} data - Los datos que se enviarán en el cuerpo de la solicitud PUT.
 * @property {boolean} [allData=false] - Indica si se debe devolver toda la respuesta o solo los datos contenidos en ella.
 * @property {ConfigResponseType} responseType - El tipo de respuesta esperada, ya sea JSON o Blob.
 */
export interface IPutServiceParams {
  endPoint: string;
  data: any;
  allData?: boolean;
  responseType: ConfigResponseType;
}