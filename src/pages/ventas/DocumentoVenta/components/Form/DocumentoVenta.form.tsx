import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateRoutes, ventasRoute } from "../../../../../common";
import {
  ArticuloFindModal,
  BasicKeyHandler,
  ButtonFooter,
  ClienteFindModal,
  ConfirmModal,
  Messages,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  IClienteCompleto,
  IClienteDireccion,
  IClienteFind,
  INotaPedido,
  INotaPedidoFind,
  IDocumentoVenta,
  IDocumentoVentaAdicional,
  IDocumentoVentaDetalle,
  IDocumentoVentaTablas,
  ITipoDocumento,
  defaultClienteCompleto,
  defaultDocumentoVenta,
  defaultDocumentoVentaAdicional,
  defaultDocumentoVentaTablas,
  IDocumentoVentaCuota,
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
import { DocumentoVentaCabecera, DocumentoVentaDetalle } from "./components";
import { NotaPedidoFindModal } from "../../../../../components/Helpers/Find/NotaPedido";
import { CuotaHelpModal } from "../../../../../components/Helpers/Modal/Cuota";

const DocumentoVentaForm: React.FC = () => {
  //#region useState
  const documentosPendientesListar: string =
    "Venta/DocumentoVenta/GetDocumentosReferencia";
  const navigate = useNavigate();
  const backPage: string = `/${privateRoutes.VENTAS}/${ventasRoute.DOCUMENTOVENTA}`;
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes, api, extra } = globalContext;
  const { primer, segundo } = modal;
  const { retorno } = form;
  const {
    documentosPendientes,
    tiposCobro,
    direcciones,
  }: IDocumentoVentaTablas = form.tablas || defaultDocumentoVentaTablas;
  const { simplificado } = extra;
  const mensaje = mensajes.filter((x) => x.origen === "form" && x.tipo >= 0);
  const [data, setData] = useState<IDocumentoVenta>(
    form.data || defaultDocumentoVenta
  );
  const [adicional, setAdicional] = useState<IDocumentoVentaAdicional>(
    defaultDocumentoVentaAdicional
  );
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
    retorno && retorno.origen === "clienteFind" && handleCliente(retorno);
    retorno && retorno.origen === "notaPedidoFind" && handleNotaPedido(retorno);
    retorno &&
      retorno.origen === "documentoPendienteHelp" &&
      handleGetDocumentoPendienteDetalle(retorno);
  }, [retorno]);

  useEffect(() => {
    data.detalles && handleTotales(data.detalles);
  }, [data.detalles]);

  useEffect(() => {
    data.detalles && handleTotales(data.detalles);
  }, [data.incluyeIGV, data.porcentajeIGV]);
  //#endregion

  //#region Funciones
  const handleLoad = async (): Promise<void> => {
    if (primer.tipo === "registrar") {
      const tipoCambio: number = await handleGetTipoCambio(true, false);
      setData((x) => ({ ...x, tipoCambio }));
    }
    handleGetClienteDireccion(data.clienteId);
    (data.tipoDocumentoId === "07" || data.tipoDocumentoId === "08") &&
      handleGetDocumentoPendiente(data.clienteId);
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
        case "tipoDocumentoId":
          newData.serie = "";
          newData.documentoReferenciaId = null;
          newData.numeroPedido = "";
          newData.motivoNotaId = null;
          newData.motivoNotaDescripcion = null;
          newData.motivoSustento = null;
          newData.fechaDocumentoReferencia = null;
          newData.incluyeIGV =
            (value as string) === "03" || newData.isOperacionGratuita
              ? false
              : true;
          break;
        case "fechaEmision":
          handleToast(
            "info",
            "Si la fecha de emisión ha sido cambiada, no olvide consultar el tipo de cambio."
          );
          break;

        case "direccionId":
          const direccion = direcciones.find(
            (x: IClienteDireccion) => x.id === newData.clienteDireccionId
          );
          newData.clienteDireccionId = direccion?.id ?? 0;
          newData.clienteDireccion = direccion?.direccion ?? null;
          // newData.departamentoId = direccion?.departamentoId ?? null;
          // newData.provinciaId = direccion?.provinciaId ?? null;
          // newData.distritoId = direccion?.distritoId ?? null;
          break;

        case "tipoVentaId":
          newData.tipoCobroId = "";
          newData.fechaVencimiento = x.fechaEmision;
          newData.cuotas = [];
          break;

        case "tipoCobroId":
          const vencimiento = handleSelectTipoPago(
            tiposCobro,
            newData.fechaEmision,
            value as string
          );
          newData.fechaVencimiento = vencimiento;
          break;

        case "documentoReferenciaId":
          newData.fechaDocumentoReferencia = "";
          break;

        case "isOperacionGratuita":
          newData.incluyeIGV =
            newData.tipoDocumentoId === "03" || (value as boolean)
              ? false
              : true;
          newData.porcentajeIGV = (value as boolean)
            ? 0
            : simplificado.porcentajeIGV;
          break;

        default:
          break;
      }
      return newData;
    });
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
  const handleNotaPedido = async (
    notaPedido: INotaPedidoFind
  ): Promise<void> => {
    try {
      const notaPedidoCompleto: INotaPedido = await getId(
        globalContext,
        notaPedido.id,
        "Venta/NotaPedido"
      );

      const {
        clienteId,
        clienteTipoDocumentoIdentidadId,
        clienteNumeroDocumentoIdentidad,
        clienteNombre,
        clienteDireccionId,
        clienteDireccion,
        id,
        numeroDocumento,
        personalId,
        tipoVentaId,
        tipoCobroId,
        monedaId,
        incluyeIGV,
        porcentajeIGV,
        porcentajeRetencion,
        observacion,
        detalles,
      } = notaPedidoCompleto;

      await handleGetClienteDireccion(clienteId);
      const fechaVencimiento: string = handleSelectTipoPago(
        tiposCobro,
        data.fechaEmision,
        tipoCobroId as string
      );

      const newDetalle = detalles.map((x) => ({
        ...x,
        //Añadiendo campos faltantes
        cantidadPendiente: x.cantidad,
      }));

      setData((x) => ({
        ...x,
        fechaVencimiento,
        clienteTipoDocumentoIdentidadId,
        clienteNumeroDocumentoIdentidad,
        clienteId,
        clienteNombre,
        clienteDireccionId,
        clienteDireccion,
        numeroPedido: numeroDocumento,
        personalId,
        tipoVentaId,
        tipoCobroId,
        monedaId,
        incluyeIGV,
        porcentajeIGV,
        porcentajeRetencion,
        observacion,
        detalles: newDetalle,
      }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
    }
  };
  const handleCuota = (cuotas: IDocumentoVentaCuota[]): void => {
    setData((x) => ({ ...x, cuotas }));
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
  const handleCliente = async (cliente: IClienteFind): Promise<void> => {
    try {
      const clienteCompleto: IClienteCompleto = await getId(
        globalContext,
        cliente.id,
        "Mantenimiento/Cliente",
        true
      );

      const {
        id,
        tipoDocumentoIdentidadId,
        numeroDocumentoIdentidad,
        nombre,
        direccionPrincipalId,
        direccionPrincipal,
        direcciones,
        telefono,
        contactos,
        tipoVentaId,
        tipoCobroId,
        personal,
      } = clienteCompleto;

      const fechaVencimiento: string = handleSelectTipoPago(
        tiposCobro,
        data.fechaEmision,
        tipoCobroId as string
      );
      const personalFind = personal.find((x) => x.default);
      const direccionFind = direcciones.find(
        (x) => x.id === direccionPrincipalId
      );
      const { departamentoId, provinciaId, distritoId } =
        direccionFind as IClienteDireccion;

      setData((x) => ({
        ...x,
        fechaVencimiento,

        clienteId: id,
        clienteTipoDocumentoIdentidadId: tipoDocumentoIdentidadId,
        clienteNumeroDocumentoIdentidad: numeroDocumentoIdentidad,
        clienteNombre: nombre,
        clienteDireccionId: direccionPrincipalId,
        clienteDireccion: direccionPrincipal,
        clienteTelefono: telefono,
        contactoId: "",
        contactoNombre: "",
        contactoTelefono: "",
        contactoCorreoElectronico: "",
        contactoCargoId: null,
        contactoCelular: "",

        tipoVentaId: tipoVentaId ?? "",
        tipoCobroId: tipoCobroId ?? "",
        personalId: personalFind
          ? personalFind.personalId
          : simplificado.personalId,
        departamentoId: departamentoId ?? "",
        provinciaId: provinciaId ?? "",
        distritoId: distritoId ?? "",
      }));
      await handleGetDocumentoPendiente(id);
      handleUpdateTablas(setGlobalContext, "direcciones", direcciones);
      handleUpdateTablas(setGlobalContext, "contactos", contactos);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
    }
  };
  const handleGetClienteDireccion = async (
    clienteId: string
  ): Promise<void> => {
    try {
      const urlParams = new URLSearchParams({ clienteId });
      const response: IClienteDireccion[] = await get({
        globalContext,
        menu: "Mantenimiento/ClienteDireccion/ListarPorCliente",
        urlParams,
      });
      handleUpdateTablas(setGlobalContext, "direcciones", response);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
    }
  };
  const handleTotales = (detalles: IDocumentoVentaDetalle[]): void => {
    const { porcentajeIGV, incluyeIGV, isOperacionGratuita, monedaId } = data;
    const importeTotal = detalles.reduce((total, x) => total + x.importe, 0);
    if (isOperacionGratuita) {
      setData((x) => ({
        ...x,
        incluyeIGV: false,
        porcentajeIGV: 0,
        porcentajeDetraccion: 0,
        porcentajeRetencion: 0,
        montoImpuestoBolsa: 0,
        montoRetencion: 0,
        montoDetraccion: 0,
        montoIGV: 0,
        subTotal: 0,
        totalOperacionesGratuitas: roundNumber(importeTotal),
        totalNeto: 0,
        total: 0,
        saldo: 0,
        abonado: 0,
      }));
      return;
    }
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
      totalOperacionesGratuitas: 0,
      total: roundNumber(total),
      abonado: roundNumber(total),
      saldo: 0,
    }));
  };
  const handleGetDocumentoPendiente = async (
    clienteId: string
  ): Promise<void> => {
    try {
      const urlParams = new URLSearchParams({ clienteId });
      const response =
        clienteId !== ""
          ? await get({
              globalContext,
              menu: documentosPendientesListar,
              urlParams,
            })
          : [];
      handleUpdateTablas(setGlobalContext, "documentosPendientes", response);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
    }
  };
  const handleGetDocumentoPendienteDetalle = async (
    estado: boolean
  ): Promise<void> => {
    if (!estado) return;
    const documentoPendiente = documentosPendientes.find(
      (x) => x.id === data.documentoReferenciaId
    );
    // Si no se encuentra el documento pendiente, salimos de la función
    if (!documentoPendiente) return;
    try {
      const response: IDocumentoVenta = await getId(
        globalContext,
        documentoPendiente.id,
        api.menu
      );

      if (documentoPendiente) {
        setData((x) => ({
          ...x,
          detalles: response.detalles,
        }));
        handleToast("info", "Detalle del documento obtenido correctamente.");
      }
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
    }
  };
  //#endregion
  return (
    <>
      <div className="main-base">
        <div className="main-header">
          <h4 className="main-header-sub-title">{`${modal.primer.tipo} Documento de Venta`}</h4>
        </div>

        {mensaje.length > 0 && <Messages />}

        <BasicKeyHandler selector={"documento-venta-form"}>
          <div className="form-base">
            <DocumentoVentaCabecera
              data={data}
              handleData={handleData}
              handleGetTipoCambio={handleGetTipoCambio}
              handleNumero={handleNumero}
              setData={setData}
            />
            <DocumentoVentaDetalle
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
            inputFocus="clienteId"
          />
        </BasicKeyHandler>
      </div>

      {segundo.origen === "clienteFind" && (
        <ClienteFindModal inputFocus="clienteNombre" />
      )}
      {segundo.origen === "articuloFind" && (
        <ArticuloFindModal inputFocus="cantidad" />
      )}
      {segundo.origen === "notaPedidoFind" && (
        <NotaPedidoFindModal inputFocus="clienteId" />
      )}
      {segundo.origen === "cuotaHelp" && (
        <CuotaHelpModal
          dataGeneral={data}
          tablas={form.tablas}
          handleCuota={handleCuota}
        />
      )}
      {segundo.origen === "documentoPendienteHelp" && (
        <ConfirmModal
          origen="documentoPendienteHelp"
          title="¿Desea copiar los detalles del documento?"
        />
      )}
    </>
  );
};

export default DocumentoVentaForm;
