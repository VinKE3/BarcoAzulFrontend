import { IGlobalContext } from "../../../models";
import { get } from "./get.util";

/**
 * Realiza una solicitud GET para obtener datos en formato JSON o Blob.
 * @param global El contexto global de la aplicación.
 * @param menu - Identificador opcional del menú, para especificar el endpoint al que se realiza la solicitud.
 * @param isBlob - Indicador para devolver la respuesta en formato Blob (opcional, por defecto es false).
 * @returns Una promesa que resuelve con la respuesta de la solicitud HTTP.
 */
export const getImprimir = async (
  globalContext: IGlobalContext,
  menu?: string,
  allData: boolean = true,
  isBlob: boolean = true
): Promise<any> => {
  const { api } = globalContext; // Obtener la API del contexto
  const selectedMenu: string = menu ?? api.menu; // Determinar el menú seleccionado, utilizando el parámetro o el valor por defecto de la API

  // Realizar la llamada al endpoint
  return await get({ globalContext, menu: selectedMenu, allData, isBlob });
};
