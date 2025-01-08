import { BsCheckLg } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { IDialog } from "../../models";
import { handleClearModalProp } from "../../util";
import { EmptyDialog } from "../EmptyDialog";

/**
 * Componente Dialog que retorna un modal de confirmación con un título, texto y botones personalizados.
 */
const Dialog: React.FC<IDialog> = ({
  setGlobalContext,
  modalProp = "segundo",
  title = "Aviso",
  text,
  showClose = true,
  onSuccess,
  onClose,
}) => {
  //#region Funciones
  const handleSuccess = (): void => {
    onSuccess && onSuccess();
    handleClose();
  };

  const handleClose = (): void => {
    onClose && onClose();
    handleClearModalProp(setGlobalContext, modalProp);
  };
  //#endregion

  return (
    <EmptyDialog title={title} text={text} onClose={handleClose}>
      <div className="footer-button-container">
        <button
          id="buttonGuardarDialog"
          name="buttonGuardarDialog"
          title="Presione [ALT + A] para aceptar."
          accessKey="a"
          autoFocus
          onClick={handleSuccess}
          className="button-base-bg-border-green"
        >
          <BsCheckLg size="1rem" className="button-base-icon" />
          <span className="button-base-text-hidden-info">[ ALT + A ]</span>
          <span className="button-base-text-hidden">Aceptar</span>
        </button>
        {showClose && (
          <button
            id="buttonCancelarDialog"
            name="buttonCancelarDialog"
            title="Presione [ALT + S] para cancelar,"
            accessKey="s"
            onClick={handleClose}
            className="button-base-bg-border-transparent"
          >
            <IoCloseSharp size="1.5rem" className="button-base-icon" />
            <span className="button-base-text-hidden-info">[ ALT + S ]</span>
            <span className="button-base-text-hidden">Cancelar</span>
          </button>
        )}
      </div>
    </EmptyDialog>
  );
};

export default Dialog;
