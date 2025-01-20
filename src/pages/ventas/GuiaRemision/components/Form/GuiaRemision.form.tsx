import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateRoutes, ventasRoute } from "../../../../../common";
import {
  ArticuloFindModal,
  BasicKeyHandler,
  ButtonFooter,
  ClienteFindModal,
  Messages,
  ReferenciaFindModal,
  TransportistaFindModal,
  VehiculoFindModal,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  ICliente,
  IClienteFind,
  IDocumentoVenta,
  IGuiaRemision,
  IGuiaRemisionTablas,
  IGuiaRemisionTransportista,
  IGuiaRemisionVehiculo,
  IGuiaRemisionAdicional,
  IGuiaRemisionDetalle,
  defaultCliente,
  defaultGuiaRemision,
  defaultGuiaRemisionAdicional,
  defaultGuiaRemisionTablas,
  IClienteDireccion,
  IClienteCompleto,
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
import { VehiculoGuiaModal } from "./components/Modal";
import { TransportistaGuiaModal } from "./components/Modal/Transportista";
import { GuiaRemisionCabecera, GuiaRemisionDetalle } from "./components";
import { DocumentoVentaFindModal } from "../../../../../components/Helpers/Find/DocumentoVenta";

const GuiaRemisionForm: React.FC = () => {
  //#region useState
  const navigate = useNavigate();
  const menuReferencia = "Venta/GuiaRemision/ListarDocumentosReferencia";
  const menu = "Venta/GuiaRemision";
  const backPage: string = `/${privateRoutes.VENTAS}/${ventasRoute.GUIASREMISION}`;
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes, extra } = globalContext;
  const { primer, segundo, tercer } = modal;
  const { retorno } = form;
  const {}: IGuiaRemisionTablas = form.tablas || defaultGuiaRemisionTablas;
  const { simplificado } = extra;
  const mensaje = mensajes.filter((x) => x.origen === "form" && x.tipo >= 0);
  const [data, setData] = useState<IGuiaRemision>(
    form.data || defaultGuiaRemision
  );
  const [adicional, setAdicional] = useState<IGuiaRemisionAdicional>(
    defaultGuiaRemisionAdicional
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
    retorno &&
      retorno.origen === "documentoVentaFind" &&
      handleDocumentoVenta(retorno);
  }, [retorno]);

  useEffect(() => {
    data.detalles && handleTotales(data.detalles);
  }, [data.detalles]);

  // useEffect(() => {
  //   data.detalles && handleTotales(data.detalles);
  // }, [
  //   data.incluyeIGV,
  //   data.porcentajeIGV,
  //   data.porcentajePercepcion,
  //   data.porcentajeRetencion,
  // ]);
  //#endregion
  //#region Funciones

  const handleLoad = async (): Promise<void> => {
    handleGetClienteDireccion(data.clienteId);
  };

  const handleDocumentoVenta = async (
    documentoVenta: IDocumentoVenta
  ): Promise<void> => {
    try {
      const documentoVentaCompleto: IDocumentoVenta = await getId(
        globalContext,
        documentoVenta.id,
        "Venta/DocumentoVenta"
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
        detalles,
      } = documentoVentaCompleto;
      await handleGetClienteDireccion(clienteId);
      const newDetalle = detalles.map((x) => ({
        ...x,
        //Añadiendo campos faltantes
        cantidadPendiente: x.cantidad,
      }));
      setData((x) => ({
        ...x,
        clienteId,
        clienteTipoDocumentoIdentidadId,
        clienteNumeroDocumentoIdentidad,
        clienteNombre,
        clienteDireccionId,
        clienteDireccion,
        documentoVenta: numeroDocumento,
        numeroFactura: numeroDocumento,
        detalles: newDetalle,
      }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
    }
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
      } = clienteCompleto;
      const direccionFind = direcciones.find(
        (x) => x.id === direccionPrincipalId
      );
      const { departamentoId, provinciaId, distritoId } =
        direccionFind as IClienteDireccion;
      setData((x) => ({
        ...x,
        clienteId: id,
        clienteTipoDocumentoIdentidadId: tipoDocumentoIdentidadId,
        clienteNumeroDocumentoIdentidad: numeroDocumentoIdentidad,
        clienteNombre: nombre,
        clienteDireccionId: direccionPrincipalId,
        clienteDireccion: direccionPrincipal,
        clienteTelefono: telefono,
        departamentoId: departamentoId ?? "",
        provinciaId: provinciaId ?? "",
        distritoId: distritoId ?? "",
      }));
      handleUpdateTablas(setGlobalContext, "direcciones", direcciones);
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
  const handleTransportista = (
    transportistas: IGuiaRemisionTransportista[]
  ): void => {
    setData((x) => ({ ...x, transportistas: transportistas }));
  };
  const handleVehiculos = (vehiculos: IGuiaRemisionVehiculo[]): void => {
    setData((x) => ({ ...x, vehiculos: vehiculos }));
  };
  const handleTotales = (detalles: IGuiaRemisionDetalle[]): void => {
    const { porcentajeIGV, incluyeIGV, pesoBrutoTotal } = data;
    const importeTotal = detalles.reduce((total, x) => total + x.importe, 0);
    const pesoNetoTotal = detalles.reduce((total, x) => total + x.totalPeso, 0);

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
      pesoBrutoTotal: roundNumber(pesoBrutoTotal),
      pesoNetoTotal: roundNumber(pesoNetoTotal),
    }));
  };

  return (
    <>
      <div className="main-base">
        <div className="main-header">
          <h4 className="main-header-sub-title">{`${modal.primer.tipo} guía de remisión`}</h4>
        </div>

        {mensaje.length > 0 && <Messages />}

        <BasicKeyHandler selector={"guia-remision-form"}>
          <div className="form-base">
            <GuiaRemisionCabecera
              data={data}
              setData={setData}
              handleData={handleData}
            />
            <GuiaRemisionDetalle
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
            menu={menu}
            inputFocus="clienteId"
          />
        </BasicKeyHandler>
      </div>

      {segundo.origen === "transportistaHelp" &&
        data.modalidadTransporteId !== "" && (
          <TransportistaGuiaModal
            dataTransportista={data.transportistas}
            modalidad={data.modalidadTransporteId}
            handleTransportistas={handleTransportista}
          />
        )}

      {tercer.origen === "transportistaFind" &&
        data.modalidadTransporteId !== "" && (
          <TransportistaFindModal
            modalidad={data.modalidadTransporteId}
            inputFocus={
              data.modalidadTransporteId === "01"
                ? "observacion"
                : "buttonVehiculoHelp"
            }
          />
        )}

      {segundo.origen === "vehiculoHelp" &&
        data.modalidadTransporteId === "02" && (
          <VehiculoGuiaModal
            dataVehiculo={data.vehiculos}
            handleVehiculos={handleVehiculos}
          />
        )}

      {tercer.origen === "vehiculoFind" && (
        <VehiculoFindModal inputFocus="observacion" />
      )}

      {segundo.origen === "clienteFind" && (
        <ClienteFindModal inputFocus="clienteNombre" />
      )}
      {segundo.origen === "documentoVentaFind" && (
        <DocumentoVentaFindModal inputFocus="clienteId" />
      )}
      {segundo.origen === "referenciaFind" && (
        <ReferenciaFindModal
          tipoDocumentoId={data.tipoDocumentoReferencia as string}
          menu={menuReferencia}
          inputFocus="clienteDireccion"
        />
      )}

      {segundo.origen === "articuloFind" && (
        <ArticuloFindModal inputFocus="cantidad" />
      )}
    </>
  );
};

export default GuiaRemisionForm;
