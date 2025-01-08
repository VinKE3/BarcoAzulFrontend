import { ModalCrudType, ModalPropType } from "../types";
export interface ITableComponent {
  data: any; // Datos a ser mostrados en la tabla, generalmente un array de objetos.
  columns: any; // Definición de las columnas de la tabla, utilizada por 'react-table' para renderizar los encabezados y las celdas.
  tableClassName: string; // Nombre de la clase CSS para estilizar la tabla.
  modalProp?: ModalPropType; // Propiedades del modal que se abrirá al hacer doble clic en una fila (nivel del modal: "primer", "segundo", "tercer").
  modalTipo?: ModalCrudType; // Tipo de modal que se abrirá, por ejemplo, "consultar".
  identifier?: string; // Identificador único para las filas, utilizado para identificar cada fila individualmente.
  isTablas?: boolean; // Indica si la tabla está habilitada para ciertas operaciones específicas de tablas.
  isPermitido?: boolean; // Indica si se permiten ciertas acciones en la tabla, como la selección de filas.
  pagination?: boolean; // Indica si se debe mostrar la paginación para la tabla.
  selectable?: boolean; // Indica si las filas de la tabla son seleccionables mediante clic.
  doubleClick?: boolean; // Indica si se debe habilitar la funcionalidad de doble clic en las filas.
  alwaysSelected?: boolean; // Indica si siempre debe haber una fila seleccionada, seleccionando automáticamente la primera fila.
  onKeyDown?: (x: any) => Promise<void> | void; // Función para manejar eventos de teclado cuando se navega en la tabla.
  border?: boolean; // Indica si se deben mostrar bordes alrededor de las celdas de la tabla.
}
