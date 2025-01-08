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
  IProveedorFind,
  defaultDocumentoCompra,
} from "../../../../../models";
import {
  handleBackPage,
  handleInputType,
  handleResetContext,
  handleSetInputs,
  roundNumber,
  handleTipoCambio,
} from "../../../../../util";
import { DocumentoCompraCabecera, DocumentoCompraDetalle } from "./components";

const DocumentoCompraForm: React.FC = () => {
  //#region useState
  const navigate = useNavigate();
  const backPage: string = `/${privateRoutes.COMPRAS}/${comprasRoutes.TODASLASCOMPRAS}`;
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes } = globalContext;
  const { primer, segundo } = modal;
  const { retorno } = form;
  // const { simplificado } = extra;
  const mensaje = mensajes.filter((x) => x.origen === "form" && x.tipo >= 0);
  const [data, setData] = useState<IDocumentoCompra>(
    form.data || defaultDocumentoCompra
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

  // useEffect(() => {
  //   data.detalles && handleTotales(data.detalles);
  // }, [data.detalles]);

  useEffect(() => {
    retorno && retorno.origen === "proveedorFind" && handleProveedor(retorno);
  }, [retorno]);

  useEffect(() => {}, [segundo]);

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

  // const handleTotales = (detalles: IDocumentoCompraDetalle[]): void => {
  //   const { porcentajeIGV } = data;
  //   const incluyeIGV: boolean = true; // Fijado temporalmente como true

  //   // Inicializar acumuladores
  //   let totalOperaciones = {
  //     gravadas: 0,
  //     exoneradas: 0,
  //     inafectas: 0,
  //   };

  //   // Calcular totales agrupados por tipo de afectación
  //   // detalles.forEach((x) => {
  //   //   switch (x.tipoAfectacionIGVId) {
  //   //     case "10":
  //   //       totalOperaciones.gravadas += x.importe;
  //   //       break;
  //   //     case "20":
  //   //       totalOperaciones.exoneradas += x.importe;
  //   //       break;
  //   //     case "30":
  //   //       totalOperaciones.inafectas += x.importe;
  //   //       break;
  //   //     default:
  //   //       break;
  //   //   }
  //   // });

  //   // Calcular totales e IGV
  //   let { gravadas } = totalOperaciones;
  //   let montoIGV = 0;

  //   if (incluyeIGV) {
  //     gravadas /= 1 + porcentajeIGV / 100;
  //     montoIGV = totalOperaciones.gravadas - gravadas;
  //   } else {
  //     montoIGV = gravadas * (porcentajeIGV / 100);
  //     gravadas += montoIGV;
  //   }

  //   const total =
  //     totalOperaciones.exoneradas +
  //     totalOperaciones.inafectas +
  //     gravadas +
  //     montoIGV;

  //   // Actualizar datos redondeados
  //   setData((x) => ({
  //     ...x,
  //     totalOperacionesGravadas: roundNumber(gravadas),
  //     totalOperacionesExoneradas: roundNumber(totalOperaciones.exoneradas),
  //     totalOperacionesInafectas: roundNumber(totalOperaciones.inafectas),
  //     montoIGV: roundNumber(montoIGV),
  //     total: roundNumber(total),
  //   }));
  // };

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
            />
            {/* <DocumentoCompraDetalle dataGeneral={data} setDataGeneral={setData} /> */}
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
    </>
  );
};

export default DocumentoCompraForm;
