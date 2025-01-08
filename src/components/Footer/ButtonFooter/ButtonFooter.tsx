import { BiExit } from "react-icons/bi";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../hooks";
import {
  IButtonFooter,
  IMensajes,
  defaultForm,
  defaultMensajes,
  defaultModal,
} from "../../../models";
import {
  handleClearMensajes,
  handleFocus,
  handleSetErrorMensaje,
  post,
  put,
} from "../../../util";

/**
 * Componente ButtonFooter que muestra botones para Cerrar el formulario y Registrar|Modificar haciendo envíos al endpoint
 */
const ButtonFooter: React.FC<IButtonFooter> = ({
  children,
  data,
  modalProp = "primer",
  menu,
  origenMensaje,
  backPage,
  clearForm = true,
  inputFocus,
  allData = false,
  sendId = false,
  showSend = true,
  onSend,
  replaceSend = false,
  showClose = true,
  onClose,
  replaceClose = false,
  onCatch,
  replaceCatch = false,
}) => {
  //#region useState
  const navigate = useNavigate();
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, modal, extra } = globalContext;
  const { loading } = api;
  const { inputs } = extra.element;
  const selectedMenu: string = menu ? menu : api.menu;
  const selectedModal = modal[modalProp];
  const origenSuccess: string = modalProp === "primer" ? "global" : api.origen;
  const origenError: string = origenMensaje ? origenMensaje : api.origen;
  //#endregion

  //#region Funciones
  // Maneja el clic en el botón de guardar, llamando al endpoint correspondiente para registrar o modificar datos.
  const handleSend = async (): Promise<void> => {
    try {
      if (replaceSend) {
        onSend && (await onSend());
        return;
      }

      await handleClearMensajes(setGlobalContext);
      const resultMessages: IMensajes[] =
        selectedModal.tipo === "registrar"
          ? await post(globalContext, data, selectedMenu, allData)
          : await put({
              globalContext,
              id: sendId ? selectedModal.id : null,
              data,
              menu: selectedMenu,
              allData,
            });
      onSend && (await onSend()); //Ejecuta onSend en caso haya sido declarado
      handleSuccessClose(resultMessages); //Maneja los mensajes de éxito de la operación ejecutada
    } catch (error) {
      if (replaceCatch) {
        onCatch && (await onCatch(error));
        return;
      }
      handleSetErrorMensaje(setGlobalContext, error, origenError);
      inputFocus && inputs[inputFocus] && handleFocus(inputs[inputFocus]);
    }
  };

  // Maneja el cierre del modal después de una operación exitosa, actualizando el contexto global y navegando a la página de retorno si está definida.
  const handleSuccessClose = (messages: IMensajes[]): void => {
    //Asigna el origen a los mensajes obtenidos
    const mensajes: IMensajes[] = messages.map((mensaje) => {
      return { ...mensaje, origen: origenSuccess };
    });

    setGlobalContext((x) => ({
      ...x,
      api: { ...x.api, origen: origenSuccess },
      modal: { ...x.modal, [modalProp]: defaultModal },
      form: clearForm ? defaultForm : x.form,
      mensajes,
    }));
    //En caso backPage esté asignado, navega a la página
    backPage && navigate(backPage, { replace: true });
  };

  // Maneja el cierre del modal, actualizando el contexto global y llamando a funciones adicionales si están definidas.
  const handleClose = async (messages: IMensajes[]): Promise<void> => {
    if (replaceClose) {
      onClose && (await onClose());
      return;
    }

    //Asigna el origen a los mensajes obtenidos
    const mensajes: IMensajes[] = messages.map((mensaje) => {
      return { ...mensaje, origen: origenError };
    });

    setGlobalContext((x) => ({
      ...x,
      api: { ...x.api, origen: origenSuccess },
      modal: { ...x.modal, [modalProp]: defaultModal },
      form: clearForm ? defaultForm : x.form,
      mensajes,
    }));

    onClose && (await onClose());

    backPage && navigate(backPage, { replace: true });
  };

  // Función para manejar la tecla Enter en los botones, llamando a las funciones de guardar o cerrar según el botón presionado.
  const handleKey = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    action: "send" | "close"
  ): void => {
    if (e.key === "Enter") {
      action === "send" ? handleSend() : handleClose([defaultMensajes]);
    }
  };
  //#endregion

  return (
    <div className="footer-button-container">
      {children}

      {showSend && selectedModal.tipo !== "consultar" && !loading && (
        <button
          id="buttonGuardar"
          name="buttonGuardar"
          title="Presione [ALT + A] para guardar el registro."
          accessKey="a"
          onClick={handleSend}
          onKeyDown={(e) => handleKey(e, "send")}
          className="button-base-bg-border-primary"
        >
          <FiSave size="1.5rem" className="button-base-icon" />
          <span className="button-base-text-hidden-info">[ ALT + A ]</span>
          <span className="button-base-text-hidden">Guardar</span>
        </button>
      )}

      {showClose && (
        <button
          id="buttonSalir"
          name="buttonSalir"
          title="Presione [ALT + S] para salir."
          accessKey="s"
          autoFocus={selectedModal.tipo === "consultar"}
          onClick={() => handleClose([defaultMensajes])}
          onKeyDown={(e) => handleKey(e, "close")}
          className="button-base-bg-border-transparent"
        >
          <BiExit size="1.5rem" className="button-base-icon" />
          <span className="button-base-text-hidden-info">[ ALT + S ]</span>
          <span className="button-base-text-hidden">
            {selectedModal.tipo !== "consultar" ? "Cancelar" : "Cerrar"}
          </span>
        </button>
      )}
    </div>
  );
};
export default ButtonFooter;
