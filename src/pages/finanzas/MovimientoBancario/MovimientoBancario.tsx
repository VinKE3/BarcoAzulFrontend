/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { MovimientoBancarioFilter, useMovimientoBancarioColumn } from ".";
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
  IDocumentoCompraCuentaCorriente,
  IMovimientoBancario,
  IMovimientoBancarioTablas,
  defaultMovimientoBancario,
} from "../../../models";
import {
  get,
  handleInitialData,
  handlePrimaryModal,
  handleResetContext,
  handleResetMensajeError,
  handleSetPermisoYMenu,
} from "../../../util";
import { useNavigate } from "react-router-dom";

const MovimientoBancario: React.FC = () => {
  //#region useState
  const navigate = useNavigate();
  const menu: string = "Finanzas/MovimientoBancario";
  const menuTabla: string = "Finanzas/MovimientoBancario/FiltroTablas";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, mensajes, table, modal, form } = globalContext;
  const { primer } = modal;
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo >= 0);
  const [ready, setReady] = useState(false);
  const { visible, permisos } = usePermisos("MovimientoBancario");
  const columns = useMovimientoBancarioColumn();
  const [cuentasCorrientes, setCuentasCorrientes] = useState<
    IDocumentoCompraCuentaCorriente[]
  >([]);
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

  //#region funciones
  const handleModal = async (): Promise<void> => {
    if (primer.tipo === "eliminar" || primer.tipo === "anular") {
      return;
    }

    handleInitialData(globalContext, defaultMovimientoBancario)
      .then((response) => {
        const {
          data,
          tablas,
        }: { data: IMovimientoBancario; tablas: IMovimientoBancarioTablas } =
          response;
        handlePrimaryModal(setGlobalContext, data, tablas);
      })
      .catch((error) => {
        handleResetMensajeError(setGlobalContext, true, true, error);
      });
  };
  const tablas = async (): Promise<void> => {
    const response = await get({ globalContext, menu: menuTabla });
    setCuentasCorrientes(response?.cuentasCorrientes);
  };

  useEffect(() => {
    tablas();
  }, []);
  //#endregion

  return (
    <div className="main-base">
      <div className="main-header">
        <h4 className="main-header-title">Movimiento Bancario</h4>
        {ready && visible && <ButtonGroup isTablas={true} />}
      </div>

      <div className="main-body">
        {!ready && <Loading />}
        {ready && !visible && <NotFound full={false} notFound={false} />}

        {ready && visible && (
          <>
            {mensaje.length > 0 && <Messages mensajes={mensajes} />}
            {visible && <MovimientoBancarioFilter tablas={cuentasCorrientes} />}
            {visible && (
              <Table
                data={table.data}
                columns={columns}
                isTablas={true}
                tableClassName="movimiento-bancario-table"
              />
            )}

            {primer.tipo === "eliminar" && (
              <DeleteModal propText={"descripcion"} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovimientoBancario;
