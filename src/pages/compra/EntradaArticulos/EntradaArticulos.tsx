/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EntradaArticulosFilter, useEntradaArticulosColumn } from ".";
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
  IEntradaArticulos,
  IEntradaArticulosTablas,
  defaultEntradaArticulos,
} from "../../../models";
import {
  handleInitialData,
  handlePrimaryModal,
  handleResetContext,
  handleResetMensajeError,
  handleSetPermisoYMenu,
} from "../../../util";

const EntradaArticulos: React.FC = () => {
  //#region useState
  const navigate = useNavigate();
  const menu: string = "Almacen/EntradaAlmacen";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, mensajes, table, modal, form } = globalContext;
  const { primer } = modal;
  const { visible, permisos } = usePermisos("EntradaAlmacen");
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo >= 0);
  const [ready, setReady] = useState(false);
  const columns = useEntradaArticulosColumn();
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

    handleInitialData(globalContext, defaultEntradaArticulos)
      .then((response) => {
        const {
          data,
          tablas,
        }: { data: IEntradaArticulos; tablas: IEntradaArticulosTablas } =
          response;
        const { serie } = tablas;
        data.serie = serie.length > 0 ? serie : "";
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
        <h4 className="main-header-title">Ingreso de Artículos</h4>
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
            {visible && <EntradaArticulosFilter />}
            {visible && (
              <Table
                data={table.data}
                columns={columns}
                isPermitido={true}
                isTablas={true}
                tableClassName="entrada-articulos-table"
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

export default EntradaArticulos;
