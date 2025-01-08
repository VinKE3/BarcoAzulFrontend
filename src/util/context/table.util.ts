import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { ICombo, IGlobalContext, ILoteModalTable, ITipoUsuarioTable } from "../../models";
import { handleToast } from "../global";

//#region Columns
/**
 * Restablece la paginación de la tabla a la página 0 en el contexto global.
 * @param setGlobalContext Función para actualizar el estado del contexto global.
 */
export const resetPagination = (setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>): void => {
  setGlobalContext((x) => ({
    ...x, // Mantener el resto del contexto global sin cambios
    table: {
      ...x.table, // Mantener el resto de las propiedades de la tabla sin cambios
      pagina: 0, // Restablecer la página a 0
    },
  }));
};

/**
 * Verifica si la fila seleccionada es válida. Si no es válida, muestra un mensaje de error.
 * @param row El índice de la fila seleccionada.
 * @returns true si la fila es válida, false en caso contrario.
 */
export const handleRow = (row: number | null): boolean => {
  // Verificar si la fila es nula, no es un número o es un número negativo
  if (row === null || typeof row !== "number" || row < 0) {
    // Mostrar mensaje de error si la fila no es válida
    handleToast("warning", "Por favor, seleccione una fila.");
    return false;
  }
  // Devolver true si la fila es válida
  return true;
};

/**
 * Formatea una fecha en formato ISO (YYYY-MM-DD) a 'dd/MM/yyyy'.
 *
 * @param {string} date - La fecha en formato ISO (YYYY-MM-DD).
 * @returns {string} - La fecha formateada en 'dd/MM/yyyy' o '-' si la fecha es null o indefinida.
 */
export const handleFormatRowDate = (date: string): string => {
  return date ? format(parseISO(date), "dd/MM/yyyy", { locale: es }) : "-";
};

/**
 * Retorna la representación abreviada o completa de una moneda en función del ID proporcionado.
 * @param id El ID de la moneda, que puede ser "S" para soles o cualquier otro valor para dólares.
 * @param abreviado Un valor booleano que determina si se debe devolver la representación abreviada o completa.
 *                  Si es true, devuelve "S/." para soles o "US$" para dólares. Si es false, devuelve "SOLES" para soles o "DÓLARES AMERICANOS" para dólares.
 * @returns La representación de la moneda en formato abreviado o completo según el valor de `abreviado`.
 */
export const handleMonedaRow = (id: string, abreviado: boolean = true): string => {
  // Si abreviado es true, retorna la abreviatura correspondiente: "S/." para soles o "US$" para dólares
  // Si abreviado es false, retorna el nombre completo: "SOLES" para soles o "DÓLARES AMERICANOS" para dólares
  return id === "S" ? (abreviado ? "S/." : "SOLES") : abreviado ? "US$" : "DÓLARES AMERICANOS";
};

/**
 * Obtiene una propiedad de un elemento en una tabla de combinaciones (combo) basado en su ID.
 * @param tablas La lista de combinaciones (combo) donde buscar el elemento.
 * @param id El ID del elemento cuya propiedad se desea obtener.
 * @param prop La propiedad del elemento que se desea obtener.
 * @returns El valor de la propiedad del elemento si se encuentra, una cadena vacía en caso contrario.
 */
export const handleTextDescripcion = (tablas: ICombo[], id: any, prop: keyof ICombo = "descripcion"): string => {
  // Buscar el elemento en la tabla que tenga el ID proporcionado
  const row = tablas.find((x: ICombo) => x.id === id);
  // Devolver el valor de la propiedad del elemento si se encuentra, o una cadena vacía si no se encuentra
  return row ? (row[prop] as string) : "";
};

/**
 * Determina la descripción y clase CSS asociada a un tipo de usuario basado en el código proporcionado.
 * @param tipo Código que representa el tipo de usuario.
 * @returns Un objeto con la descripción y la clase CSS asociada al tipo de usuario.
 */
export const handleTipoUsuario = (tipo: string): ITipoUsuarioTable => {
  switch (tipo) {
    case "AD": {
      return { descripcion: "ADMINISTRADOR", className: "blue" };
    }
    case "PE": {
      return { descripcion: "PERSONALIZADO", className: "green" };
    }
    case "CO": {
      return { descripcion: "CONSULTA", className: "yellow" };
    }
    case "MA": {
      return { descripcion: "MANTENIMIENTO", className: "indigo" };
    }
    case "NO": {
      return { descripcion: "NO CONFIGURADO", className: "gray" };
    }
    default:
      // Si el tipo de usuario no coincide con ninguno de los casos anteriores, devuelve un tipo genérico con clase "gray".
      return { descripcion: tipo, className: "gray" };
  }
};

/**
 * Determina la clase CSS asociada a un estado de respuesta de SUNAT basado en el estado proporcionado.
 * @param estado Estado de respuesta de SUNAT.
 * @returns La clase CSS asociada al estado de respuesta de SUNAT.
 */
export const handleTextEstadoSUNAT = (estado: string): string => {
  switch (estado) {
    case "ACEPTADO": {
      return "green";
    }
    case "ACEPTADO (OBSERVADO)": {
      return "gray";
    }
    case "RECHAZADO": {
      return "red";
    }
    case "ERROR ENVIO": {
      return "yellow";
    }
    default:
      // Si el estado no coincide con ninguno de los casos anteriores, devuelve la clase CSS "gray".
      return "gray";
  }
};

/**
 * Función que determina qué columna se modificará en base al check que se marque
 * 
 * @param {React.Dispatch<React.SetStateAction<IGlobalContext>>} setGlobalContext - Función para actualizar el estado del contexto global.
 * @param {string} origen - Indica el origen de la acción (puede ser "venta" o "defecto").
 * @param {ILoteModalTable} row - La fila completa de la tabla que contiene los datos del lote.
 */
export const handleLoteCheck = (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  origen: string, // Origen venta | defecto
  row: ILoteModalTable // Fila completa de la tabla
): void => {
  setGlobalContext((x) => ({
    ...x,
    form: { ...x.form, retorno: { origen, row } }
  }));
};
//#endregion
