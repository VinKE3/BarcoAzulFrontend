/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGlobalContext } from "../context";
import { ModalCrudType, ModalPropType } from "../types";

/**
 * Parámetros utilizados para configurar y abrir un modal secundario en la aplicación.
 * @interface IHandleSecondaryModalParams
 * @property globalContext - El contexto global actual de la aplicación.
 * @property setGlobalContext - Función para actualizar el contexto global.
 * @property isTablas - Indica si se deben obtener tablas relacionadas. Valor por defecto: `true`.
 * @property dataForm - Los datos del formulario a utilizar. Si no se especifica, se mantiene el valor actual.
 * @property rowProp - Nombre de la propiedad en la fila que se usará como identificador. Valor por defecto: `"id"`.
 * @property tipo - El tipo de operación que define el comportamiento del modal. Valor por defecto: `"adicional"`.
 * @property modalProp - Define el nivel del modal a actualizar en el contexto (`"primer"`, `"segundo"`, etc.). Valor por defecto: `"primer"`.
 */
export interface IHandleSecondaryModalParams {
  globalContext: IGlobalContext;
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>;
  origen: string;
  tipo?: ModalCrudType;
  isTablas?: boolean;
  dataForm?: any;
  rowProp?: string;
  modalProp?: ModalPropType;
}

