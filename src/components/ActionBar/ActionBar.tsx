import { TrashIcon } from "@heroicons/react/24/outline";
import { BiSolidEdit } from "react-icons/bi";
import { TbEyeSearch } from "react-icons/tb";
import { useGlobalContext } from "../../hooks";
import { IActionBar, IModal, ModalCrudType, adminPermisos, defaultMensajes } from "../../models";

/**
 * Componente ActionBar que retorna botones para consultar, modificar y eliminar registros dentro de una tabla
 * */
const ActionBar: React.FC<IActionBar> = ({
  modalProp = "primer",
  tipoModalProp = "tipo",
  rowData,
  id,

  isAdminPermisos = false,
  isTablas,
  isPermitido,

  returnRetorno,
  showConsultar = true,
  showModificar = true,
  showEliminar = true,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { permisos } = globalContext;

  // Selecciona los permisos adecuados (administrativos o regulares)
  const selectedPermisos = isAdminPermisos ? adminPermisos : permisos;
  const { consultar, modificar, eliminar } = selectedPermisos;
  //#endregion

  //#region Funciones
  const handleAction = (tipo: ModalCrudType): void => {
    if (returnRetorno) {
      // Si returnRetorno está definido, asigna a form.retorno los datos de la fila, sumado al tipo de acción, isTablas e isPermitido
      const retorno = { ...rowData, [tipoModalProp]: tipo, isTablas, isPermitido };

      setGlobalContext((x) => ({
        ...x,
        form: { ...x.form, retorno },
        mensajes: [defaultMensajes],
      }));
      return;
    }

    // Si returnRetorno no está definido, asigna a modal el tipo de acción, id, isTablas e isPermitido sumado a form.retorno los datos de la fila
    const modal: IModal = { tipo, id, isTablas, isPermitido };
    setGlobalContext((x) => ({
      ...x,
      modal: { ...x.modal, [modalProp]: modal },
      form: { ...x.form, retorno: { ...rowData } },
      mensajes: [defaultMensajes],
    }));
  };
  //#endregion

  return (
    <div className="action-bar-container">
      {consultar && showConsultar && (
        <button
          id="buttonConsultar"
          name="buttonConsultar"
          title="Consultar registro"
          onClick={() => handleAction("consultar")}
          className="action-bar-button-consultar"
        >
          <TbEyeSearch size={"2.5rem"} className="action-bar-icon" />
        </button>
      )}
      {modificar && showModificar && (
        <button
          id="buttonModificar"
          name="buttonModificar"
          title="Modificar registro"
          onClick={() => handleAction("modificar")}
          className="action-bar-button-modificar"
        >
          <BiSolidEdit size={"2.5rem"} className="action-bar-icon" />
        </button>
      )}
      {eliminar && showEliminar && (
        <button
          id="buttonEliminar"
          name="buttonEliminar"
          title="Eliminar registro"
          onClick={() => handleAction("eliminar")}
          className="action-bar-button-eliminar"
        >
          <TrashIcon strokeWidth={2} className="action-bar-icon" />
        </button>
      )}
    </div>
  );
};

export default ActionBar;
