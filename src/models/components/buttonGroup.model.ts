import { ModalPropType } from "../types";

export interface IButtonGroup {
  children?: React.ReactNode; // Elementos hijos opcionales que se pueden pasar al componente
  modalProp?: ModalPropType; // El nivel en el que se abrirá el modal (primer | segundo | tercer)
  isTablas?: boolean; // Indica si se están usando tablas
  isPermitido?: boolean; // Indica si la acción está permitida
  showRegistrar?: boolean; // Indica si se debe mostrar el botón de registrar
  showAnular?: boolean; // Indica si se debe mostrar el botón de anular
  showImprimir?: boolean; // Indica si se debe mostrar el botón de imprimir
}
