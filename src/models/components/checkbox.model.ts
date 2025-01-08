import { ChangeEvent } from "react";

export interface ICheckBox {
  id: string; // Identificador del checkbox
  name?: string; // Para ser utilizado en el handleData
  value: any; // Valor del checkbox
  handleData: (target: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Función para manejar el cambio de valor
  label?: string; // Etiqueta opcional para el checkbox
  disabled?: boolean; // Indica si el checkbox está deshabilitado
  autoFocus?: boolean; // Indica si el checkbox inicia con el focus
}
