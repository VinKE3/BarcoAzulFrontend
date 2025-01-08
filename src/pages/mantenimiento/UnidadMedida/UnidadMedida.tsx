import { useEffect, useState } from "react";
import {
  UnidadMedidaFilter,
  UnidadMedidaModal,
  useUnidadMedidaColumn,
} from ".";
import {
  ButtonGroup,
  DeleteModal,
  Loading,
  Messages,
  NotFound,
  Table,
} from "../../../components";
import { useGlobalContext, usePermisos } from "../../../hooks";
import { IUnidadMedida, defaultUnidadMedida } from "../../../models";
import {
  handleInitialData,
  handlePrimaryModal,
  handleResetContext,
  handleResetMensajeError,
  handleSetPermisoYMenu,
} from "../../../util";

const UnidadMedida: React.FC = () => {
  //#region useState
  const menu: string = "Mantenimiento/UnidadMedida";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, mensajes, table, modal, form } = globalContext;
  const { primer } = modal;
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo >= 0);
  const [ready, setReady] = useState(false);
  const { visible, permisos } = usePermisos("UnidadMedida");
  const columns = useUnidadMedidaColumn();
  //#endregion

  //#region useEffect
  useEffect(() => {
    const resetContext = async () => {
      handleResetContext(setGlobalContext);
    };
    resetContext();
  }, []);

  useEffect(() => {
    if (permisos.menuId !== "") {
      handleSetPermisoYMenu(setGlobalContext, permisos, menu);
      setReady(true);
    }
  }, [permisos]);

  useEffect(() => {
    primer.tipo && !form.data && handleModal();
  }, [primer.tipo]);
  //#endregion

  //#region funciones
  const handleModal = async (): Promise<void> => {
    if (primer.tipo === "eliminar" || primer.tipo === "anular") {
      return;
    }

    handleInitialData(globalContext, defaultUnidadMedida)
      .then((response) => {
        const { data }: { data: IUnidadMedida } = response;
        handlePrimaryModal(setGlobalContext, data);
      })
      .catch((error) => {
        handleResetMensajeError(setGlobalContext, true, true, error);
      });
  };
  //#endregion

  return (
    <div className="main-base">
      <div className="main-header">
        <h4 className="main-header-title">Líneas</h4>
        {ready && visible && <ButtonGroup />}
      </div>

      <div className="main-body">
        {!ready && <Loading />}
        {ready && !visible && <NotFound full={false} notFound={false} />}

        {ready && visible && (
          <>
            {mensaje.length > 0 && <Messages mensajes={mensajes} />}
            {visible && <UnidadMedidaFilter />}
            {visible && (
              <Table
                data={table.data}
                columns={columns}
                tableClassName="unidadMedida-table"
              />
            )}

            {primer.tipo === "eliminar" && (
              <DeleteModal propText={"descripcion"} />
            )}
            {form.data && primer.tipo && api.menu === menu && (
              <UnidadMedidaModal />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UnidadMedida;
