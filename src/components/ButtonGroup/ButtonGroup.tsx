import { NoSymbolIcon } from "@heroicons/react/20/solid";
import { FolderPlusIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { FaPrint } from "react-icons/fa6";
import { useGlobalContext } from "../../hooks";
import { IButtonGroup, IResponseBlob } from "../../models";
import { getImprimir, getIsPermitido, handlePdf, handleRow, handleSetErrorMensaje } from "../../util";
import { Loading } from "../Loading";

/**
 * Componente ButtonGroup que retorna botones para registrar, anular e imprimir registros.
 */
const ButtonGroup: React.FC<IButtonGroup> = ({
  children,
  modalProp = "primer",
  isTablas = false,
  isPermitido = false,
  showRegistrar = true,
  showAnular = false,
  showImprimir = false,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, permisos, table } = globalContext;
  const { data, row } = table as { data: any; row: number };
  const [loading, setLoading] = useState<boolean>(false);
  //#endregion

  //#region Funciones
  /**
   * Maneja el click del botón Registrar y actualiza el contexto global para abrir el modal correspondiente.
   */
  const handleRegistrar = (): void => {
    setGlobalContext((x) => ({
      ...x,
      modal: { ...x.modal, [modalProp]: { tipo: "registrar", id: null, isTablas, isPermitido } },
    }));
  };

  /**
   * Maneja el click del botón Anular y actualiza el contexto global para abrir el modal correspondiente.
   */
  const handleAnular = (): void => {
    try {
      if (!handleRow(row)) return;

      const id = data[row].id;
      setGlobalContext((x) => ({
        ...x,
        modal: { ...x.modal, primer: { tipo: "anular", id, isTablas, isPermitido } },
        form: { ...x.form, retorno: data[row] },
      }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };

  /**
   * Maneja el click del botón Imprimir, realiza las verificaciones necesarias y genera el PDF.
   */
  const handleImprimir = async (): Promise<void> => {
    if (!handleRow(row)) return;

    try {
      if (isPermitido) {
        await getIsPermitido({ globalContext, accion: "imprimir", modalProp });
      }
      const id = data[row].id;
      setLoading(true);
      const response: IResponseBlob = await getImprimir(globalContext, `${api.menu}/Imprimir/${id}`);
      await handlePdf(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };
  //#endregion

  return (
    <div className="button-group-container">
      {showRegistrar && permisos?.registrar && (
        <button
          id="buttonNuevo"
          name="buttonNuevo"
          title="Presione [ALT + A] para abrir nuevo registro."
          accessKey="a"
          onClick={handleRegistrar}
          className="button-base button-base-bg-primary"
        >
          <FolderPlusIcon className="button-base-icon" />
          <span className="button-base-text-hidden-info">[ ALT + A ]</span>
          <span className="button-base-text-hidden">Nuevo</span>
        </button>
      )}

      {children}

      {showAnular && permisos?.anular && (
        <button
          id="buttonAnular"
          name="buttonAnular"
          title="Presione [ALT + W] para anular el registro."
          accessKey="w"
          onClick={handleAnular}
          className="button-base button-base-bg-red"
        >
          <NoSymbolIcon className="button-base-icon" />
          <span className="button-base-text-hidden-info">[ ALT + W ]</span>
          <span className="button-base-text-hidden">Anular</span>
        </button>
      )}

      {!loading && showImprimir && (
        <button
          id="buttonImprimir"
          name="buttonImprimir"
          title="Presione [ALT + Q] para imprimir el registro."
          accessKey="q"
          onClick={handleImprimir}
          className="button-base button-base-bg-secondary"
        >
          <FaPrint className="button-base-icon !w-[17px]" />
          <span className="button-base-text-hidden-info">[ ALT + Q ]</span>
          <span className="button-base-text-hidden">Imprimir</span>
        </button>
      )}

      {loading && <Loading absolute={true} />}
    </div>
  );
};
export default ButtonGroup;
