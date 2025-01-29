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
  ICuadreStockTable,
  IMensajes,
  defaultCuadreStock,
} from "../../../models";
import {
  get,
  getIsPermitido,
  handleInitialData,
  handlePrimaryModal,
  handleResetContext,
  handleResetMensajeError,
  handleRow,
  handleSecondaryModal,
  handleSetErrorMensaje,
  handleSetMensajes,
  handleSetPermisoYMenu,
  handleToast,
  put,
} from "../../../util";
import { useNavigate } from "react-router-dom";
import { FaClipboardCheck } from "react-icons/fa6";
import Swal from "sweetalert2";

const CuadreStock: React.FC = () => {
  //#region useState
  const navigate = useNavigate();
  const menu: string = "Almacen/CuadreStock";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, mensajes, table, modal, form } = globalContext;
  const { data, row } = table as { data: ICuadreStockTable[]; row: number };
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

  const handleCerrar = (): void => {
    if (!handleRow(row)) return;

    let id = data[row].id;
    const cerrado = data.find((x) => x.id === id);
    const title = cerrado?.estado
      ? "Abrir Cuadre De Stock"
      : "Cerrar Cuadre De Stock";
    const status = !cerrado?.estado;
    Swal.fire({
      title: title,
      icon: "warning",
      iconColor: "#F7BF3A",
      showCancelButton: true,
      color: "#fff",
      background: "#171B23",
      confirmButtonColor: "#3B8407",
      confirmButtonText: "Confirmar",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    }).then(async (x) => {
      if (x.isConfirmed) {
        try {
          const resultMessage: IMensajes[] = await put({
            globalContext,
            menu: `Almacen/CuadreStock/AbrirCerrar/${id}?estado=${status}`,
          });
          handleSetMensajes(setGlobalContext, resultMessage);
        } catch (error: any) {
          handleSetErrorMensaje(setGlobalContext, error[0].textos.join("\n"));
        }
      }
    });
  };

  //#endregion
  return (
    <div className="main-base">
      <div className="main-header">
        <h4 className="main-header-title">Cuadre Stock</h4>
        {ready && visible && (
          <ButtonGroup isPermitido={true} showImprimir={true} isTablas={true}>
            {(permisos.registrar || permisos.modificar) && (
              <>
                <button
                  title="Presione [ALT + Q] para abrir/cerrar cuadre de stock."
                  accessKey="q"
                  onClick={handleCerrar}
                  className="button-base button-base-bg-red"
                >
                  <FaClipboardCheck
                    size={"2rem"}
                    className="button-base-icon"
                  />
                  <span className="button-base-text-hidden-info">
                    [ ALT + Q ]
                  </span>
                  <span className="button-base-text-hidden">
                    Cerrar/Abrir Cuadre
                  </span>
                </button>
              </>
            )}
          </ButtonGroup>
        )}
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
                isPermitido={true}
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
