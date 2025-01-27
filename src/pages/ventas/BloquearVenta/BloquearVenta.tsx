/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BloquearVentaFilter, useBloquearVentaColumn } from ".";
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
  defaultBloquearVenta,
  IBloquearVenta,
  IBloquearVentas,
  IBloquearVentaTablas,
  IBloquearVentaTable,
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

const BloquearVenta: React.FC = () => {
  //#region useState
  const navigate = useNavigate();
  const menu: string = "Venta/BloquearVenta";
  const menuTabla: string = "Venta/BloquearVenta/FormularioTablas";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, mensajes, table, modal, form } = globalContext;
  const { retorno } = form;
  const { primer } = modal;
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo >= 0);
  const [ready, setReady] = useState(false);
  const { visible, permisos } = usePermisos("BloquearVenta");

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
    tablas();
  }, []);

  useEffect(() => {
    retorno && bloquearVenta();
  }, [retorno]);

  //#endregion

  //#region funciones
  const handleModal = async (): Promise<void> => {
    if (primer.tipo === "eliminar" || primer.tipo === "anular") {
      return;
    }

    handleInitialData(globalContext, defaultBloquearVenta)
      .then((response) => {
        const {
          data,
          tablas,
        }: { data: IBloquearVenta; tablas: IBloquearVentaTablas } = response;
        handlePrimaryModal(setGlobalContext, data, tablas);
      })
      .catch((error) => {
        handleResetMensajeError(setGlobalContext, true, true, error);
      });
  };
  const tablas = async (): Promise<void> => {
    const response = await get({ globalContext, menu: menuTabla });
    setTiposDocumento(response?.tiposDocumento);
  };

  const bloquearVenta = async (): Promise<void> => {
    try {
      const { row }: { origen: string; row: IBloquearVentaTable } = retorno;
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

  const handleListar = async (): Promise<void> => {
    try {
      const { data, total }: { data: IBloquearVentaTable[]; total: number } =
        await getListar(globalContext);
      setGlobalContext((x) => ({ ...x, table: { ...x.table, data, total } }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };

  const columns = useBloquearVentaColumn(api.loading, setGlobalContext);

  //#endregion
  return (
    <div className="main-base">
      <div className="main-header">
        <h4 className="main-header-title">Bloquear Ventas</h4>
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
            {visible && <BloquearVentaFilter tablas={tiposDocumento} />}
            {visible && (
              <Table
                data={table.data}
                columns={columns}
                isTablas={true}
                tableClassName="bloquear-venta-table"
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

export default BloquearVenta;
