/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGlobalContext, ITable } from "../../../models";
import { get } from "./get.util";

// La función getListar se utiliza para obtener un array de datos que se pueden utilizar para llenar una tabla en una aplicación. Esta función realiza una solicitud GET a un endpoint específico, utilizando los parámetros y el contexto global proporcionados.

/**
 * Realiza una solicitud GET para obtener un array de datos que se pueden utilizar para llenar una tabla en una aplicación.
 * @param global El contexto global de la aplicación.
 * @param params - Parámetros de búsqueda para la consulta.
 * @param menu - Identificador opcional del menú, para especificar el endpoint al que se realiza la solicitud.
 * @returns Una promesa que resuelve con la respuesta, retorna un objeto ITable en caso sea satisfactoria.
 */
export const getListar = async (
  globalContext: IGlobalContext,
  params?: URLSearchParams,
  menu?: string
): Promise<ITable | any> => {
  const { api, table } = globalContext; // Obtener api y table del contexto global
  const { pagina } = table; // Obtener la página actual de la tabla
  const selectedMenu: string = menu ?? api.menu; // Determinar el menú seleccionado
  const menuListar: string = `${selectedMenu}/Listar?pagina=${pagina + 1}`; // Crear la URL base para la solicitud
  const url: string = params ? `${menuListar}&${params}` : menuListar; // Añadir parámetros si existen

  // Realizar la solicitud GET y devolver la respuesta
  return await get({ globalContext, menu: url });
};
