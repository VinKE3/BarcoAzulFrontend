/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import {
  MovimientoArticuloFilter,
  MovimientoArticuloModal,
  useMovimientoArticuloColumn,
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
import { IMovimientoArticuloKardex } from "../../../models";
import {
  get,
  handlePrimaryModal,
  handleResetContext,
  handleSetPermisoYMenu,
} from "../../../util";
const MovimientoArticulo: React.FC = () => {
  //#region useState
  const menu: string = "Almacen/MovimientoArticulo";
  const menuListar: string = "Almacen/MovimientoArticulo/GetKardexArticulo";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { mensajes, table, modal, form } = globalContext;
  const { primer } = modal;
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo >= 0);
  const [ready, setReady] = useState(false);
  const { visible, permisos } = usePermisos("MovimientoArticulo");
  const columns = useMovimientoArticuloColumn();
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
    const urlParams = new URLSearchParams({
      id: String(primer.id),
    });
    const response: IMovimientoArticuloKardex = await get({
      globalContext,
      menu: menuListar,
      urlParams,
    });

    handlePrimaryModal(setGlobalContext, response);
  };

  //#endregion
  return (
    <div className="main-base">
      <div className="main-header">
        <h4 className="main-header-title">Movimiento Artículos</h4>
        {ready && visible && <ButtonGroup isTablas={true} />}
      </div>

      <div className="main-body">
        {!ready && <Loading />}
        {ready && !visible && <NotFound full={false} notFound={false} />}

        {ready && visible && (
          <>
            {mensaje.length > 0 && <Messages mensajes={mensajes} />}
            {visible && <MovimientoArticuloFilter />}
            {visible && (
              <Table
                data={table.data ? table.data : []}
                columns={columns}
                isTablas={true}
                tableClassName="movimiento-articulo-table"
              />
            )}

            {primer.tipo === "eliminar" && (
              <DeleteModal propText={"descripcion"} />
            )}
            {form.data && primer.tipo && <MovimientoArticuloModal />}
          </>
        )}
      </div>
    </div>
  );
};

export default MovimientoArticulo;
