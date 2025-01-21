/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  comprasRoutes,
  finanzasRoutes,
  privateRoutes,
} from "../../../../../common";
import {
  ArticuloFindModal,
  BasicKeyHandler,
  ButtonFooter,
  Messages,
  ProveedorFindModal,
  ConfirmModal,
  ClienteFindModal,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  IClienteCompleto,
  IClienteFind,
  IMovimientoBancario,
  IMovimientoBancarioDetalle,
  IMovimientoBancarioTablas,
  IProveedorFind,
  defaultMovimientoBancario,
  defaultMovimientoBancarioTablas,
} from "../../../../../models";
import {
  get,
  getId,
  handleBackPage,
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
import {
  MovimientoBancarioCabecera,
  MovimientoBancarioDetalle,
} from "./components";
import { ConceptoFindModal } from "../../../../../components/Helpers/Find/Concepto";

const MovimientoBancarioForm: React.FC = () => {
  const navigate = useNavigate();
  const backPage: string = `/${privateRoutes.FINANZAS}/${finanzasRoutes.MOVIMIENTOBANCARIO}`;
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes, api } = globalContext;
  const { primer, segundo } = modal;
  const { retorno } = form;
  const { cuentasCorrientes }: IMovimientoBancarioTablas =
    form.tablas || defaultMovimientoBancarioTablas;
  const mensaje = mensajes.filter((x) => x.origen === "form" && x.tipo >= 0);
  const [data, setData] = useState<IMovimientoBancario>(
    form.data || defaultMovimientoBancario
  );
  const inputs = useFocus(
    "tipoDocumentoId",
    "proveedorId",
    "proveedorNombre",
    "tipoPagoId",

    //Detalles
    "tipoAfectacionIGVId",
    "pastilla",
    "cantidad",
    "precioUnitario",
    "importe",
    //Detalles

    //Botones
    "buttonProveedorFind",
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
    data.detalles && handleTotales(data.detalles);
    console.log(data.detalles);
  }, [data.detalles]);

  useEffect(() => {
    handleLoad();
  }, [primer.tipo]);

  useEffect(() => {
    retorno && retorno.origen === "proveedorFind" && handleProveedor(retorno);
    retorno && retorno.origen === "clienteFind" && handleCliente(retorno);
  }, [retorno]);

  //#endregion

  //#region Funciones
  const handleLoad = async (): Promise<void> => {
    if (primer.tipo === "registrar") {
      const tipoCambio: number = await handleGetTipoCambio(true, false);
      setData((x) => ({ ...x, tipoCambio }));
    }
  };
  const handleGetTipoCambio = async (
    retorno: boolean = false,
    showError: boolean = true
  ): Promise<number> => {
    const { precioVenta } = await handleTipoCambio(
      globalContext,
      setGlobalContext,
      data.fechaEmision,
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
        case "fechaEmision":
          handleToast(
            "info",
            "Si la fecha de emisión ha sido cambiada, no olvide consultar el tipo de cambio."
          );
          break;
        case "tipoBeneficiarioId":
          newData.clienteProveedorId = "";
          newData.clienteProveedorNombre = null;
          break;
        case "tipoMovimientoId":
          newData.tieneCuentaDestino = false;
          newData.cuentaDestinoId = null;
          newData.concepto = null;
          break;
        case "monto":
          newData.montoITF = roundNumber(
            newData.monto * (newData.porcentajeITF / 100)
          );
          break;
        case "porcentajeITF":
          newData.montoITF = roundNumber(
            newData.monto * (newData.porcentajeITF / 100),
            4
          );
          newData.total = roundNumber(newData.monto + newData.montoITF, 4);
          break;
        case "cuentaDestinoId":
          const cuenta = cuentasCorrientes.find(
            (x) => x.cuentaCorrienteId === value
          );
          newData.concepto = `TRANSFERENCIA: ${cuenta?.numero} | ${cuenta?.entidadBancariaNombre}`;
          break;
        default:
          break;
      }
      return newData;
    });
  };
  const handleCliente = async (cliente: IClienteFind): Promise<void> => {
    try {
      const clienteCompleto: IClienteCompleto = await getId(
        globalContext,
        cliente.id,
        "Mantenimiento/Cliente",
        true
      );

      const { id, nombre } = clienteCompleto;
      setData((x) => ({
        ...x,
        clienteProveedorId: id,
        clienteProveedorNombre: nombre,
      }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
    }
  };
  const handleProveedor = async (proveedor: IProveedorFind): Promise<void> => {
    const { id, nombre } = proveedor;
    setData((x) => ({
      ...x,
      clienteProveedorId: id,
      clienteProveedorNombre: nombre,
    }));
  };
  const handleTotales = (detalles: IMovimientoBancarioDetalle[]): void => {
    const { porcentajeITF, monto } = data;
    const importeTotal = detalles.reduce((total, x) => total + x.abono, 0);
    let importeMontoITF = importeTotal * (porcentajeITF / 100);
    setData((x) => ({
      ...x,
      montoITF: roundNumber(importeMontoITF),
    }));
  };

  return (
    <>
      <div className="main-base">
        <div className="main-header">
          <h4 className="main-header-sub-title">{`${modal.primer.tipo} Documento de Venta`}</h4>
        </div>

        {mensaje.length > 0 && <Messages />}

        <BasicKeyHandler selector={"documento-venta-form"}>
          <div className="form-base">
            <MovimientoBancarioCabecera
              data={data}
              handleData={handleData}
              handleGetTipoCambio={handleGetTipoCambio}
              setData={setData}
            />
            <MovimientoBancarioDetalle
              dataGeneral={data}
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

      {segundo.origen === "clienteFind" && (
        <ClienteFindModal inputFocus="concepto" />
      )}
      {segundo.origen === "proveedorFind" && (
        <ProveedorFindModal inputFocus="concepto" />
      )}
      {segundo.origen === "conceptoFind" && (
        <ConceptoFindModal
          modo={`${data.tipoMovimientoId}`}
          inputFocus="clienteId"
        />
      )}
    </>
  );
};

export default MovimientoBancarioForm;
