import { XMarkIcon } from "@heroicons/react/20/solid";
import { ButtonFooter, Messages, Table } from "../..";
import { useGlobalContext } from "../../../hooks";
import { IModalHelp } from "../../../models";
import { handleClearModalProp, handleFocus } from "../../../util";

/**
 * Este componente es útil para mostrar modales secundarios que pueden abrirse sobre otros modales, especialmente para listados de ayuda, permitiendo seleccionar un elemento de la tabla y retornarlo al formulario o modal anterior. Además, gestiona el foco y el cierre de manera específica según el nivel del modal.
 */
const ModalHelp: React.FC<IModalHelp> = ({
  children,
  modalProp = "segundo", // Nivel del modal por defecto es "segundo"

  data,
  columns,
  showTable = true, // Muestra la tabla por defecto
  selectable = true,
  alwaysSelected = true,
  clearRetorno = false,
  handleKeyDown,

  title,
  inputFocus,
  classNameModal,
  classNameTable,
  showFooter = true,
  buttonFooter,
}) => {
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { mensajes, extra } = globalContext;
  const { inputs } = extra.element;
  const mensaje = mensajes.filter((x) => x.origen === "help" && x.tipo >= 0);

  //#region Funciones
  const handleClose = (): void => {
    //Limpia únicamente el modal establecido en modalProp (primer | segundo | tercer)
    handleClearModalProp(setGlobalContext, modalProp, false, clearRetorno);
    // Si inputFocus está definido y el input existe, enfoca el input
    inputFocus && inputs[inputFocus] && handleFocus(inputs[inputFocus]);
  };

  const handleCloseKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Escape") {
      e.stopPropagation();
      handleClose();
    }
  };
  //#endregion

  return (
    <div className="modal-base">
      <div className={`modal-base-dialog ${classNameModal}`}>
        <div className="modal-base-content-header">
          <h5 className="modal-base-content-header-title">{title}</h5>
          <XMarkIcon onClick={handleClose} className="modal-base-content-header-icon" />
        </div>

        {/* Renderiza mensajes si el origen es "help" y hay mensajes visibles */}
        {mensaje.length > 0 && <Messages />}

        <div onKeyDown={(e) => handleCloseKeyDown(e)} className="gap-1 modal-base-content">
          {children && children}

          {showTable && (
            <Table
              data={data}
              columns={columns}
              doubleClick={false}
              pagination={false}
              selectable={selectable}
              alwaysSelected={alwaysSelected}
              onKeyDown={handleKeyDown}
              tableClassName={classNameTable as string}
            />
          )}
          {showFooter && (
            <ButtonFooter modalProp={modalProp} data={null} clearForm={false} showSend={false}>
              {buttonFooter && buttonFooter}
            </ButtonFooter>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalHelp;
