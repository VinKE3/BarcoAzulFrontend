import { ModalPropType } from "../../types";

export interface IArticuloFaltanteModal {
  modalProp?: ModalPropType; // Propiedad opcional para el identificador del modal
  menu?: string; // Propiedad opcional para el menú
  text: string; // Propiedad obligatoria para el texto a mostrar
}
