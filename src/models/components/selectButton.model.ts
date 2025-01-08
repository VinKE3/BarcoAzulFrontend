import { IconType } from "react-icons/lib";
import { ISubModal } from "../context";
import { ModalPropType } from "../types";

export interface ISelectButton {
  modalProp?: ModalPropType; //Propiedad del modal a ser abierta, por defecto es "segundo".
  retorno?: any; //Datos a retornar al contexto global
  closeModal?: boolean; // Opcional para determinar si cerrar o no el modal luego de seleccionar.

  isSubModal?: boolean; // Indica si se debe actualizar con un sub-modal específico (opcional).
  subModalProp?: ModalPropType; //Propiedad del subModal a ser abierto, por defecto es "tercer".
  subModal?: ISubModal; //Información del submodal a ser abierto (tipo, id).

  inputFocus?: string; //Identificador del input que debe recibir el foco después de la acción.
  className?: string; // Clase CSS para estilizar el botón, por defecto es "button-base-bg-secondary".
  Icon?: IconType; // Icono opcional para reemplazar los predeternimados (seleccionar y buscar)
  iconSize?: string; //Tamaño del icono, por defecto es "1rem"
}
