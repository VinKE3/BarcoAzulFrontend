import { IGlobalContext } from "../context";

/**
 * Parámetros utilizados asignar el objeto filtro al contexto global
 * @interface IHandleSetFilterParams
 * @property setGlobalContext - Función para actualizar el contexto global.
 * @property filter - Los datos del filtro a utilizar.
 */
export interface IHandleSetFilterParams {
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>;
  filter?: any;
}
