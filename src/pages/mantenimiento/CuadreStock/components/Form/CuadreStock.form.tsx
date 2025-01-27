import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mantenimientoRoutes, privateRoutes } from "../../../../../common";
import {
  BasicKeyHandler,
  ButtonFooter,
  Messages,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  defaultCuadreStock,
  ICuadreStock,
  ICuadreStockDetalle,
} from "../../../../../models";
import {
  handleBackPage,
  handleInputType,
  handleResetContext,
  handleSetInputs,
  handleTipoCambio,
  handleToast,
  put,
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
  const [dataDetalles, setDataDetalles] = useState<ICuadreStockDetalle[]>(
    data.detalles || []
  );
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    console.log("Updated dataDetalles:", dataDetalles);
  }, [dataDetalles]);

  useEffect(() => {
    handleTotales(dataDetalles);
  }, [dataDetalles]);

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
    // try {
    //   const urlParams = id ? new URLSearchParams({ id }) : undefined;
    //   const detalles: ICuadreStockDetalle[] = await get({
    //     globalContext,
    //     menu: "Almacen/CuadreStock/GetDetalles",
    //     urlParams,
    //   });
    //   console.log(detalles, id ? "detallesCompletos" : "detalles");
    //   setDataDetalles(detalles);
    // } catch (error) {
    //   handleSetErrorMensaje(setGlobalContext, error, "form");
    // }
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

  function handleTotal({ target }: ChangeEvent<HTMLInputElement>): void {
    const { name } = target;
    const value = handleInputType(target);

    const regex = /^totales\[(\d+)\]\.(\w+)$/; // Captura el índice y el campo
    const match = name.match(regex);

    if (match) {
      const index = parseInt(match[1], 10);
      const field = match[2];

      setDataDetalles((x) => {
        const newDetalles = [...x];
        const item = { ...newDetalles[index], [field]: Number(value) };

        // Realizar cálculos
        const cantidad = item.stockFinal - item.inventario;
        let cantidadSobra = 0;
        let cantidadFalta = 0;

        if (cantidad < 0) {
          cantidadSobra = cantidad;
        } else {
          cantidadFalta = cantidad;
        }

        const totalSobra = cantidadSobra * item.precioUnitario;
        const totalFalta = cantidadFalta * item.precioUnitario;

        // Asignar los valores calculados y redondearlos
        item.cantidadSobra = Math.abs(roundNumber(cantidadSobra, 2));
        item.cantidadFalta = Math.abs(roundNumber(cantidadFalta, 2));
        item.totalSobra = Math.abs(roundNumber(totalSobra, 2));
        item.totalFalta = Math.abs(roundNumber(totalFalta, 2));

        newDetalles[index] = item;

        return newDetalles;
      });
    }
  }

  const RecalcularStock = async (fecha: string): Promise<void> => {
    setLoading(true);
    let detalle: ICuadreStockDetalle[] = dataDetalles;
    const result = await put({
      globalContext,
      menu: "Almacen/CuadreStock/RecalcularStock",
      data: {
        fecha: fecha,
        articulos: dataDetalles.map((x) => ({
          lineaId: x.lineaId,
          subLineaId: x.subLineaId,
          articuloId: x.articuloId,
          stock: x.stockFinal,
        })),
      },
      allData: true,
    });

    if (result) {
      handleToast("success", "Se ha recalculado el stock", "top");

      // actualizamos el stock en base a los nuevos valores
      detalle = detalle.map((map: ICuadreStockDetalle) => {
        const matchingArticle = result.data.data.articulos.find(
          (x: any) =>
            map.articuloId === x.articuloId &&
            map.lineaId === x.lineaId &&
            map.subLineaId === x.subLineaId
        );

        if (matchingArticle) {
          const inventario =
            primer.tipo === "registrar"
              ? matchingArticle.stock
              : map.inventario;
          const stockFinal = matchingArticle.stock;
          const cantidad = stockFinal - inventario;
          const precioUnitario = map.precioUnitario;
          const cantidadSobra = cantidad < 0 ? cantidad : 0;
          const cantidadFalta = cantidad >= 0 ? cantidad : 0;
          const totalSobra = cantidadSobra * precioUnitario;
          const totalFalta = cantidadFalta * precioUnitario;

          return {
            ...map,
            stockFinal: roundNumber(stockFinal, 2),
            inventario: roundNumber(inventario, 2),
            cantidadSobra: Math.abs(roundNumber(cantidadSobra, 2)),
            cantidadFalta: Math.abs(roundNumber(cantidadFalta, 2)),
            totalSobra: roundNumber(totalSobra, 2),
            totalFalta: roundNumber(totalFalta, 2),
          };
        }
        return map;
      });
      setDataDetalles(detalle);
      setLoading(false);
    }
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
    //suma los importes de los detalles
    let totalFalta = detalles.reduce((total, x) => total + x.totalFalta, 0);
    let totalSobra = detalles.reduce((total, x) => total + x.totalSobra, 0);
    let saldoTotal = totalSobra - totalFalta;
    setData((x) => ({
      ...x,
      totalFalta: roundNumber(totalFalta, 2),
      totalSobra: roundNumber(totalSobra, 2),
      saldoTotal: roundNumber(saldoTotal, 2),
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
              RecalcularStock={RecalcularStock}
              loading={loading}
            />
            <CuadreStockDetalle
              dataGeneral={data}
              dataDetalles={dataDetalles}
              setDataDetalles={setDataDetalles}
              setDataGeneral={setData}
              handleDataGeneral={handleData}
              handleTotal={handleTotal}
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
