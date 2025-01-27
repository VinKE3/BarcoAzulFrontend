/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BloquearMovimientoBancarioFilter,
  useBloquearMovimientoBancarioColumn,
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
import {
  defaultBloquearMovimientoBancario,
  IBloquearMovimientoBancario,
  IBloquearMovimientoBancarioTablas,
  IBloquearMovimientoBancarioTable,
  ICombo,
  IMensajes,
} from "../../../models";
import {
  get,
  getListar,
  handleInitialData,
  handlePrimaryModal,
  handleResetContext,
  handleResetMensajeError,
  handleSetErrorMensaje,
  handleSetMensajes,
  handleSetPermisoYMenu,
  handleToast,
  put,
} from "../../../util";

const BloquearMovimientoBancario: React.FC = () => {
  //#region useState
  const navigate = useNavigate();
  const menu: string = "Finanzas/BloquearMovimientoBancario";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, mensajes, table, modal, form } = globalContext;
  const { retorno } = form;
  const { primer } = modal;
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo >= 0);
  const [ready, setReady] = useState(false);
  const { visible, permisos } = usePermisos("BloquearMovimientoBancario");

  const [tiposDocumento, setTiposDocumento] = useState<ICombo[]>([]);
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

  useEffect(() => {
    retorno && bloquearMovimientoBancario();
  }, [retorno]);

  //#endregion

  //#region funciones
  const handleModal = async (): Promise<void> => {
    if (primer.tipo === "eliminar" || primer.tipo === "anular") {
      return;
    }

    handleInitialData(globalContext, defaultBloquearMovimientoBancario)
      .then((response) => {
        const {
          data,
          tablas,
        }: {
          data: IBloquearMovimientoBancario;
          tablas: IBloquearMovimientoBancarioTablas;
        } = response;
        handlePrimaryModal(setGlobalContext, data, tablas);
      })
      .catch((error) => {
        handleResetMensajeError(setGlobalContext, true, true, error);
      });
  };
  const bloquearMovimientoBancario = async (): Promise<void> => {
    try {
      const { row }: { origen: string; row: IBloquearMovimientoBancarioTable } =
        retorno;
      const { id, isBloqueado } = row;
      const resultMessage: IMensajes[] = await put({
        globalContext,
        menu,
        data: {
          ids: [id],
          isBloqueado: !isBloqueado,
        },
      });

      handleToast("success", "Se ha actualizado el bloqueo", "top");
      handleSetMensajes(setGlobalContext, resultMessage, "form");
      console.log(resultMessage);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };
  const columns = useBloquearMovimientoBancarioColumn(
    api.loading,
    setGlobalContext
  );

  //#endregion
  return (
    <div className="main-base">
      <div className="main-header">
        <h4 className="main-header-title">Bloquear Movimientos Bancarios</h4>
        {ready && visible && (
          <ButtonGroup isTablas={true} showRegistrar={false} />
        )}
      </div>

      <div className="main-body">
        {!ready && <Loading />}
        {ready && !visible && <NotFound full={false} notFound={false} />}

        {ready && visible && (
          <>
            {mensaje.length > 0 && <Messages mensajes={mensajes} />}
            {visible && <BloquearMovimientoBancarioFilter />}
            {visible && (
              <Table
                data={table.data}
                columns={columns}
                isTablas={true}
                tableClassName="bloquear-movimiento-bancario-table"
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

export default BloquearMovimientoBancario;
