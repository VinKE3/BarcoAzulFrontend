/**
 * Representa una estructura de tabla genérica con datos, paginación y una fila seleccionada.
 *
 * @typeParam T - El tipo de datos que contendrá la tabla (por defecto es `unknown`).
 * @typeParam rowType - El tipo del identificador de la fila seleccionada (por defecto es `number | null`).
 */
export interface ITable<T = unknown, rowType = number | null> {
  data: T[];
  total: number;
  pagina: number;
  row: rowType;
}

export const defaultTable: ITable = {
  data: [],
  total: 0,
  pagina: 0,
  row: null,
};
