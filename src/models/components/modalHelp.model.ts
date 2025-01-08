import { ModalPropType } from "../types";

export interface IModalHelp {
  children?: React.ReactNode; // Contenido del modal
  modalProp?: ModalPropType; // El nivel en el que se abrirá el modal (primer | segundo | tercer)

  data?: any; // Datos para la tabla
  columns?: any; // Columnas para la tabla
  showTable?: boolean; // Bandera para mostrar o no la tabla
  clearRetorno?: boolean; // Indica si se debe limpiar el campo 'retorno' del formulario (por defecto es false).
  selectable?: boolean; // Bandera para habilitar el seleccionado de filas en la tabla
  alwaysSelected?: boolean; // Bandear para seleccionar o no una fila por defecto
  handleKeyDown?: (x: any) => Promise<void> | void; // Función para manejar eventos de la tabla

  title: string; // Título del modal
  selector?: string; // Selector CSS para encontrar elementos dentro del modal
  inputFocus?: string; // Nombre del input que recibirá el foco al cerrar el modal
  classNameModal: string; // Clases CSS adicionales para estilizar el contenedor del modal
  classNameTable?: string; // Clases CSS adicionales para estilizar la tabla
  showFooter?: boolean; // Bandera para mostrar o no el footer
  buttonFooter?: React.ReactNode; // Boton adicional opcional para el footer
}
