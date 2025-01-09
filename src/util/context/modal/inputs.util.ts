/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { addDays, format, isBefore, parse } from "date-fns";
import { es } from "date-fns/locale";
import {
  defaultTipoCambio,
  IArticuloCompleto,
  ICombo,
  ICuentaBancaria,
  IGlobalContext,
  IPersonal,
  IPersonalTable,
  IPrecios,
  ITipoCambio,
  ITipoPago,
} from "../../../models";
import { getId } from "../../api";
import { handleToast, roundNumber } from "../../global";
import { handleClearMensajes, handleSetErrorMensaje, handleSetTextos } from "../mensajes.util";

/**
 * Enfoca un elemento HTML y desplaza la ventana de visualización hacia la parte superior.
 * @param input RefObject que apunta al elemento HTML que se desea enfocar.
 */
export const handleFocus = (input: React.RefObject<HTMLElement>): void => {
  //Verifica que input.current no sea null
  if (input && input.current) {
    // Enfocar el elemento HTML
    input.current.focus();
    // Desplazar la ventana de visualización hacia la parte superior del elemento
    input.current.scrollTo(0, 0);
  }
};

/**
 * Procesa el valor de un elemento de entrada HTML según su tipo.
 * @param target El elemento de entrada HTML (input, select o textarea) del que se obtendrá el valor.
 * @returns El valor procesado basado en el tipo de entrada (string | number | boolean).
 * - Para los checkboxes, devuelve un valor booleano indicando si está seleccionado.
 * - Para los campos numéricos, convierte el valor a un número.
 * - Para los campos de texto, convierte el valor a mayúsculas.
 * - Para otros tipos de entrada, devuelve el valor tal como está.
 */
export const handleInputType = (
  target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
): string | number | boolean => {
  const { type, value } = target;
  switch (type) {
    case "checkbox":
      return (target as HTMLInputElement).checked;
    case "number":
      return Number(value);
    case "text":
      return value.toUpperCase();
    case "email":
      return value.toUpperCase();
    default:
      return value;
  }
};

/**
 * Maneja la obtención del tipo de cambio para una fecha específica.
 * @param globalContext El contexto global de la aplicación.
 * @param setGlobalContext Función para actualizar el contexto global.
 * @param fecha La fecha para la cual se desea obtener el tipo de cambio.
 * @param inputs Los inputs relacionados que pueden requerir foco.
 * @param focus Indicador para determinar si se debe enfocar en un input específico.
 * @param origenMensaje Origen opcional para mensajes de error.
 * @returns Una promesa que se resuelve con el tipo de cambio correspondiente a la fecha proporcionada.
 */
export const handleTipoCambio = async (
  globalContext: IGlobalContext,
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  fecha: string,
  inputs: any,
  focus: boolean,
  origenMensaje: string = "",
  showError: boolean = true
): Promise<ITipoCambio> => {
  try {
    const menu: string = "Mantenimiento/TipoCambio";

    // Limpiar los mensajes de error antes de proceder
    await handleClearMensajes(setGlobalContext);

    // Obtener el tipo de cambio para la fecha especificada
    return await getId(globalContext, fecha, menu);
  } catch (error) {
    // Manejar el error estableciendo un mensaje de error específico en el contexto global
    showError && handleSetErrorMensaje(setGlobalContext, error, origenMensaje);

    // Si se requiere enfocar en un input específico, manejar el foco
    if (focus) {
      handleFocus(inputs["fechaEmision"]);
    }

    // Devolver un tipo de cambio por defecto en caso de error
    return defaultTipoCambio;
  }
};

/**
 * Maneja la selección del tipo de pago y calcula la nueva fecha basada en el plazo del tipo de pago seleccionado.
 * @param tiposPago Array de tipos de pago disponibles.
 * @param fechaEmision Fecha de emisión en formato string (YYYY-MM-DD).
 * @param tipoPagoId ID del tipo de pago seleccionado.
 * @returns La nueva fecha calculada basada en el plazo del tipo de pago seleccionado, o la fecha actual si no se encuentra el tipo de pago o no tiene plazo definido.
 */
export const handleSelectTipoPago = (
  tiposPago: ITipoPago[],
  fechaEmision: string,
  tipoPagoId: string
): string => {
  // Busca el tipo de pago en el array tiposPago
  const tipoPago = tiposPago.find((x: ITipoPago) => x.id == tipoPagoId);

  // Si se encuentra el tipo de pago
  if (tipoPago) {
    const { plazo } = tipoPago as ITipoPago;

    // Si el tipo de pago tiene un plazo definido
    if (plazo) {
      // Parsear la fecha de emisión
      const parsedFechaEmision: Date = parse(
        fechaEmision,
        "yyyy-MM-dd",
        new Date()
      );
      // Calcula la nueva fecha sumando el plazo al momento de emisión y formatea como YYYY-MM-DD
      const newFecha: string = format(
        addDays(parsedFechaEmision, plazo),
        "yyyy-MM-dd"
      );
      // Si newFecha es indefinido, devuelve la fecha actual formateada como YYYY-MM-DD
      return newFecha ? newFecha : format(new Date(), "yyyy-MM-dd");
    }
  }

  // Si no se encuentra el tipo de pago o no tiene plazo, devuelve la fecha actual formateada como YYYY-MM-DD
  return format(new Date(), "yyyy-MM-dd");
};

/**
 * Construye una cadena formateada que representa la cuenta bancaria seleccionada,
 * incluyendo el número de cuenta, la moneda y el nombre de la entidad bancaria.
 * @param cuentaBancaria Objeto que contiene la información de la cuenta bancaria.
 * @returns Una cadena formateada que muestra el número de cuenta, la moneda y el nombre de la entidad bancaria.
 */
/**
 * Retorna una cadena con el nombre completo del personal
 * @param personal objeto de tipo IPersonal o IPersonalTable a formatear
 * @returns cadena con el nombre completo del personal
 */
export const handleSelectPersonal = (personal: IPersonal | IPersonalTable): string => {
  const { apellidoMaterno, apellidoPaterno, nombres } = personal;
  return `${apellidoPaterno} ${apellidoMaterno} ${nombres}`;
};
export const handleSelectCuentaBancaria = (
  cuentaBancaria: ICuentaBancaria
): string => {
  // Desestructurar los campos necesarios del objeto cuentaBancaria
  const { entidadBancariaNombre, monedaId, numero } = cuentaBancaria;

  // Determinar el símbolo de la moneda en base al monedaId
  const moneda = monedaId === "S" ? "S/." : "US$";

  // Construir y devolver la cadena formateada
  return `${numero} [${moneda}] ${entidadBancariaNombre}`;
};

/**
 * Verifica si la fecha de vencimiento de un lote está dentro de los próximos 90 días desde la fecha actual.
 * Si es así, muestra una advertencia y devuelve un mensaje de texto.
 * @param loteId El ID del lote.
 * @param loteFechaVencimiento La fecha de vencimiento del lote (en formato string, ej. "2024-12-31").
 */
export const handleAlertaVencimiento = (
  loteId: string,
  loteFechaVencimiento: string
): void => {
  // Obtener la fecha actual
  const currentDate = new Date();
  // Convertir la fecha de vencimiento del lote a un objeto Date
  const vencimiento = new Date(loteFechaVencimiento);

  // Calcular la diferencia en milisegundos entre la fecha de vencimiento y la fecha actual
  const diff = vencimiento.getTime() - currentDate.getTime();
  // Convertir la diferencia a días
  const diffInDays = diff / (1000 * 60 * 60 * 24);

  // Si la fecha de vencimiento está dentro de los próximos 90 días
  if (diffInDays <= 90) {
    // Construir el mensaje de alerta
    const mensaje = `Lote: ${loteId} - Vencimiento: ${loteFechaVencimiento}. Está vendiendo un artículo con fecha de vencimiento corto.`;
    // Mostrar una advertencia utilizando toastManager (suponiendo que esto está definido en otro lugar)
    handleToast("warning", mensaje);
  }
};

/**
 * Realiza una validación sobre la cantidad y devuelve un arreglo de textos con los errores encontrados.
 * @param cantidad La cantidad a validar, un número.
 * @returns Un arreglo de textos con mensajes de error. Si la cantidad es válida, el arreglo estará vacío.
 */
export const handleValCantidad = (cantidad: number): string[] => {
  const textos: string[] = []; // Inicializa un arreglo para almacenar los textos de error

  // Verifica si la cantidad es falsy (null, undefined, 0, "", etc.) o menor o igual a 0
  if (!cantidad || cantidad <= 0) {
    textos.push("La cantidad debe ser mayor que 0"); // Agrega un mensaje de error al arreglo
  }

  return textos; // Devuelve el arreglo de textos con mensajes de error (puede estar vacío si no hay errores)
};

/**
 * Realiza validaciones sobre el precio unitario y, opcionalmente, sobre el precio original si se proporciona.
 * @param precioUnitario El precio unitario a validar.
 * @param precioOriginal El precio original opcional para comparación.
 * @returns Un array de strings que contiene mensajes de error o advertencia.
 */
export const handleValPrecio = (
  precioUnitario: number,
  precioOriginal?: number
): string[] => {
  const textos: string[] = []; // Inicializa un array para almacenar los mensajes de validación

  // Validación: El precio unitario debe ser mayor que 0
  if (!precioUnitario || precioUnitario <= 0) {
    textos.push("El precio debe ser mayor que 0");
  }

  // Validaciones adicionales si se proporciona el precio original
  if (precioOriginal !== undefined) {
    // Validación: El precio original debe ser mayor que 0
    if (!precioOriginal || precioOriginal <= 0) {
      textos.push(
        "El precio original debe ser mayor que 0, configure el artículo en el módulo de precio mayorista."
      );
    } else if (precioUnitario < precioOriginal) {
      // Validación: El precio unitario no debe ser inferior al precio original
      textos.push(
        `El precio ingresado: ${precioUnitario}, es inferior al precio original: ${precioOriginal}.`
      );
    }
  }

  return textos; // Devuelve el array de mensajes de validación
};

/**
 * Maneja la validación de vencimiento de un lote en comparación con la fecha de emisión.
 * Retorna mensajes de alerta si el vencimiento es anterior a la fecha de emisión.
 * @param fechaEmision La fecha de emisión del artículo en formato de cadena (DD/MM/YYYY).
 * @param fechaVencimiento La fecha de vencimiento del lote en formato de cadena (DD/MM/YYYY).
 * @param loteNumero El número de lote del artículo.
 * @param showToast Indica si se debe mostrar un mensaje de alerta (por defecto es false).
 * @returns Un array de strings con mensajes de alerta generados durante la validación.
 */
export const handleValVencimientoLote = (
  fechaEmision: string,
  fechaVencimiento: string,
  loteNumero: string,
  showToast: boolean = false
): string[] => {
  // Inicializar un array para almacenar los mensajes de alerta
  const textos: string[] = [];

  // Verificar si se proporcionan tanto el número de lote como la fecha de vencimiento
  if (loteNumero && fechaVencimiento) {
    // Convertir las fechas en objetos Date para facilitar la comparación
    const currentDate: Date = parse(fechaEmision, "dd/MM/yyyy", new Date());
    const vencimiento: Date = parse(fechaVencimiento, "dd/MM/yyyy", new Date());

    // Verificar si la fecha de vencimiento es anterior a la fecha de emisión
    if (isBefore(vencimiento, currentDate)) {
      // Formatear la fecha de vencimiento para mostrar en el mensaje
      const formattedDate: string = format(vencimiento, "dd/MM/yyyy", {
        locale: es,
      });
      // Construir el mensaje de alerta con el número de lote y la fecha de vencimiento formateada
      const mensaje = `Lote: ${loteNumero} - Vencimiento: ${formattedDate}. El artículo ha vencido y no puede ser vendido.`;
      // Mostrar un mensaje de advertencia si showToast es verdadero
      showToast && handleToast("warning", mensaje); // Agregar el mensaje al array de textos
      textos.push(mensaje);
    }
  }

  // Retornar el array de mensajes de alerta generados durante la validación
  return textos;
};

export const handleTiposAfectacion = (
  tiposAfectacionIGV: ICombo[],
  isGratuito: boolean
): ICombo[] => {
  return tiposAfectacionIGV.filter((x) =>
    isGratuito
      ? !["10", "20", "30"].includes(x.id)
      : ["10", "20", "30"].includes(x.id)
  );
};

/**
 * Convierte los precios de un artículo a una moneda diferente usando el tipo de cambio proporcionado.
 * @param setGlobalContext Función para actualizar el contexto global.
 * @param tipo El tipo de conversión, puede ser "venta" o "compra".
 * @param monedaId El ID de la moneda de destino ("D" para dólares).
 * @param tipoCambio El tipo de cambio a usar para la conversión.
 * @param articulo El artículo cuyos precios se van a convertir.
 * @param redondeo La cantidad de decimales a usar en el redondeo.
 * @returns Un objeto con los precios convertidos.
 */
export const handleConvertPrecios = (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  tipo: "venta" | "compra",
  monedaId: string,
  tipoCambio: number = 0,
  articulo: IArticuloCompleto,
  redondeo: number = 2
): IPrecios => {
  const { descripcion, precioVenta1, precioVenta2, precioVenta3, precioVenta4, precioCompra, precioCompraDescuento } =
    articulo;

  // Si la monedaId del parámetro es igual a la monedaId del artículo, retornar los precios originales
  if (monedaId === articulo.monedaId) {
    return {
      precioVenta1,
      precioVenta2,
      precioVenta3,
      precioVenta4,
      precioCompra,
      precioCompraDescuento,
    };
  }

  // Validación: Si el tipo de cambio es cero, mostrar advertencia y retornar los precios por defecto
  if (tipoCambio === 0) {
    handleSetTextos(
      setGlobalContext,
      "detalle",
      [
        "No es posible hacer la conversión de precios si el tipo de cambio es cero (0.00).",
        "Los precios no se han convertido.",
      ],
      3
    );
    return {
      precioVenta1,
      precioVenta2,
      precioVenta3,
      precioVenta4,
      precioCompra,
      precioCompraDescuento,
    };
  }

  // Función auxiliar para convertir los precios
  const convertirPrecio = (precio: number) =>
    monedaId === "D" ? roundNumber(precio / tipoCambio, redondeo) : roundNumber(precio * tipoCambio, redondeo);

  // Crear objeto de precios convertidos
  let precios: IPrecios = {
    precioCompra: convertirPrecio(precioCompra),
    precioCompraDescuento: convertirPrecio(precioCompraDescuento),
    precioVenta1: convertirPrecio(precioVenta1),
    precioVenta2: convertirPrecio(precioVenta2),
    precioVenta3: convertirPrecio(precioVenta3),
    precioVenta4: convertirPrecio(precioVenta4),
  };

  // Si el tipo es "compra", establecer los precios de venta a 0
  if (tipo === "compra") {
    precios = {
      ...precios,
      precioVenta1: 0,
      precioVenta2: 0,
      precioVenta3: 0,
      precioVenta4: 0,
    };
  }

  // Mostrar notificación de éxito
  handleToast("info", `${descripcion} ha sido convertido al tipo de cambio actual.`);
  return precios;
};

/**
 * Calcula el impuesto de bolsa según la fecha de emisión.
 * @param emision La fecha de emisión en formato string (YYYY-MM-DD).
 * @returns El valor del impuesto de bolsa basado en el año de emisión.
 */
export const handleImpuestoBolsa = (emision: string): number => {
  const date = new Date(emision);
  if (!isNaN(date.getTime())) {
    const year = date.getFullYear();
    switch (year) {
      case 2019:
        return 0.1;
      case 2020:
        return 0.2;
      case 2021:
        return 0.3;
      case 2022:
        return 0.4;
      default:
        return year > 2022 ? 0.5 : 0;
    }
  }
  return 0;
};