import { IResponseBlob, IOptionType } from "../../models";

//#region Formatos numéricos
/**
 * Formatea un número con una precisión dada y añade comas para miles.
 * @param number El número a formatear, puede ser un string o un número.
 * @param precision La cantidad de decimales a mostrar (por defecto 2).
 * @returns El número formateado como string.
 */
export const formatNumber = (number: number | string, precision: number = 2): string => {
  // Redondear el número a la precisión especificada
  const roundedNumber = roundNumber(Number(number), precision);
  // Convertir el número redondeado a una cadena con la precisión dada
  const formatted = roundedNumber.toFixed(precision);

  // Dividir la cadena en dos partes: antes y después del punto decimal
  const parts = formatted.split(".");
  // Añadir comas como separadores de miles en la parte entera del número
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Unir las partes y devolver el número formateado
  return parts.join(".");
};

/**
 * Redondea un número a una precisión dada.
 * @param number El número a redondear.
 * @param precision La cantidad de decimales a mantener (por defecto 2).
 * @returns El número redondeado.
 */
export const roundNumber = (number: number, precision: number = 2): number => {
  // Calcular el factor de redondeo basado en la precisión
  const factor = Math.pow(10, precision);
  // Redondear el número multiplicado por el factor y luego dividir por el mismo factor
  return Math.round(number * factor) / factor;
};

/**
 * Maneja un número permitiendo redondeo y formateo según los parámetros dados.
 * @param number El número a manejar, puede ser un string o un número.
 * @param round Indica si el número debe ser redondeado (por defecto false).
 * @param format Indica si el número debe ser formateado (por defecto false).
 * @param precision La cantidad de decimales a mantener (por defecto 2).
 * @returns El número procesado, puede ser un string o un número dependiendo del formato.
 */
export const handleNumber = (
  number: number | string,
  round: boolean = false,
  format: boolean = false,
  precision: number = 2
): string | number => {
  let result = number;

  // Redondear el número si se especifica
  if (round) {
    result = roundNumber(Number(result), precision);
  }

  // Formatear el número si se especifica
  if (format) {
    result = formatNumber(Number(result), precision);
  }

  // Si el resultado es un número, agregar ".00" si no tiene decimales
  if (typeof result === "number") {
    const decimalPart = result % 1;
    if (decimalPart === 0) {
      result = result.toFixed(precision);
    }
  }

  // Devolver el resultado final
  return result;
};
//#endregion

//#region Impresión
/**
 * Maneja la respuesta de un PDF, ya sea abriéndolo en una nueva pestaña o descargándolo automáticamente.
 * @param response La respuesta que contiene el blob del PDF y los encabezados.
 * @param openInNewTab Indica si el PDF debe abrirse en una nueva pestaña (por defecto true).
 * @returns Una promesa que se resuelve cuando el PDF ha sido manejado.
 */
export const handlePdf = async (response: IResponseBlob, openInNewTab: boolean = true): Promise<void> => {
  // Obtener el encabezado "content-disposition" de la respuesta para determinar el nombre del archivo
  const contentDisposition = response.headers["content-disposition"];
  // Usar una expresión regular para extraer el nombre del archivo del encabezado
  const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
  // Establecer el nombre del archivo, por defecto "documento.pdf" si no se encuentra en el encabezado
  const filename = filenameMatch && filenameMatch[1] ? filenameMatch[1] : "documento.pdf";

  // Crear un blob con el contenido de la respuesta, especificando el tipo MIME como "application/pdf"
  const blob = new Blob([response.data], { type: "application/pdf" });
  // Crear una URL temporal para el blob
  const url: string = URL.createObjectURL(blob);

  if (openInNewTab) {
    // Si openInNewTab es verdadero, abrir el PDF en una nueva pestaña
    window.open(url, "_blank");
  } else {
    // Si openInNewTab es falso, descargar el PDF automáticamente
    const downloadLink = document.createElement("a"); // Crear un enlace temporal
    downloadLink.href = url; // Establecer la URL del enlace al blob
    downloadLink.download = filename; // Establecer el nombre del archivo para la descarga
    downloadLink.click(); // Simular un clic en el enlace para iniciar la descarga
  }
};

/**
 * Maneja la respuesta de un archivo Excel (XLSX), descargándolo automáticamente.
 * @param response La respuesta que contiene el blob del archivo Excel y los encabezados.
 * @returns Una promesa que se resuelve cuando el archivo Excel ha sido manejado.
 */
export const handleExcel = async (response: IResponseBlob): Promise<void> => {
  // Obtener el encabezado "content-disposition" de la respuesta para determinar el nombre del archivo
  const contentDisposition = response.headers["content-disposition"];
  // Usar una expresión regular para extraer el nombre del archivo del encabezado
  const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
  // Establecer el nombre del archivo, por defecto "documento.xlsx" si no se encuentra en el encabezado
  const filename = filenameMatch && filenameMatch[1] ? filenameMatch[1] : "documento.xlsx";

  // Crear un blob con el contenido de la respuesta, especificando el tipo MIME como XLSX
  const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  // Crear una URL temporal para el blob
  const url: string = URL.createObjectURL(blob);

  // Crear un enlace temporal para la descarga del archivo
  const downloadLink = document.createElement("a");
  downloadLink.href = url; // Establecer la URL del enlace al blob
  downloadLink.download = filename; // Establecer el nombre del archivo para la descarga
  downloadLink.click(); // Simular un clic en el enlace para iniciar la descarga
};

//#endregion

export const meses = [
  { numero: "", nombre: "TODOS" },
  { numero: 1, nombre: "ENERO" },
  { numero: 2, nombre: "FEBRERO" },
  { numero: 3, nombre: "MARZO" },
  { numero: 4, nombre: "ABRIL" },
  { numero: 5, nombre: "MAYO" },
  { numero: 6, nombre: "JUNIO" },
  { numero: 7, nombre: "JULIO" },
  { numero: 8, nombre: "AGOSTO" },
  { numero: 9, nombre: "SETIEMBRE" },
  { numero: 10, nombre: "OCTUBRE" },
  { numero: 11, nombre: "NOVIEMBRE" },
  { numero: 12, nombre: "DICIEMBRE" },
];


export const yearsText = (): IOptionType[] => {
  const startYear = 2010;
  const numYears = 50;
  const yearsArray: IOptionType[] = [];

  for (let i = 0; i < numYears; i++) {
    const year = startYear + i;
    yearsArray.push({
      value: year.toString(),
      descripcion: year.toString(),
    });
  }

  return yearsArray;
};

export const monthsText: IOptionType[] = [
  { value: "01", descripcion: "Enero" },
  { value: "02", descripcion: "Febrero" },
  { value: "03", descripcion: "Marzo" },
  { value: "04", descripcion: "Abril" },
  { value: "05", descripcion: "Mayo" },
  { value: "06", descripcion: "Junio" },
  { value: "07", descripcion: "Julio" },
  { value: "08", descripcion: "Agosto" },
  { value: "09", descripcion: "Setiembre" },
  { value: "10", descripcion: "Octubre" },
  { value: "11", descripcion: "Noviembre" },
  { value: "12", descripcion: "Diciembre" },
];
