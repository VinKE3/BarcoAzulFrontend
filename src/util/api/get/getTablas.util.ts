/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGlobalContext } from "../../../models";
import { get } from "./get.util";

/**
 * Realiza una solicitud GET para consultar las tablas relacionadas a un módulo (FormularioTablas, FiltroTablas).
 * @param global El contexto global de la aplicación.
 * @param menu - Identificador opcional del menú, para especificar el endpoint al que se realiza la solicitud.
 * @param isFiltro - Indicador para validar si se hará la consulta a Formulario o Filtro (opcional, por defecto es false).
 * @returns Una promesa que resuelve con un objeto `Tablas` que contiene los datos de la consulta.
 */
export const getTablas = async (
  globalContext: IGlobalContext,
  menu?: string,
  isFiltro: boolean = false
): Promise<any> => {
  const { api } = globalContext;
  const selectedMenu: string = menu ?? api.menu; // Determinar el menú seleccionado
  const url: string = `${selectedMenu}/${
    isFiltro ? "FiltroTablas" : "FormularioTablas"
  }`; // Construir la URL

  return await get({ globalContext, menu: url }); // Llamada al servicio para obtener las tablas
};
