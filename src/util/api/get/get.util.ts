/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigResponseType, IGetParams } from "../../../models";
import { getService } from "../../../services";

/**
 * Realiza una solicitud GET para obtener toda la respuesta o solo los datos .
 * @param global El contexto global de la aplicación.
 * @param menu - Identificador opcional del menú, para especificar el endpoint al que se realiza la solicitud.
 * @param allData - Indicador para devolver toda la repsuesta o solo los datos.
 * @param isBlob - Indicador para devolver la respuesta en formato Blob (opcional, por defecto es false).
 * @returns Una promesa que resuelve con la respuesta de la solicitud HTTP.
 */
export const get = async ({
  globalContext,
  menu,
  urlParams,
  allData = false,
  isBlob = false,
}: IGetParams): Promise<any> => {
  const { api } = globalContext;
  const { callEndpoint } = api;
  const selectedMenu: string = menu ?? api.menu;
  const url: string = urlParams ? `${selectedMenu}?${urlParams}` : selectedMenu;
  const responseType: ConfigResponseType = isBlob ? "blob" : "json";

  const response = await callEndpoint(
    getService({ url, isBlob, allData, responseType })
  );
  return allData ? response : response.data;
};
