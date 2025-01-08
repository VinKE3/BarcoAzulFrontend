import { IConsultaRUC, IConsultaTipoCambio, IGlobalContext } from "../../../models";
import { get } from "./get.util";

/**
 * Realiza una solicitud GET para consultar datos de RUC o DNI.
 * @param global El contexto global de la aplicación.
 * @param params - Parámetros de búsqueda para la consulta.
 * @returns Una promesa que resuelve con un objeto `IConsultaRUC` que contiene los datos de la consulta.
 */
export const getConsultarRucDni = async (globalContext: IGlobalContext, urlParams: URLSearchParams): Promise<IConsultaRUC> => {
  return await get({ globalContext, menu: "Servicio/ConsultarRucDni", urlParams }); // Llamada al servicio para consultar RUC/DNI
};

/**
 * Realiza una solicitud GET para obtener el tipo de cambio.
 * @param global El contexto global de la aplicación.
 * @param params - Parámetros de búsqueda para la consulta.
 * @returns Una promesa que resuelve con un objeto `IConsultaTipoCambio` que contiene los datos del tipo de cambio.
 */
export const getConsultarTipoCambio = async (globalContext: IGlobalContext, urlParams: URLSearchParams): Promise<IConsultaTipoCambio> => {
  return await get({ globalContext, menu: "Servicio/ConsultarTipoCambio", urlParams }); // Llamada al servicio para consultar tipo de cambio
};
