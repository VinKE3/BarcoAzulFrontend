/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { ClienteFilter, ClienteModal, useClienteColumn } from ".";
import { ButtonGroup, DeleteModal, Loading, Messages, NotFound, Table } from "../../../components";
import { useGlobalContext, usePermisos } from "../../../hooks";
import { ICliente, IClienteTablas, defaultCliente } from "../../../models";
import { handleInitialData, handlePrimaryModal, handleResetContext, handleResetMensajeError, handleSetPermisoYMenu } from "../../../util";

const Cliente: React.FC = () => {
  //#region useState
  const menu: string = "Mantenimiento/Cliente";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, mensajes, table, modal, form } = globalContext;
  const { primer } = modal;
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo >= 0);
  const [ready, setReady] = useState(false);
  const { visible, permisos } = usePermisos("Cliente");
  const columns = useClienteColumn();
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

    handleInitialData(globalContext, defaultCliente)
      .then((response) => {
        const { data, tablas }: { data: ICliente; tablas: IClienteTablas } = response;
        handlePrimaryModal(setGlobalContext, data, tablas);
      })
      .catch((error) => {
        handleResetMensajeError(setGlobalContext, true, true, error);
      });
  };
  //#endregion

  return (
    <div className="main-base">
      <div className="main-header">
        <h4 className="main-header-title">Clientes</h4>
        {ready && visible && <ButtonGroup isTablas={true} />}
      </div>

      <div className="main-body">
        {!ready && <Loading />}
        {ready && !visible && <NotFound full={false} notFound={false} />}

        {ready && visible && (
          <>
            {mensaje.length > 0 && <Messages mensajes={mensajes} />}
            {visible && <ClienteFilter />}
            {visible && <Table data={table.data} columns={columns} isTablas={true} tableClassName="cliente-table" />}

            {primer.tipo === "eliminar" && <DeleteModal propText={"nombre"} />}
            {form.data && primer.tipo && api.menu === menu && <ClienteModal />}
          </>
        )}
      </div>
    </div>
  );
};
export default Cliente;
