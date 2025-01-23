import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  mantenimientoRoutes,
  privateRoutes,
  ventasRoute,
} from "../../../../../common";
import {
  ArticuloFindModal,
  BasicKeyHandler,
  ButtonFooter,
  ClienteFindModal,
  Messages,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  IClienteCompleto,
  IClienteContacto,
  IClienteDireccion,
  IClienteFind,
  ICuadreStock,
  ICuadreStockDetalle,
  defaultCuadreStockDetalle,
  ICuadreStockTablas,
  defaultCuadreStock,
  defaultCuadreStockTablas,
} from "../../../../../models";
import {
  get,
  getId,
  handleBackPage,
  handleFocus,
  handleInputType,
  handleResetContext,
  handleSelectTipoPago,
  handleSetErrorMensaje,
  handleSetInputs,
  handleSetRetorno,
  handleTipoCambio,
  handleToast,
  handleUpdateTablas,
  roundNumber,
} from "../../../../../util";
import { CuadreStockCabecera, CuadreStockDetalle } from "./components";

const CuadreStockForm: React.FC = () => {
  //#region useState
  const navigate = useNavigate();
  const backPage: string = `/${privateRoutes.MANTENIMIENTO}/${mantenimientoRoutes.CUADRESTOCK}`;
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes, extra } = globalContext;
  const { primer, segundo } = modal;
  const { retorno } = form;
  const { simplificado } = extra;
  const mensaje = mensajes.filter((x) => x.origen === "form" && x.tipo >= 0);
  const [data, setData] = useState<ICuadreStock>(
    form.data || defaultCuadreStock
  );
  const [dataDetalles, setDataDetalles] = useState<ICuadreStockDetalle[]>([
    defaultCuadreStockDetalle,
  ]);

  const inputs = useFocus(
    "tipoDocumentoId",
    "clienteId",
    "tipoCambio",
    "guiaRemision",

    //Detalles
    "descripcion",
    "cantidad",
    "precioUnitario",
    "importe",
    //Detalles

    //Botones
    "buttonClienteFind",
    "buttonAnticipoHelp",
    "buttonArticuloFind"
    //Botones
  );
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleBackPage(globalContext, navigate, backPage);

    return () => {
      const resetContext = () => {
        handleResetContext(
          setGlobalContext,
          false,
          true,
          true,
          true,
          true,
          false
        );
      };
      resetContext();
    };
  }, []);

  useEffect(() => {
    !form.data && handleBackPage(globalContext, navigate, backPage);
  }, [form]);

  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);

  useEffect(() => {
    handleLoad();
  }, [primer.tipo]);
  //#endregion

  //#region Funciones

  const handleLoad = async (): Promise<void> => {
    if (primer.tipo === "registrar") {
      const tipoCambio: number = await handleGetTipoCambio(true, false);
      setData((x) => ({ ...x, tipoCambio }));
    }
    handleGetDetallesConId(data?.id || "");
  };

  const handleGetDetallesConId = async (id: string): Promise<void> => {
    try {
      const urlParams = id ? new URLSearchParams({ id }) : undefined;

      const detalles: ICuadreStockDetalle[] = await get({
        globalContext,
        menu: "Almacen/CuadreStock/GetDetalles",
        urlParams,
      });

      console.log(detalles, id ? "detallesCompletos" : "detalles");
      setDataDetalles(detalles);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
    }
  };

  const handleGetTipoCambio = async (
    retorno: boolean = false,
    showError: boolean = true
  ): Promise<number> => {
    const { precioVenta } = await handleTipoCambio(
      globalContext,
      setGlobalContext,
      data.fechaRegistro,
      inputs,
      false,
      "form",
      showError
    );

    if (!retorno) {
      setData((x) => ({ ...x, tipoCambio: precioVenta }));
      return 0;
    }

    if (precioVenta === 0) return 0;
    return precioVenta;
  };

  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);

    setData((x) => {
      const newData = { ...x, [name]: value };

      switch (name) {
        case "fechaRegistro":
          handleToast(
            "info",
            "Si la fecha de emisión ha sido cambiada, no olvide consultar el tipo de cambio."
          );
          break;

        default:
          break;
      }
      return newData;
    });
  };

  const handleTotales = (detalles: ICuadreStockDetalle[]): void => {
    const {} = data;

    const importeTotal = detalles.reduce((total, x) => total + x.totalSaldo, 0);

    setData((x) => ({
      ...x,
    }));
  };

  return (
    <>
      <div className="main-base">
        <div className="main-header">
          <h4 className="main-header-sub-title">{`${modal.primer.tipo} cuadre de stock`}</h4>
        </div>

        {mensaje.length > 0 && <Messages />}

        <BasicKeyHandler selector={"cuadre-stock-form"}>
          <div className="form-base">
            <CuadreStockCabecera
              data={data}
              handleData={handleData}
              handleGetTipoCambio={handleGetTipoCambio}
            />
            <CuadreStockDetalle
              dataGeneral={data}
              dataDetalles={dataDetalles}
              setDataDetalles={setDataDetalles}
              setDataGeneral={setData}
              handleDataGeneral={handleData}
            />
          </div>

          <ButtonFooter
            data={data}
            backPage={backPage}
            inputFocus="clienteId"
          />
        </BasicKeyHandler>
      </div>
    </>
  );
};

export default CuadreStockForm;
