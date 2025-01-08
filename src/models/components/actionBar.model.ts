import { ModalPropType } from "../types";

export interface IActionBar {
  modalProp?: ModalPropType; // El nivel en el que se abrirá el modal (primer | segundo | tercer)
  tipoModalProp?: string; // Propiedad opcional para manejar tipos de modal específicos.
  rowData?: any; // Datos de la fila que se está manipulando.
  id: string; // Identificador del registro.

  isAdminPermisos?: boolean; // Indica si se deben usar permisos administrativos.
  isTablas?: boolean; // Indica si se están usando tablas.
  isPermitido?: boolean; // Indica si la acción está permitida.

  returnRetorno?: boolean; // Propiedad opcional para reemplazar datos en el envío.
  showConsultar?: boolean; // Indica si se debe mostrar el botón de consultar.
  showModificar?: boolean; // Indica si se debe mostrar el botón de modificar.
  showEliminar?: boolean; // Indica si se debe mostrar el botón de eliminar.
}
