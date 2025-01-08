/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { NavigateFunction } from "react-router-dom";
import {
  IForm,
  IGlobalContext,
  IHandleSecondaryModalParams,
  IModal,
  IModales,
  IPermisos,
  InputFocusType,
  ModalPropType,
  defaultForm,
  defaultModal,
} from "../../../models";
import { getId, getIsPermitido, getTablas } from "../../api";
import { handleClearMensajes } from "../mensajes.util";
import { handleRow } from "../table.util";

/**
 * Maneja la obtención de datos iniciales para un formulario, incluyendo la verificación de permisos,
 * obtención de datos por ID y obtención de tablas relacionadas.
 * @param global El contexto global de la aplicación.
 * @param defaultValue El valor por defecto para los datos si no se proporciona un ID.
 * @param modalProp La propiedad del modal a utilizar en el contexto (por defecto es "primer").
 * @param menu - Identificador opcional del menú, para especificar el endpoint al que se realiza la solicitud.
 * @param isPermitido Indicador opcional para verificar permisos.
 * @returns Una promesa que se resuelve con los datos iniciales del formulario y las tablas relacionadas.
 */
export const handleInitialData = async (
  global: IGlobalContext,
  defaultValue?: any,
  modalProp: ModalPropType = "primer",
  menu?: string,
  isPermitido?: boolean
): Promise<IForm> => {
  const { api, modal } = global;
  // Obtener el modal seleccionado en base a modalProp
  const selectedModal = modal[modalProp];
  // Obtener tipo, id y isTablas del modal seleccionado
  const { tipo, id, isTablas } = selectedModal;
  // Determinar el menú seleccionado, utilizando el parámetro menu o el valor predeterminado en api
  const selectedMenu: string = menu ?? api.menu;
  // Determinar si se deben verificar los permisos
  const selectedPermitido = isPermitido ?? selectedModal.isPermitido;

  // Si es necesario verificar los permisos
  if (selectedPermitido) {
    // Verificar si la acción está permitida
    await getIsPermitido({
      globalContext: global,
      accion: tipo,
      modalProp,
      menu: selectedMenu,
    });
  }

  // Obtener datos por ID si se proporciona, de lo contrario usar defaultValue
  const data = id ? await getId(global, id, selectedMenu) : defaultValue;
  // Obtener tablas relacionadas si isTablas es verdadero
  const tablas = isTablas ? await getTablas(global, selectedMenu) : {};

  // Devolver los datos iniciales del formulario y las tablas relacionadas
  return { data, tablas };
};

/**
 * Maneja la configuración y apertura de un modal secundario en la aplicación.
 * @param setGlobalContext La función para actualizar el contexto global.
 * @param data Los datos del formulario a utilizar (por defecto es null).
 * @param tablas Los datos de las tablas a utilizar (por defecto es null).
 * @param origen El origen a aplicar en el api para gestionar los loadings del modal
 */
export const handlePrimaryModal = (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  data: any = null,
  tablas: any = null,
  origen: string = "form"
): void => {
  setGlobalContext((x) => ({
    ...x,
    api: { ...x.api, origen },
    form: { ...x.form, data, tablas },
  }));
};

/**
 * Maneja la configuración y apertura de un modal secundario en la aplicación.
 * @param globalContext El contexto global de la aplicación.
 * @param setGlobalContext La función para actualizar el contexto global.
 * @param isTablas Indica si se deben obtener tablas relacionadas (por defecto es true).
 * @param dataForm Los datos del formulario a utilizar (por defecto es null).
 * @param rowProp La propiedad de la fila que se utilizará para obtener el ID (por defecto es "id").
 * @param origen El origen de modal a abrir (por defecto es "adicional").
 * @param modalProp La propiedad del modal a utilizar en el contexto (por defecto es "primer").
 */
export const handleSecondaryModal = ({
  globalContext,
  setGlobalContext,
  origen,
  modalProp = "primer",
  tipo = null,
  isTablas = true,
  dataForm = null,
  rowProp = "id",
}: IHandleSecondaryModalParams): void => {
  const { table } = globalContext; // Obtener la tabla del contexto global
  const { row, data } = table as { row: number; data: any }; // Desestructurar fila y datos de la tabla

  // Verificar si la fila seleccionada es válida
  if (!handleRow(row)) return;

  // Obtener el ID de la fila seleccionada usando rowProp
  const id = data[row][rowProp];
  // Configurar el modal con el tipo, ID y si se deben obtener tablas
  const modal: IModal = { tipo, id, origen, isTablas };

  // Actualizar el contexto global con el nuevo estado del modal y del formulario
  setGlobalContext((x) => ({
    ...x,
    api: { ...x.api, origen: "form" }, // Establecer el origen de la API en "form"
    modal: { ...x.modal, [modalProp]: modal }, // Configurar el modal en el contexto
    form: { ...x.form, data: dataForm ?? x.form }, // Actualizar los datos del formulario
  }));
};

/**
 * Maneja la configuración del contexto global para abrir un modal de ayuda.
 * Si isSubModal es true, por lo general se deplegarán campos dentro del modal actual.
 * @param setGlobalContext La función para establecer el estado del contexto global.
 * @param origenModal El identificador del modal de origen.
 * @param modalProp La propiedad del modal a utilizar en el contexto (por defecto es "segundo").
 */
export const handleHelpModal = (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  origen: string,
  modalProp: ModalPropType = "segundo",
  isSubModal: boolean = false
): void => {
  // Configura el objeto modal con valores predeterminados
  const modal: IModal = {
    tipo: isSubModal ? "registrar" : null,
    id: null,
    origen,
  };

  // Actualiza el contexto global
  setGlobalContext((x) => ({
    ...x,
    form: { ...x.form, retorno: isSubModal ? x.form.retorno : null }, // Resetea el campo 'retorno' del formulario, ya que se utilizará para retornar la data del modal de ayuda que se abrirá
    modal: { ...x.modal, [modalProp]: modal }, // Configura el modal especificado en 'modalProp' con el objeto 'modal'
  }));
};

/**
 * Limpia una propiedad específica del modal en el contexto global.
 * @param setGlobalContext La función para establecer el estado del contexto global.
 * @param modalProp La propiedad del modal a limpiar.
 * @param clearForm Indica si se debe limpiar todo el formulario (por defecto es false).
 * @param clearRetorno Indica si se debe limpiar el campo 'retorno' del formulario (por defecto es false).
 */
export const handleClearModalProp = (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  modalProp: ModalPropType,
  clearForm: boolean = false,
  clearRetorno: boolean = false
): void => {
  setGlobalContext((x) => {
    // Configura el estado del formulario basado en los parámetros clearForm y clearRetorno
    const form: IForm = clearForm
      ? defaultForm
      : { ...x.form, retorno: clearRetorno ? null : x.form.retorno };

    // Configura el estado del modal para la propiedad especificada, estableciéndolo en defaultModal
    const modal: IModales = { ...x.modal, [modalProp]: defaultModal };

    // Retorna el nuevo estado del contexto global con el formulario y el modal actualizados
    return { ...x, form, modal };
  });
};

/**
 * Esta función permite establecer un valor de retorno en el formulario del contexto global. Además, ofrece la opción de cerrar el modal actual o mantenerlo abierto, actualizando la propiedad correspondiente del modal en el contexto global.
 *
 * @param setGlobalContext La función para establecer el estado del contexto global.
 * @param retorno El valor de retorno a establecer en el formulario.
 * @param modalProp La propiedad del modal a actualizar (por defecto es "segundo").
 * @param closeModal Determina si se debe cerrar el modal actual.
 */
export const handleSetRetorno = (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  retorno: any,
  modalProp: ModalPropType = "segundo",
  closeModal: boolean = true
): void => {
  setGlobalContext((x) => {
    // Actualiza el formulario con el nuevo valor de retorno
    const form: IForm = { ...x.form, retorno };

    // Define el nuevo estado del modal según el valor de closeModal
    const modal: IModales = {
      ...x.modal,
      [modalProp]: closeModal ? defaultModal : x.modal[modalProp],
    };

    // Retorna el nuevo estado del contexto global con el formulario y el modal actualizados
    return { ...x, form, modal };
  });
};

/**
 * Establece el valor de retorno en el formulario y abre un modal hijo especificando su nivel y datos asociados.
 *
 * Esta función permite abrir un modal hijo (submodal) dentro del contexto global.
 * Además, actualiza el valor de retorno en el formulario y asigna el nivel del modal que debe abrirse.
 *
 * @param setGlobalContext La función para establecer el estado del contexto global.
 * @param retorno El valor de retorno a establecer en el formulario.
 * @param modalProp El nivel del modal que debe abrirse ("primer", "segundo" o "tercer"). Por defecto es "segundo".
 * @param subModal Los datos y configuraciones específicas del submodal que se abrirá, incluyendo su estado.
 */
export const handleSetRetornoSubModal = (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  retorno: any,
  modalProp: ModalPropType = "segundo",
  subModal: IModal
): void => {
  setGlobalContext((x) => {
    // Actualiza el formulario con el valor de retorno
    const form: IForm = { ...x.form, retorno };

    // Asigna el submodal al nivel especificado en modalProp
    const modal: IModales = { ...x.modal, [modalProp]: subModal };

    // Retorna el nuevo estado del contexto global con el formulario y el modal actualizados
    return { ...x, form, modal };
  });
};

/**
 * Maneja la navegación de vuelta a una página específica, verificando el estado del modal y el formulario en el contexto global.
 * @param global El contexto global de la aplicación.
 * @param navigate La función de navegación para redirigir a otra página.
 * @param backPage La página a la que se desea navegar de vuelta.
 */
export const handleBackPage = (
  global: IGlobalContext,
  navigate: NavigateFunction,
  backPage: string
): void => {
  const { modal, form } = global;

  // Verifica si el tipo del primer modal es nulo o si los datos del formulario son nulos
  if (!modal.primer.tipo || !form.data) {
    // Navega a la página especificada y reemplaza la entrada actual en el historial
    navigate(backPage, { replace: true });
  }
};

/**
 * Asigna el nuevo conjuntos de inputs al contexto blobal.
 * @param setGlobalContext La función para establecer el estado del contexto global.
 * @param inputs Array de inputs ref utilizados en formularios y modales.
 */
export const handleSetInputs = (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  inputs: InputFocusType
): void => {
  setGlobalContext((x) => ({
    ...x,
    extra: { ...x.extra, element: { ...x.extra.element, inputs } },
  }));
};

/**
 * Asigna los nuevos permisos, el menu y el origen del api para loading.
 * @param setGlobalContext La función para establecer el estado del contexto global.
 * @param permisos El objeto de permisos del módulo
 * @param menu - Identificador opcional del menú, para especificar el endpoint al que se realiza la solicitud.
 * @param almacen El almacen por defecto para los módulos que lo utilicen
 * @param origen El origen a aplicar en el api para gestionar los loadings del modal. Por defecto "global"
 */
export const handleSetPermisoYMenu = (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  permisos: IPermisos,
  menu: string,
  origen: string = "global"
): void => {
  setGlobalContext((x) => ({
    ...x,
    permisos,
    api: { ...x.api, origen, menu },
    extra: { ...x.extra },
  }));
};

/**
 * Abre un modal de ayuda según el origen especificado.
 * @param setGlobalContext Función para actualizar el contexto global.
 * @param origen El identificador del origen que determina qué modal de ayuda abrir.
 * @param modalProp Propiedad del modal a abrir, por defecto es "segundo".
 * @returns Una promesa que se resuelve cuando se haya abierto el modal de ayuda.
 */
export const handleOpenModal = async (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  origen: string,
  modalProp: ModalPropType = "segundo"
): Promise<void> => {
  if (origen in helpModalMap) {
    // Limpia los mensajes previos antes de abrir el modal
    await handleClearMensajes(setGlobalContext);
    // Abre el modal de ayuda correspondiente al origen
    handleHelpModal(setGlobalContext, helpModalMap[origen], modalProp);
  }
};

export const handleSetRefrescar = (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  refrescar: boolean = false
): void => {
  setGlobalContext((x) => ({ ...x, api: { ...x.api, refrescar } }));
};
/**
 * `helpModalMap` es un objeto que mapea los identificadores de los botones a sus respectivos modales de ayuda.
 * Cada clave en este objeto es el identificador de un botón en la interfaz de usuario, y el valor asociado es la clave del modal de ayuda correspondiente.
 */
export const helpModalMap: Record<string, string> = {
  buttonArticuloFind: "articuloFind",
  buttonLoteFind: "loteFind",

  buttonClienteFind: "clienteFind",
  buttonProveedorFind: "proveedorFind",
  buttonMedicoFind: "medicoFind",
  buttonPedidoFind: "pedidoFind",
  buttonPedidosFind: "pedidosFind",
  buttonOrdenCompraFind: "ordenCompraFind",
  buttonReferenciaFind: "referenciaFind",

  buttonCobroHelp: "cobroHelp",
  buttonDeliveryHelp: "deliveryHelp",
  buttonTransportistaHelp: "transportistaHelp",
  buttonVehiculoHelp: "vehiculoHelp",
};
