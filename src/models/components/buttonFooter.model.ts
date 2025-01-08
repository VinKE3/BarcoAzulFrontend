import { ModalPropType } from "../types";

export interface IButtonFooter {
  children?: React.ReactNode; // Elementos hijos que se pueden pasar al componente
  data: any; // Datos del formulario
  modalProp?: ModalPropType; // El nivel en el que se abrirá el modal (primer | segundo | tercer)
  menu?: string; // Menú seleccionado
  origenMensaje?: string; // Origen del mensaje de error o éxito
  clearForm?: boolean; // Indica si se debe limpiar el formulario al cerrar
  backPage?: string; // Página de retorno
  inputFocus?: string; // Input al que se debe enfocar al manejar errores
  allData?: boolean; // Indicador para devolver toda la respuesta o solo los datos (opcional)
  sendId?: boolean; //Indicardor para enviar el id en la url
  showSend?: boolean; // Mostrar botón de enviar
  onSend?: () => Promise<void> | void; // Función a ejecutar al enviar
  replaceSend?: boolean; // Reemplazar la función de enviar por defecto
  showClose?: boolean; // Mostrar botón de cerrar
  onClose?: () => Promise<void> | void; // Función a ejecutar al cerrar
  replaceClose?: boolean; // Reemplazar la función de cerrar por defecto
  onCatch?: (x: any) => Promise<void> | void; // Función a ejecutar al capturar error
  replaceCatch?: boolean; // Reemplazar la función de captura de error por defecto
}
