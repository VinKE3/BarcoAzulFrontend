import { ConfigResponseType, IPutParams, IResponse } from "../../../models";
import { putService } from "../../../services";

/**
 * Realiza una solicitud HTTP PUT a un endpoint específico utilizando la configuración proporcionada en el contexto global.
 *
 * @async
 * @function put
 * @param {IPutParams} params - Los parámetros necesarios para realizar la solicitud.
 * @param {IGlobalContext} params.globalContext - El contexto global de la aplicación que contiene la configuración del API.
 * @param {string} params.menu - El identificador del menú que especifica el endpoint.
 * @param {ModalIdType} [params.id=null] - (Opcional) Identificador único del recurso para construir el endpoint.
 * @param {URLSearchParams} [params.urlParams] - (Opcional) Parámetros adicionales para la URL de la solicitud.
 * @param {any} [params.data=null] - Datos que se enviarán en el cuerpo de la solicitud.
 * @param {boolean} [params.isBlob=false] - Indica si la respuesta debe devolverse como un Blob.
 * @param {boolean} [params.allData=false] - Indica si se debe devolver toda la respuesta o solo los mensajes.
 *
 * @returns {Promise<any>} Una promesa que se resuelve con la respuesta completa o solo los mensajes, según el valor de `allData`.
 *
 */
export const put = async ({
  globalContext,
  menu,
  id = null,
  urlParams,
  data = null,
  allData = false,
  isBlob = false,
}: IPutParams): Promise<any> => {
  const { api } = globalContext;
  const { callEndpoint } = api;
  const selectedMenu = menu ?? api.menu;
  const url: string = id ? `${selectedMenu}/${id}` : selectedMenu;
  const endPoint: string = urlParams ? `${url}?${urlParams}` : url;
  const responseType: ConfigResponseType = isBlob ? "blob" : "json";

  const response: IResponse = await callEndpoint(
    putService({ endPoint, data, allData, responseType })
  );
  return allData ? response : response.messages; // Devolver toda la respuesta o solo los mensajes, según allData
};
