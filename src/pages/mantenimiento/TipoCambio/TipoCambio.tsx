import React, { useEffect, useState } from "react";
import { TipoCambioFilter, TipoCambioModal, useTipoCambioColumn } from ".";
import { ButtonGroup, DeleteModal, Loading, Messages, NotFound, Table } from "../../../components";
import { useGlobalContext, usePermisos } from "../../../hooks";
import { ITipoCambio, defaultTipoCambio } from "../../../models";
import { handleInitialData, handlePrimaryModal, handleResetContext, handleResetMensajeError, handleSetPermisoYMenu } from "../../../util";

const TipoCambio: React.FC = () => {
  //#region useState
  const menu: string = "Mantenimiento/TipoCambio";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, mensajes, table, modal, form } = globalContext;
  const { primer } = modal;
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo >= 0);
  const [ready, setReady] = useState(false);
  const { visible, permisos } = usePermisos("TipoCambio");
  const columns = useTipoCambioColumn();
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

    handleInitialData(globalContext, defaultTipoCambio)
      .then((response) => {
        const { data }: { data: ITipoCambio } = response;
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
        <h4 className="main-header-title">Tipos de cambio</h4>
        {ready && visible && <ButtonGroup />}
      </div>

      <div className="main-body">
        {!ready && <Loading />}
        {ready && !visible && <NotFound full={false} notFound={false} />}

        {ready && visible && (
          <>
            {mensaje.length > 0 && <Messages mensajes={mensajes} />}
            {visible && <TipoCambioFilter />}
            {visible && <Table data={table.data} columns={columns} tableClassName="tipo-cambio-table" />}

            {primer.tipo === "eliminar" && <DeleteModal propText={"id"} />}
            {form.data && primer.tipo && api.menu === menu && <TipoCambioModal />}
          </>
        )}
      </div>
    </div>
  );
};
export default TipoCambio;
