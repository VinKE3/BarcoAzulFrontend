/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CuentaPorCobrarFilter, useCuentaPorCobrarColumn } from ".";
import {
  ButtonGroup,
  DeleteModal,
  Loading,
  Messages,
  NotFound,
  Table,
} from "../../../components";
import { useGlobalContext, usePermisos } from "../../../hooks";
import {
  ICuentaPorCobrar,
  ICuentaPorCobrarTablas,
  defaultCuentaPorCobrar,
} from "../../../models";
import {
  handleInitialData,
  handlePrimaryModal,
  handleResetContext,
  handleResetMensajeError,
  handleSetPermisoYMenu,
} from "../../../util";

const CuentaPorCobrar: React.FC = () => {
  //#region useState
  const navigate = useNavigate();
  const menu: string = "Finanzas/CuentaPorCobrar";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, mensajes, table, modal, form } = globalContext;
  const { primer } = modal;
  const { visible, permisos } = usePermisos("CuentaPorCobrar");
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo >= 0);
  const [ready, setReady] = useState(false);
  const columns = useCuentaPorCobrarColumn();
  //#endregion

  //#region useEffect
  useEffect(() => {
    const resetContext = async () => {
      const validarClearMensaje =
        api.menu === menu && mensaje.length > 0 ? false : true;
      handleResetContext(
        setGlobalContext,
        true,
        true,
        true,
        true,
        true,
        validarClearMensaje
      );
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

  useEffect(() => {
    form.data && primer.tipo && api.menu === menu && navigate("form");
  }, [form.data]);
  //#endregion

  //#region Funciones
  const handleModal = async (): Promise<void> => {
    if (primer.tipo === "eliminar" || primer.tipo === "anular") {
      return;
    }

    handleInitialData(globalContext, defaultCuentaPorCobrar)
      .then((response) => {
        const {
          data,
          tablas,
        }: { data: ICuentaPorCobrar; tablas: ICuentaPorCobrarTablas } =
          response;
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
        <h4 className="main-header-title">Cuentas Por Cobrar</h4>
        {ready && visible && (
          <ButtonGroup
            isTablas={true}
            isPermitido={true}
            showAnular={true}
            showImprimir={false}
          />
        )}
      </div>

      <div className="main-body">
        {!ready && <Loading />}
        {ready && !visible && <NotFound full={false} notFound={false} />}

        {ready && visible && (
          <>
            {mensaje.length > 0 && <Messages mensajes={mensajes} />}
            {visible && <CuentaPorCobrarFilter />}
            {visible && (
              <Table
                data={table.data}
                columns={columns}
                isPermitido={true}
                isTablas={true}
                tableClassName="cuenta-por-cobrar-table"
              />
            )}
            {primer.tipo === "eliminar" && (
              <DeleteModal propText={"numeroDocumento"} />
            )}
            {primer.tipo === "anular" && (
              <DeleteModal origen="anular" propText={"numeroDocumento"} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CuentaPorCobrar;
