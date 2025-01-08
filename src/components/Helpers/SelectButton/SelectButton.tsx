/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FaCheck, FaSearch } from "react-icons/fa";
import { useGlobalContext } from "../../../hooks";
import { IModal, ISelectButton } from "../../../models";
import { handleFocus, handleSetRetorno, handleSetRetornoSubModal } from "../../../util";

/**
 * Componente SelectButton se usa en la definición de las columnas de una tabla para manejar la selección de filas y la interacción con modales.
 */
const SelectButton: React.FC<ISelectButton> = ({
  modalProp = "segundo",
  retorno,
  closeModal = true,

  isSubModal = false,
  subModalProp = "tercer",
  subModal,

  inputFocus,
  className = "button-base-bg-secondary",
  Icon = subModal ? FaSearch : FaCheck,
  iconSize = "1em",
}) => {
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { inputs } = extra.element;

  //#region Funciones
  /**
   * Maneja la acción de selección al hacer clic en el botón.
   * Si `subModal` está definido, abre un submodal con los datos especificados.
   * De lo contrario, establece el retorno en el contexto global.
   * También enfoca un input específico si `inputFocus` está definido.
   */
  const handleSelect = (): void => {
    if (isSubModal && subModal) {
      const newSubModal: IModal = { tipo: "consultar", id: subModal.id };
      handleSetRetornoSubModal(setGlobalContext, subModal.menu, subModalProp, newSubModal);
    } else {
      handleSetRetorno(setGlobalContext, retorno, modalProp, closeModal);
    }
    inputFocus && inputs[inputFocus] && handleFocus(inputs[inputFocus]);
  };
  //#endregion

  return (
    <button
      title="SELECCIONAR"
      className={`button-select-base ${className ? className : "button-base-bg-gray"} `}
      onClick={handleSelect}
    >
      <Icon size={iconSize} />
    </button>
  );
};

export default SelectButton;
