/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { VendedorFilter, VendedorModal, useVendedorColumn } from ".";
import {
  ButtonGroup,
  DeleteModal,
  Loading,
  Messages,
  NotFound,
  Table,
} from "../../../components";
import { useGlobalContext, usePermisos } from "../../../hooks";
import { IVendedor, defaultVendedor } from "../../../models";
import {
  handleInitialData,
  handlePrimaryModal,
  handleResetContext,
  handleResetMensajeError,
} from "../../../util";

const Vendedor: React.FC = () => {
  //#region useState
  const menu: string = "Mantenimiento/Personal";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, mensajes, table, modal, form } = globalContext;
  const { primer } = modal;
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo >= 0);
  const [ready, setReady] = useState(false);
  const { visible, permisos } = usePermisos("Personal");
  const columns = useVendedorColumn();
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
      setGlobalContext((x) => ({
        ...x,
        permisos: permisos,
        api: { ...x.api, origen: "global", menu: menu },
      }));
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

    handleInitialData(globalContext, defaultVendedor)
      .then((response) => {
        const { data }: { data: IVendedor } = response;
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
        <h4 className="main-header-title">Vendedores</h4>
        {ready && visible && <ButtonGroup />}
      </div>

      <div className="main-body">
        {!ready && <Loading />}
        {ready && !visible && <NotFound full={false} notFound={false} />}

        {ready && visible && (
          <>
            {mensaje.length > 0 && <Messages mensajes={mensajes} />}
            {visible && <VendedorFilter />}
            {visible && (
              <Table
                data={table.data}
                columns={columns}
                tableClassName="vendedor-table"
              />
            )}

            {primer.tipo === "eliminar" && <DeleteModal propText={"nombre"} />}
            {form.data && primer.tipo && api.menu === menu && <VendedorModal />}
          </>
        )}
      </div>
    </div>
  );
};
export default Vendedor;
