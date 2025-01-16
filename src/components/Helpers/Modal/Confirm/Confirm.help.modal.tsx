import { FaCheck } from "react-icons/fa";
import { useGlobalContext } from "../../../../hooks";
import { IConfirmHelpModal } from "../../../../models";
import { handleSetRetorno } from "../../../../util";
import { EmptyDialog } from "../../../EmptyDialog";

//Este componente proporciona una interfaz de usuario para confirmar y ejecutar acciones críticas como eliminar o anular un registro, asegurándose de que el usuario tenga los permisos adecuados antes de proceder.
const ConfirmModal: React.FC<IConfirmHelpModal> = ({
  modalProp = "segundo",
  origen,
  title,
  onClose,
  replaceClose,
  onConfirm,
}) => {
  //#region useState
  const { setGlobalContext } = useGlobalContext();
  //#endregion

  //#region useEffect
  //#endregion

  //#region Funciones
  // Maneja el click en el botón de acción
  // Maneja la confirmación
  const handleConfirm = async (): Promise<void> => {
    const retorno = { origen, confirmar: true };
    handleSetRetorno(setGlobalContext, retorno, modalProp, true);
  };

  // Maneja el cierre del modal
  const handleClose = async (): Promise<void> => {
    if (replaceClose) {
      onClose && (await onClose());
      return;
    }

    setGlobalContext((prev) => ({
      ...prev,
      modal: { ...prev.modal, [modalProp]: { isOpen: false } },
    }));
  };
  //#endregion

  return (
    <EmptyDialog title="aviso" text={title} onClose={() => handleClose()}>
      <div className="footer-button-container">
        <button
          id="buttonConfirmModal"
          name="buttonConfirmModal"
          onClick={handleConfirm}
          className="!py-2 button-base-bg-border-gray"
        >
          <FaCheck size={"1.5em"} className="button-base-icon" />
          <span className="uppercase button-base-text">Confirmar</span>
        </button>

        <button
          id="buttonConfirmModalClose"
          name="buttonConfirmModalClose"
          onClick={() => handleClose()}
          className="!py-2 button-base-bg-border-transparent"
        >
          <span className="uppercase button-base-text">cancelar</span>
        </button>
      </div>
    </EmptyDialog>
  );
};

export default ConfirmModal;
