import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateRoutes, ventasRoute } from "../../../../../common";
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
  INotaPedido,
  INotaPedidoAdicional,
  INotaPedidoDetalle,
  INotaPedidoTablas,
  defaultClienteCompleto,
  defaultNotaPedido,
  defaultNotaPedidoAdicional,
  defaultNotaPedidoTablas,
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
import { NotaPedidoCabecera, NotaPedidoDetalle } from "./components";

const NotaPedidoForm: React.FC = () => {
  //#region useState
  const navigate = useNavigate();
  const backPage: string = `/${privateRoutes.VENTAS}/${ventasRoute.NOTAPEDIDO}`;
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes, extra } = globalContext;
  const { primer, segundo } = modal;
  const { retorno } = form;
  const {
    tiposCobro,
    direcciones,
    contactos,
    contactoCargos,
  }: INotaPedidoTablas = form.tablas || defaultNotaPedidoTablas;
  const { simplificado } = extra;
  const mensaje = mensajes.filter((x) => x.origen === "form" && x.tipo >= 0);
  const [data, setData] = useState<INotaPedido>(form.data || defaultNotaPedido);
  const [adicional, setAdicional] = useState<INotaPedidoAdicional>(
    defaultNotaPedidoAdicional
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
  }, [retorno]);

  useEffect(() => {
    data.detalles && handleTotales(data.detalles);
  }, [data.detalles]);

  useEffect(() => {
    data.detalles && handleTotales(data.detalles);
  }, [
    data.incluyeIGV,
    data.porcentajeIGV,
    data.porcentajePercepcion,
    data.porcentajeRetencion,
  ]);
  //#endregion

  //#region Funciones

  const handleLoad = async (): Promise<void> => {
    if (primer.tipo === "registrar") {
      const tipoCambio: number = await handleGetTipoCambio(true, false);
      setData((x) => ({ ...x, tipoCambio }));
    }
    handleGetClienteDireccion(data.clienteId);
    handleGetClienteContacto(data.clienteId);
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

        case "direccionId":
          const direccion = direcciones.find(
            (x: IClienteDireccion) => x.id === newData.clienteDireccionId
          );
          newData.clienteDireccionId = direccion?.id ?? 0;
          newData.clienteDireccion = direccion?.direccion ?? null;
          newData.departamentoId = direccion?.departamentoId ?? null;
          newData.provinciaId = direccion?.provinciaId ?? null;
          newData.distritoId = direccion?.distritoId ?? null;
          break;

        case "contactoId":
          const contacto = contactos.find(
            (x: IClienteContacto) => x.id === newData.contactoId
          );
          const cargo = contactoCargos.find((x) => x.id === contacto?.cargoId);

          newData.contactoId = contacto?.id ?? null;
          newData.contactoNombre = contacto?.nombres ?? null;
          newData.contactoCorreoElectronico =
            contacto?.correoElectronico ?? null;
          newData.contactoTelefono = contacto?.telefono ?? null;
          newData.contactoCelular = contacto?.celular ?? null;
          newData.contactoCargoId = contacto?.cargoId ?? null;
          newData.contactoCargoDescripcion = cargo?.descripcion ?? null;
          break;
        case "tipoVentaId":
          newData.tipoCobroId = "";
          newData.fechaVencimiento = x.fechaEmision;
          break;

        case "tipoCobroId":
          const vencimiento = handleSelectTipoPago(
            tiposCobro,
            newData.fechaEmision,
            value as string
          );
          newData.fechaVencimiento = vencimiento;
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

  const handleGetClienteContacto = async (clienteId: string): Promise<void> => {
    try {
      const urlParams = new URLSearchParams({ clienteId });
      const response: IClienteContacto[] = await get({
        globalContext,
        menu: "Mantenimiento/ClienteContacto/ListarPorCliente",
        urlParams,
      });
      handleUpdateTablas(setGlobalContext, "contactos", response);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
    }
  };
  const handleTotales = (detalles: INotaPedidoDetalle[]): void => {
    const {
      incluyeIGV,
      porcentajeIGV,
      porcentajePercepcion,
      porcentajeRetencion,
    } = data;

    const importeTotal = detalles.reduce((total, x) => total + x.importe, 0);

    let subTotal = incluyeIGV
      ? importeTotal / (1 + porcentajeIGV / 100)
      : importeTotal;
    let montoIGV = incluyeIGV
      ? importeTotal - subTotal
      : importeTotal * (porcentajeIGV / 100);
    let totalNeto = incluyeIGV ? importeTotal : subTotal + montoIGV;

    const montoRetencion = totalNeto * (porcentajeRetencion / 100);
    const montoPercepcion = totalNeto * (porcentajePercepcion / 100);
    const total = totalNeto + montoRetencion + montoPercepcion;

    setData((x) => ({
      ...x,
      montoRetencion: roundNumber(montoRetencion),
      montoPercepcion: roundNumber(montoPercepcion),
      montoIGV: roundNumber(montoIGV),
      subTotal: roundNumber(subTotal),
      totalNeto: roundNumber(totalNeto),
      abonado: roundNumber(total),
      total: roundNumber(total),
    }));
  };

  return (
    <>
      <div className="main-base">
        <div className="main-header">
          <h4 className="main-header-sub-title">{`${modal.primer.tipo} nota pedido`}</h4>
        </div>

        {mensaje.length > 0 && <Messages />}

        <BasicKeyHandler selector={"nota-pedido-form"}>
          <div className="form-base">
            <NotaPedidoCabecera
              data={data}
              handleData={handleData}
              handleGetTipoCambio={handleGetTipoCambio}
              handleNumero={handleNumero}
              handleSerie={handleSerie}
            />
            <NotaPedidoDetalle
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
    </>
  );
};

export default NotaPedidoForm;
