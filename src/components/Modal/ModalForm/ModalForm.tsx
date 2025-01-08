import { XMarkIcon } from "@heroicons/react/20/solid";
import { Messages } from "../..";
import { useGlobalContext } from "../../../hooks";
import { IModalForm } from "../../../models";
import { handleResetContext } from "../../../util";

/**
 * Este componente es útil para mostrar modales con funcionalidad flexible de cierre y manejo de mensajes, encapsulando la lógica de forma ordenada y reutilizable.
 */
const ModalForm: React.FC<IModalForm> = ({
  title,
  subTitle,
  className,
  children,
  showClose = true,
  onClose,
  replaceClose = false,
  enableKey = true,
  origenMensajes = "form",
}) => {
  //#region useEffect
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { mensajes } = globalContext;
  const mensaje = mensajes.filter((x) => x.origen === origenMensajes && x.tipo >= 0);
  //#endregion

  //#region Funciones
  // Maneja el cierre del modal
  const handleClose = async (): Promise<void> => {
    if (replaceClose) {
      // Si replaceClose es true, ejecuta la función onClose pasada como prop
      onClose && (await onClose());
    } else {
      // Si replaceClose es false, restablece el modal, form y mensajes del contexto
      handleResetContext(setGlobalContext, false, false, true, true, false, true);
      //Ejecuta onClose en caso haya sido definido
      onClose && (await onClose());
    }
  };

  // Maneja el evento de presionar una tecla
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (enableKey && e.key === "Escape") {
      e.stopPropagation();
      handleClose();
    }
  };
  //#endregion

  return (
    <div className="modal-base">
      <div onKeyDown={(e) => handleKeyDown(e)} className={`modal-base-dialog ${className}`}>
        <div className="modal-base-content-header">
          <h5 className="modal-base-content-header-title">{title}</h5>
          {showClose && <XMarkIcon onClick={handleClose} className="modal-base-content-header-icon" />}
        </div>
        {subTitle && <h4 className="modal-base-content-header-sub-title">{subTitle}</h4>}
        {mensaje.length > 0 && <Messages />}

        {children}
      </div>
    </div>
  );
};
export default ModalForm;
