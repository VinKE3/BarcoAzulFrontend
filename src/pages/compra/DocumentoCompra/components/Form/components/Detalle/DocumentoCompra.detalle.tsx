import { ChangeEvent, useEffect, useState } from "react";
import { BsFillCartPlusFill, BsFillEraserFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa6";
import { IoMdPricetags } from "react-icons/io";
import {
  CheckBox,
  Messages,
  PrecioFindModal,
  Table,
} from "../../../../../../../components";
import { useGlobalContext } from "../../../../../../../hooks";
import {
  IArticuloCompleto,
  IDocumentoCompra,
  IDocumentoCompraDetalle,
  IDocumentoCompraTablas,
  IDocumentoCompraVarios,
  IPorcentajesTable,
  IPrecioFind,
  defaultArticuloCompleto,
  defaultDocumentoCompraDetalle,
  defaultDocumentoCompraTablas,
} from "../../../../../../../models";
import {
  getId,
  handleClearMensajes,
  handleConvertPrecios,
  handleCrudDetalles,
  handleFocus,
  handleHelpModal,
  handleInputType,
  handleNumber,
  handleSetTextos,
  handleToast,
  handleValCantidad,
  handleValPrecio,
  roundNumber,
} from "../../../../../../../util";
import { useDocumentoCompraDetalleColumn } from "../../../Column";
interface IProps {
  dataGeneral: IDocumentoCompra;
  setDataGeneral: React.Dispatch<React.SetStateAction<IDocumentoCompra>>;
  handleDataGeneral: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => Promise<void> | void;
  adicional: IDocumentoCompraVarios;
  handleAdicional: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => Promise<void> | void;
}

const DocumentoCompraDetalle: React.FC<IProps> = ({
  dataGeneral,
  setDataGeneral,
  handleDataGeneral,
  adicional,
  handleAdicional,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes, extra, api } = globalContext;
  const { primer, segundo } = modal;
  const { retorno, tablas } = form;
  const { simplificado, element } = extra;
  const { inputs } = element;
  const mensaje = mensajes.filter((x) => x.origen === "detalle" && x.tipo >= 0);
  const { porcentajesIGV }: IDocumentoCompraTablas =
    tablas || defaultDocumentoCompraTablas;
  const [articuloCompleto, setArticuloCompleto] = useState<IArticuloCompleto>(
    defaultArticuloCompleto
  );
  const [data, setData] = useState<IDocumentoCompraDetalle>(
    defaultDocumentoCompraDetalle
  );

  const columns = useDocumentoCompraDetalleColumn(primer.tipo);

  const footerItems = [
    {
      text: "SubTotal",
      value: Number(dataGeneral.subTotal),
      show: dataGeneral.tipoDocumentoId !== "03",
    },
    {
      text: "Total Neto",
      value: Number(dataGeneral.totalNeto),
      show: dataGeneral.tipoDocumentoId !== "03",
    },
    {
      text: "IGV %",
      value: handleNumber(dataGeneral.montoIGV, true, true),
      show: dataGeneral.tipoDocumentoId !== "03",
    },
    { text: "ABONADO", value: Number(dataGeneral.abonado), show: true },
    { text: "SALDO", value: Number(dataGeneral.saldo), show: true },
    { text: "TOTAL", value: Number(dataGeneral.total), show: true },
  ];
  //#endregion

  //#region useEffect
  useEffect(() => {
    retorno &&
      retorno.origen === "articuloVarios" &&
      handleArticuloCompletoVarios(retorno.articuloVarios);
    retorno &&
      retorno.origen === "articuloFind" &&
      handleArticuloCompleto(retorno.id as string);
    retorno &&
      retorno.origen === "precioFind" &&
      handlePrecio(retorno as IPrecioFind);
    retorno &&
      retorno.origen === "detalle" &&
      handleActionBar(retorno as IDocumentoCompraDetalle);
  }, [retorno]);

  useEffect(() => {
    data.tipo !== "registrar" && handleArticuloCompleto(data.articuloId);
  }, [data.tipo]);

  useEffect(() => {
    articuloCompleto.id !== "" &&
      data.tipo === "registrar" &&
      handleFillDetalle();
  }, [articuloCompleto]);
  //#endregion

  //#region Funciones
  const handleData = ({
    target,
  }: ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >): void => {
    const { name } = target;
    const value = handleInputType(target);

    setData((x) => {
      const newData = { ...x, [name]: value };

      switch (name) {
        case "cantidad":
          newData.importe = roundNumber(
            newData.cantidad * newData.precioUnitario,
            4
          );
          break;
        case "precioUnitario":
          newData.importe = roundNumber(
            newData.precioUnitario * newData.cantidad,
            4
          );
          break;
        case "importe":
          newData.precioUnitario = roundNumber(
            newData.importe / newData.cantidad || 0
          );
          break;
        default:
          break;
      }
      return newData;
    });
  };

  const handleActionBar = (detalle: IDocumentoCompraDetalle): void => {
    if (detalle.tipo === "eliminar") {
      handleCrudDetalles(dataGeneral, setDataGeneral, detalle);
      return;
    }
    setData(detalle);
    handleFocus(inputs["cantidad"]);
  };

  const handleArticuloCompleto = async (articuloId: string): Promise<void> => {
    if (data.tipo === "registrar") {
      const existe = dataGeneral.detalles.find(
        (x) => x.articuloId === articuloId
      );
      if (existe) {
        handleToast(
          "error",
          `El artículo ${existe.descripcion} ya existe en el detalle, no se puede volver a registrar.`
        );
        handleFocus(inputs["cantidad"]);
        return;
      }
    }
    const articulo: IArticuloCompleto = await getId(
      globalContext,
      articuloId,
      "Mantenimiento/Articulo",
      true
    );
    const { monedaId, tipoCambio } = dataGeneral;
    const {
      precioVenta1,
      precioVenta2,
      precioVenta3,
      precioVenta4,
      precioCompra,
      precioCompraDescuento,
    } = handleConvertPrecios(
      setGlobalContext,
      "venta",
      monedaId,
      tipoCambio,
      articulo,
      4
    );

    setArticuloCompleto({
      ...articulo,
      precioVenta1,
      precioVenta2,
      precioVenta3,
      precioVenta4,
      precioCompra,
      precioCompraDescuento,
    });
  };
  const handleArticuloCompletoVarios = async (
    varios: boolean
  ): Promise<void> => {
    const {
      id,
      descripcion,
      lineaId,
      subLineaId,
      articuloId,
      unidadMedidaId,
      unidadMedidaDescripcion,
      marcaId,
      codigoBarras,
      precioCompra,
      precioVenta1,
    } = varios ? simplificado.articulo : defaultArticuloCompleto;

    setData((x) => ({
      ...x,
      id,
      descripcion,
      lineaId,
      subLineaId,
      articuloId,
      unidadMedidaId,
      unidadMedidaDescripcion,
      marcaId,
      codigoBarras,
      precioCompra,
      precioUnitario: precioVenta1,
      cantidad: 1,
      importe: 1 * precioVenta1,
    }));

    setArticuloCompleto(
      varios ? simplificado.articulo : defaultArticuloCompleto
    );
    handleFocus(inputs["descripcion"]);
    varios && handleToast("warning", "Artículo Varios asignado.");
  };
  const handlePrecio = (find: IPrecioFind): void => {
    const { precio } = find;
    setData((x) => ({
      ...x,
      precioUnitario: precio,
      importe: precio * x.cantidad,
    }));
  };
  const handleFillDetalle = (): void => {
    const {
      id,
      articuloId,
      descripcion,
      lineaId,
      subLineaId,
      marcaId,
      unidadMedidaId,
      unidadMedidaDescripcion,
      activarCostoDescuento,
      precioCompra,
      precioCompraDescuento,
      precioVenta1,
    } = articuloCompleto;
    setData((x) => ({
      ...x,
      id,
      codigoBarras: id,
      articuloId,
      descripcion,
      lineaId,
      marcaId,
      subLineaId,
      unidadMedidaId,
      unidadMedidaDescripcion,
      precioCompra: activarCostoDescuento
        ? precioCompraDescuento
        : precioCompra,
      precioUnitario: precioVenta1,
      importe: x.cantidad * precioVenta1,
    }));
  };

  const handleValidation = async (): Promise<boolean> => {
    await handleClearMensajes(setGlobalContext);
    let textos: string[] = [];

    if (!data.articuloId || !data.descripcion) {
      textos.push("La descripción es requerida");
    }

    if (data.tipo === "registrar") {
      const existe = dataGeneral.detalles.find((x) =>
        adicional.articuloVarios
          ? x.descripcion === data.descripcion
          : x.articuloId === data.articuloId
      );
      if (existe) {
        textos.push("El artículo ya existe en el detalle, imposible registrar");
      }
    }

    textos = [
      ...textos,
      ...handleValCantidad(data.cantidad),
      ...handleValPrecio(data.precioUnitario),
    ];

    // if (data.precioCompra > data.precioUnitario) {
    //   textos.push(
    //     `El precio de venta ${roundNumber(
    //       data.precioUnitario,
    //       4
    //     )} está por debajo del precio de compra ${roundNumber(
    //       data.precioCompra
    //     )}.`
    //   );
    // }

    if (!data.importe || data.importe <= 0) {
      textos.push("El importe debe ser mayor que 0");
    }

    if (textos.length > 0) {
      handleSetTextos(setGlobalContext, "detalle", textos);
    }
    return textos.length === 0;
  };

  const handleSave = async (): Promise<void> => {
    const detalleValido = await handleValidation();
    if (!detalleValido) {
      handleFocus(inputs["cantidad"]);
      return;
    }
    handleCrudDetalles(dataGeneral, setDataGeneral, data);
    handleClear();
  };

  const handleClear = (): void => {
    setArticuloCompleto(defaultArticuloCompleto);
    setData(defaultDocumentoCompraDetalle);
    handleFocus(inputs["cantidad"]);
  };
  const handleKeyDown = async (e: any): Promise<void> => {
    if (e.key === "Enter") {
      await handleClearMensajes(setGlobalContext);
      let textos: string[] = [];

      switch (e.target.id) {
        case "buttonArticuloFind": {
          handleHelpModal(setGlobalContext, "articuloFind");
          e.stopPropagation();
          break;
        }

        case "buttonPrecioFind": {
          e.stopPropagation();
          handleHelpModal(setGlobalContext, "precioFind");
          break;
        }

        case "buttonSaveDetalle": {
          await handleSave();
          e.stopPropagation();
          break;
        }

        default: {
          break;
        }
      }

      if (textos.length > 0) {
        handleSetTextos(setGlobalContext, "detalle", textos);
        e.stopPropagation();
        handleFocus(inputs[e.target.id]);
      }
    }
  };
  //#endregion
  return (
    <div className="form-base-container documento-compra-detalle-form">
      {mensaje.length > 0 && <Messages />}
      <div className="filter-base">
        <span className="filter-base-text">Detalles</span>

        {primer.tipo !== "consultar" && (
          <>
            {" "}
            <div className="input-base-row">
              <div className="input-base-container-100">
                <label htmlFor="descripcion" className="label-base">
                  Descripción
                </label>
                <div className="input-base-container-button">
                  <input
                    ref={inputs["descripcion"]}
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripción"
                    value={data.descripcion}
                    onChange={handleData}
                    disabled={!adicional.articuloVarios}
                    className="input-base-button"
                  />
                  <button
                    ref={inputs["buttonArticuloFind"]}
                    id="buttonArticuloFind"
                    name="buttonArticuloFind"
                    title="Presione [ALT +] para adjuntar artículo."
                    accessKey="+"
                    onClick={() =>
                      handleHelpModal(setGlobalContext, "articuloFind")
                    }
                    onKeyDown={handleKeyDown}
                    disabled={
                      data.tipo === "consultar" ||
                      !dataGeneral.monedaId ||
                      adicional.articuloVarios
                    }
                    className="button-base-anidado button-base-bg-primary"
                  >
                    <FaCartPlus
                      strokeWidth={2}
                      size="2rem"
                      className="button-base-icon"
                    />
                  </button>
                </div>
              </div>
              <div className="input-base-container-auto">
                {element.responsive === "full" && (
                  <span className="label-base-checkbox">-</span>
                )}
                <CheckBox
                  id="articuloVarios"
                  value={adicional.articuloVarios}
                  handleData={handleAdicional}
                  label="Varios"
                />
              </div>
            </div>
            <div className="input-base-row">
              <div className="input-base-container-20">
                <label htmlFor="unidadMedidaDescripcion" className="label-base">
                  Unidad Medida
                </label>
                <input
                  id="unidadMedidaDescripcion"
                  name="unidadMedidaDescripcion"
                  placeholder="Unidad Medida"
                  value={data.unidadMedidaDescripcion ?? ""}
                  disabled
                  className="input-base"
                />
              </div>
              <div className="input-base-container-20">
                <label htmlFor="stock" className="label-base">
                  Stock
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  id="stock"
                  name="stock"
                  placeholder="Stock"
                  value={articuloCompleto.stock ?? 0}
                  disabled
                  className="input-base"
                />
              </div>
              <div className="input-base-container-20">
                <label htmlFor="cantidad" className="label-base">
                  Cantidad
                </label>
                <input
                  ref={inputs["cantidad"]}
                  type="number"
                  inputMode="numeric"
                  id="cantidad"
                  name="cantidad"
                  placeholder="Cantidad"
                  value={data.cantidad ?? 0}
                  onChange={handleData}
                  autoComplete="off"
                  min={0}
                  step={0.1}
                  disabled={data.tipo === "consultar"}
                  className="input-base"
                />
              </div>
              <div className="input-base-container-20">
                <label htmlFor="precioUnitario" className="label-base">
                  Precio
                </label>
                <div className="input-base-container-button">
                  <input
                    ref={inputs["precioUnitario"]}
                    type="number"
                    inputMode="numeric"
                    id="precioUnitario"
                    name="precioUnitario"
                    placeholder="Precio"
                    value={data.precioUnitario ?? 0}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={0.1}
                    disabled={data.tipo === "consultar"}
                    className={
                      !api.loading ? "input-base-button" : "input-base"
                    }
                  />
                  {!api.loading && (
                    <button
                      id="buttonPrecioFind"
                      name="buttonPrecioFind"
                      title="Presione [ALT .] para adjuntar precio."
                      accessKey="."
                      onClick={() =>
                        handleHelpModal(setGlobalContext, "precioFind")
                      }
                      onKeyDown={handleKeyDown}
                      disabled={
                        data.tipo === "consultar" ||
                        !data.articuloId ||
                        adicional.articuloVarios
                      }
                      className="button-base-anidado button-base-bg-primary"
                    >
                      <IoMdPricetags
                        strokeWidth={2}
                        size="2rem"
                        className="button-base-icon"
                      />
                    </button>
                  )}
                </div>
              </div>
              <div className="input-base-container-33">
                <label htmlFor="importe" className="label-base">
                  Importe
                </label>
                <div className="input-base-container-button">
                  <input
                    ref={inputs["importe"]}
                    type="number"
                    inputMode="numeric"
                    id="importe"
                    name="importe"
                    placeholder="Importe"
                    value={data.importe}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={0.1}
                    disabled={data.tipo === "consultar"}
                    className="input-base-button"
                  />
                  <button
                    id="buttonClearDetalle"
                    name="buttonClearDetalle"
                    title="Presione [ALT -] para limpiar el detalle."
                    accessKey="-"
                    onClick={handleClear}
                    className="button-base-anidado-plano button-base-bg-red"
                  >
                    <BsFillEraserFill
                      size="2rem"
                      className="button-base-icon"
                    />
                  </button>
                  <button
                    id="buttonSaveDetalle"
                    name="buttonSaveDetalle"
                    title="Presione [ALT + D] para guardar el detalle."
                    accessKey="d"
                    onClick={handleSave}
                    onKeyDown={handleKeyDown}
                    disabled={data.tipo === "consultar"}
                    className="button-base-anidado button-base-bg-secondary"
                  >
                    <BsFillCartPlusFill
                      size="2rem"
                      className="button-base-icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Table
        data={dataGeneral.detalles}
        columns={columns}
        doubleClick={false}
        pagination={false}
        selectable={false}
        border={true}
        tableClassName="documento-compra-detalle-table"
      />
      <div className="form-base-detalle">
        {footerItems.map((item, index) => (
          <div key={index} className="form-base-detalle-row">
            {item.show !== false && (
              <>
                <p className="form-base-detalle-row-text">{item.text}</p>
                {item.text === "IGV %" && (
                  <div
                    key={`igv-${index}`}
                    className="!py-[1px] input-base-container-auto"
                  >
                    <select
                      id="porcentajeIGV"
                      name="porcentajeIGV"
                      value={dataGeneral.porcentajeIGV}
                      onChange={handleDataGeneral}
                      disabled={primer.tipo === "consultar"}
                      className="form-base-detalle-row-input"
                    >
                      <option key="default" value="">
                        -
                      </option>
                      {porcentajesIGV.map((x: IPorcentajesTable) => (
                        <option key={x.porcentaje} value={x.porcentaje}>
                          {x.porcentaje}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <p className="form-base-detalle-row-number">
                  {handleNumber(item.value, true, true)}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
      {segundo.origen === "precioFind" && (
        <PrecioFindModal
          articulo={articuloCompleto}
          inputFocus="precioUnitario"
        />
      )}
    </div>
  );
};

export default DocumentoCompraDetalle;
