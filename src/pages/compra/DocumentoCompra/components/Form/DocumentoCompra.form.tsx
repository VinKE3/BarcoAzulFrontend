/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { comprasRoutes, privateRoutes } from "../../../../../common";
import {
  ArticuloFindModal,
  BasicKeyHandler,
  ButtonFooter,
  Messages,
  ProveedorFindModal,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  IDocumentoCompra,
  IDocumentoCompraDetalle,
  IDocumentoCompraVarios,
  defaultDocumentoCompraVarios,
  IProveedorFind,
  defaultDocumentoCompra,
  IDocumentoCompraPendiente,
} from "../../../../../models";
import {
  handleBackPage,
  handleInputType,
  handleResetContext,
  handleSetInputs,
  handleSetRetorno,
  roundNumber,
  handleTipoCambio,
  get,
  getId,
} from "../../../../../util";
import { DocumentoCompraCabecera, DocumentoCompraDetalle } from "./components";

const DocumentoCompraForm: React.FC = () => {
  //#region useState
  const documentosPendientesListar: string =
    "Compra/DocumentoCompra/ListarPendientes";
  const navigate = useNavigate();
  const backPage: string = `/${privateRoutes.COMPRAS}/${comprasRoutes.TODASLASCOMPRAS}`;
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes } = globalContext;
  const { primer, segundo } = modal;
  const { retorno } = form;
  const mensaje = mensajes.filter((x) => x.origen === "form" && x.tipo >= 0);
  const [data, setData] = useState<IDocumentoCompra>(
    form.data || defaultDocumentoCompra
  );
  const [adicional, setAdicional] = useState<IDocumentoCompraVarios>(
    defaultDocumentoCompraVarios
  );
  const [documentosCompraPendientes, setDocumentosCompraPendientes] = useState<
    IDocumentoCompraPendiente[]
  >([]);
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
  }, [data.detalles]);

  useEffect(() => {
    data.detalles && handleTotales(data.detalles);
  }, [data.incluyeIGV, data.porcentajeIGV]);

  useEffect(() => {
    primer.tipo === "registrar" && handleLoad();
  }, [primer.tipo]);

  useEffect(() => {
    retorno && retorno.origen === "proveedorFind" && handleProveedor(retorno);
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
    setData((x) => ({ ...x, [name]: value }));
  };

  const handleProveedor = (proveedor: IProveedorFind): void => {
    const { id, numeroDocumentoIdentidad, nombre, direccion } = proveedor;
    setData((x) => ({
      ...x,
      proveedorId: id,
      proveedorNumeroDocumentoIdentidad: numeroDocumentoIdentidad,
      proveedorNombre: nombre,
      proveedorDireccion: direccion,
    }));
  };

  const handleTotales = (detalles: IDocumentoCompraDetalle[]): void => {
    const { porcentajeIGV, incluyeIGV } = data;
    console.log(porcentajeIGV, "porcentajeIGV");
    console.log(incluyeIGV, "incluyeIGV");

    const importeTotal = detalles.reduce((total, x) => total + x.importe, 0);

    let subTotal = incluyeIGV
      ? importeTotal / (1 + porcentajeIGV / 100)
      : importeTotal;
    let montoIGV = incluyeIGV
      ? importeTotal - subTotal
      : importeTotal * (porcentajeIGV / 100);
    let totalNeto = incluyeIGV ? importeTotal : subTotal + montoIGV;
    const total = subTotal + montoIGV;
    setData((x) => ({
      ...x,
      montoIGV: roundNumber(montoIGV),
      subTotal: roundNumber(subTotal),
      totalNeto: roundNumber(totalNeto),
      total: roundNumber(total),
      abonado: roundNumber(total),
    }));
  };

  const handleAdicional = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, type, value: rawValue } = target;
    const value =
      type === "checkbox" ? (target as HTMLInputElement).checked : rawValue;
    setAdicional((x) => ({ ...x, [name]: value }));

    const retorno = { origen: name, [name]: value };
    handleSetRetorno(setGlobalContext, retorno);
  };

  const handleNumero = (): void => {
    let num = data.numero;
    if (num.length < 10) {
      num = ("0000000000" + num).slice(-10);
    }
    setData((x) => ({
      ...x,
      numero: num,
    }));
    return;
  };
  const handleSerie = (): void => {
    let serie = data.serie;
    if (serie.length < 4) {
      serie = ("0000" + serie).slice(-4);
    }
    setData((x) => ({
      ...x,
      serie: serie,
    }));
    return;
  };

  const getPendientes = async (): Promise<void> => {
    const urlParams = new URLSearchParams({
      proveedorId: String(data.proveedorId),
    });
    const response = await get({
      globalContext,
      menu: documentosPendientesListar,
      urlParams,
    });
    setDocumentosCompraPendientes(response.data);
  };

  const handlePendiente = async (): Promise<void> => {
    await getPendientes();
    const pendienteId = data.documentoReferenciaId;
    const pendienteCompleto = await getId(
      globalContext,
      String(pendienteId),
      "Compra/DocumentoCompra"
    );
    const { detalles } = pendienteCompleto;
    const newDetalle = detalles.map((x: any) => ({
      ...x,
    }));
    setData((x) => ({
      ...x,
      documentoReferenciaId: pendienteId,
      detalles: newDetalle,
    }));
  };

  useEffect(() => {
    if (data.proveedorId && data.proveedorId.trim().length > 0) {
      getPendientes();
    }
  }, [data.proveedorId]);

  useEffect(() => {
    if (
      data.documentoReferenciaId &&
      data.documentoReferenciaId.trim().length > 0
    ) {
      handlePendiente();
    }
  }, [data.documentoReferenciaId]);
  //#endregion
  return (
    <>
      <div className="main-base">
        <div className="main-header">
          <h4 className="main-header-sub-title">{`${modal.primer.tipo} orden compra`}</h4>
        </div>

        {mensaje.length > 0 && <Messages />}

        <BasicKeyHandler selector={"documento-compra-form"}>
          <div className="form-base">
            <DocumentoCompraCabecera
              data={data}
              handleData={handleData}
              handleGetTipoCambio={handleGetTipoCambio}
              handleNumero={handleNumero}
              handleSerie={handleSerie}
              documentosCompraPendientes={documentosCompraPendientes}
            />
            <DocumentoCompraDetalle
              dataGeneral={data}
              setDataGeneral={setData}
              adicional={adicional}
              handleAdicional={handleAdicional}
              handleDataGeneral={handleData}
            />
          </div>

          <ButtonFooter
            data={data}
            backPage={backPage}
            inputFocus="buttonProveedorFind"
          />
        </BasicKeyHandler>
      </div>

      {segundo.origen === "proveedorFind" && (
        <ProveedorFindModal inputFocus="tipoPagoId" />
      )}
      {segundo.origen === "articuloFind" && (
        <ArticuloFindModal inputFocus="cantidad" />
      )}
    </>
  );
};

export default DocumentoCompraForm;
