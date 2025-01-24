import { useEffect, useState } from "react";
import { CuadreStockFilter, CuadreStockModal, useCuadreStockColumn } from ".";
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
  ICuadreStock,
  ICuadreStockDetalle,
  ICuadreStockTablas,
  defaultCuadreStock,
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

const CuadreStock: React.FC = () => {
  //#region useState
  const navigate = useNavigate();
  const menu: string = "Almacen/CuadreStock";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, mensajes, table, modal, form } = globalContext;
  const { primer } = modal;
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo >= 0);
  const [ready, setReady] = useState(false);
  const { visible, permisos } = usePermisos("CuadreStock");
  const columns = useCuadreStockColumn();
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

    const urlParams = new URLSearchParams({ id: primer.id ?? "" });

    const detalles: ICuadreStockDetalle[] = await get({
      globalContext,
      menu: "Almacen/CuadreStock/GetDetalles",
      urlParams,
    });

    handleInitialData(globalContext, defaultCuadreStock)
      .then((response) => {
        const {
          data,
          tablas,
        }: { data: ICuadreStock; tablas: ICuadreStockTablas } = response;
        data.detalles = detalles;
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
        <h4 className="main-header-title">Cuadre Stock</h4>
        {ready && visible && <ButtonGroup isTablas={true} isPermitido={true} />}
      </div>

      <div className="main-body">
        {!ready && <Loading />}
        {ready && !visible && <NotFound full={false} notFound={false} />}

        {ready && visible && (
          <>
            {mensaje.length > 0 && <Messages mensajes={mensajes} />}
            {visible && <CuadreStockFilter />}
            {visible && (
              <Table
                data={table.data}
                columns={columns}
                isTablas={true}
                tableClassName="articulo-table"
              />
            )}

            {primer.tipo === "eliminar" && (
              <DeleteModal propText={"descripcion"} />
            )}
            {form.data && primer.tipo && api.menu === menu && (
              <CuadreStockModal />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CuadreStock;
