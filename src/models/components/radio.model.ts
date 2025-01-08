import { ChangeEvent } from "react";

export interface IRadio {
  id: string; // Identificador del radio button
  name: string; // Nombre del grupo de radio buttons
  value: any; // Valor del radio button
  checked?: boolean; // Indica si el radio button está seleccionado
  handleData: (target: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void; // Función para manejar el cambio de valor
  label?: string; // Etiqueta opcional para el radio button
  disabled?: boolean; // Indica si el radio button está deshabilitado
}
