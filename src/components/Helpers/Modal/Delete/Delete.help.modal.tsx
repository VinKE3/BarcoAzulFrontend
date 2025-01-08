import { useEffect, useState } from "react";
import { ImBlocked } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { useGlobalContext } from "../../../../hooks";
import { IDeleteHelpModal, IMensajes, defaultForm, defaultMensajes, defaultModal } from "../../../../models";
import { delette, getIsPermitido, handleClearMensajes, put, putAnular } from "../../../../util";
import { EmptyDialog } from "../../../EmptyDialog";

/**
 * Este componente proporciona una interfaz de usuario para confirmar y ejecutar acciones críticas como eliminar o anular un registro, asegurándose de que el usuario tenga los permisos adecuados antes de proceder.
 */
const DeleteModal: React.FC<IDeleteHelpModal> = ({
  modalProp = "primer",
  menu,
  origen = "eliminar",
  propText,
  origenMensaje,
  clearForm = true,

  onSend,
  replaceSend,
  replaceClose,
  onClose,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, modal, form } = globalContext;
  const selectedModal = modal[modalProp];
  const { tipo, isPermitido } = selectedModal;
  const { retorno } = form;

  const selectedMenu: string = menu ? menu : api.menu;
  const selectedOrigen = origen === "confirmar" ? "deshacer" : origen;
  const origenApi = modalProp === "primer" ? "global" : api.origen;
  const origenSuccess: string = modalProp === "primer" ? "global" : origenMensaje ? origenMensaje : api.origen;
  const origenError: string = origenMensaje ? origenMensaje : api.origen;
  const text = `¿Seguro de ${selectedOrigen} el registro: ${retorno[propText]}?`;
  const [render, setRender] = useState(false);
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleValIsPermitido();
  }, []);

  useEffect(() => {
    handleClearMensajes(setGlobalContext);
  }, [selectedMenu]);
  //#endregion

  //#region Funciones
  // Valida si el usuario tiene permiso para realizar la acción
  const handleValIsPermitido = async (): Promise<void> => {
    try {
      if (isPermitido) {
        await getIsPermitido({ globalContext, accion: tipo, modalProp, menu: selectedMenu });
        setRender(true);
      } else {
        setRender(true);
      }
    } catch (error) {
      setRender(false);
      handleClose(error as IMensajes[], api.origen);
    }
  };

  // Maneja el click en el botón de acción
  const handleClick = async (): Promise<void> => {
    try {
      // Si se ha pasado la propiedad replaceSend, se ejecuta la función onSend y se sale de la función
      if (replaceSend) {
        onSend && (await onSend());
        return;
      }

      // Dependiendo del valor de origen, se ejecuta una acción específica (eliminar, anular o put)
      let result;
      if (origen === "eliminar") {
        result = await delette(globalContext, modalProp, selectedMenu);
      } else if (origen === "anular") {
        result = await putAnular({ globalContext, modalProp, menu: selectedMenu, isPermitido: isPermitido ?? false });
      } else {
        result = await put({ globalContext, id: selectedModal.id, menu: selectedMenu });
      }

      // Una vez que la acción específica se ha completado con éxito, se cierra el modal y se maneja el éxito de la operación
      handleClose(result, origenSuccess);

      // Si se ha pasado la propiedad onSend, se ejecuta después de manejar el éxito
      onSend && (await onSend());
    } catch (error) {
      // En caso de error, se cierra el modal y se maneja el error
      handleClose(error as IMensajes[], origenError);
    }
  };

  // Maneja el cierre del modal
  const handleClose = async (messages: IMensajes[], origen: string = "global"): Promise<void> => {
    if (replaceClose) {
      onClose && (await onClose());
      return;
    }

    const mensajes: IMensajes[] = messages.map((mensaje) => {
      return { ...mensaje, origen: origen };
    });

    setGlobalContext((x) => ({
      ...x,
      api: { ...x.api, origen: origenApi },
      modal: { ...x.modal, [modalProp]: defaultModal },
      form: clearForm ? defaultForm : x.form,
      mensajes,
    }));

    onClose && (await onClose());
  };
  //#endregion

  if (!render) {
    // No renderizar el componente si no se puede permitir
    return null;
  }

  return (
    <EmptyDialog title="aviso" text={text} onClose={() => handleClose([defaultMensajes])}>
      <div className="footer-button-container">
        <button
          id="buttonDeleteModal"
          name="buttonDeleteModal"
          onClick={handleClick}
          className="!py-2 button-base-bg-border-gray"
        >
          {selectedOrigen === "eliminar" && <MdDelete size="1.5rem" className="button-base-icon" />}
          {selectedOrigen === "anular" && <ImBlocked size="1.2rem" className="button-base-icon" />}
          <span className="uppercase button-base-text">{selectedOrigen}</span>
        </button>

        <button
          id="buttonDeleteModalClose"
          name="buttonDeleteModalClose"
          onClick={() => handleClose([defaultMensajes])}
          className="!py-2 button-base-bg-border-transparent"
        >
          <span className="uppercase button-base-text">cancelar</span>
        </button>
      </div>
    </EmptyDialog>
  );
};

export default DeleteModal;
