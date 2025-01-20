import { KeyboardEvent } from "react";
import { TbDeviceIpadSearch } from "react-icons/tb";
import { CheckBox } from "../../../../../../../components";
import { useGlobalContext } from "../../../../../../../hooks";
import {
  IClienteDireccion,
  ICombo,
  IGuiaRemision,
  IGuiaRemisionTablas,
  IPuntoVenta,
  ISerie,
  ITiposSumaResta,
  defaultDocumentoVenta,
  defaultGuiaRemision,
  defaultGuiaRemisionTablas,
} from "../../../../../../../models";
import {
  handleClearMensajes,
  handleFocus,
  handleHelpModal,
  handleToast,
  helpModalMap,
  handleOpenModal,
} from "../../../../../../../util";
import { PiFileDoc } from "react-icons/pi";
import { BsFillEraserFill } from "react-icons/bs";

interface IProps {
  data: IGuiaRemision;
  setData: React.Dispatch<React.SetStateAction<IGuiaRemision>>;
  handleData: (x: any) => Promise<void> | void;
}

const GuiaRemisionCabecera: React.FC<IProps> = ({
  data,
  setData,
  handleData,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, extra } = globalContext;
  const { primer } = modal;
  const { element } = extra;
  const {
    series,
    tiposDocumentoReferencia,
    motivosTraslado,
    modalidadesTransporte,
    direcciones,
    tipos,
  }: IGuiaRemisionTablas = form.tablas || defaultGuiaRemisionTablas;
  const { inputs } = element;

  console.log(data, "data");

  //#region Funciones

  const handleClearDocumentoVenta = (): void => {
    setData(defaultGuiaRemision);
    handleFocus(inputs["tipoDocumentoId"]);
    handleToast(
      "warning",
      "Documento de venta borrada, vuelva a ingresar datos."
    );
  };

  const handleOpenModal2 = async (origen: string): Promise<void> => {
    await handleClearMensajes(setGlobalContext);

    if (origen in helpModalMap) {
      handleHelpModal(setGlobalContext, helpModalMap[origen]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key !== "Enter") return;

    e.stopPropagation();
    handleOpenModal2(e.currentTarget.id);
  };
  //#endregion
  return (
    <div className="form-base-container guia-remision-form">
      <div className="modal-base-content">
        <div className="input-base-row">
          <div className="input-base-container-25">
            <label htmlFor="serie" className="label-base">
              Serie
            </label>
            <select
              id="serie"
              name="serie"
              value={data.serie ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {series.map((x: ISerie) => (
                <option key={x.serie} value={x.serie}>
                  {x.serie}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-25">
            <label htmlFor="numero" className="label-base">
              Número
            </label>
            <input
              id="numero"
              name="numero"
              placeholder="Número"
              value={data.numero ?? ""}
              disabled
              className="input-base"
            />
          </div>
          <div className="input-base-container-25">
            <label htmlFor="fechaEmision" className="label-base">
              Emisión
            </label>
            <input
              type="date"
              id="fechaEmision"
              name="fechaEmision"
              value={data.fechaEmision}
              onChange={handleData}
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
          <div className="input-base-container-25">
            <label htmlFor="fechaTraslado" className="label-base">
              Traslado
            </label>
            <input
              type="date"
              id="fechaTraslado"
              name="fechaTraslado"
              value={data.fechaTraslado}
              onChange={handleData}
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-100">
            <label htmlFor="documentoVenta" className="label-base">
              Documento de Venta
            </label>
            <div className="input-base-container-button">
              <input
                id="documentoVenta"
                name="documentoVenta"
                placeholder="Adjuntar Documento de Venta..."
                value={data.documentoVenta ?? ""}
                disabled
                className={
                  primer.tipo !== "registrar"
                    ? "input-base"
                    : "input-base-button"
                }
              />
              {primer.tipo === "registrar" && (
                <>
                  <button
                    id="buttonClearDocumentoVenta"
                    name="buttonClearDocumentoVenta"
                    title="Presione [ALT + A] para borrar documento de venta."
                    accessKey="a"
                    onClick={handleClearDocumentoVenta}
                    disabled={data.documentoVenta === null}
                    className="button-base-anidado-plano button-base-bg-red"
                  >
                    <BsFillEraserFill
                      size="2rem"
                      className="button-base-icon"
                    />
                  </button>
                  <button
                    id="buttonDocumentoVentaFind"
                    name="buttonDocumentoVentaFind"
                    title="Presione [ALT + S] para adjuntar documento de venta."
                    accessKey="s"
                    onClick={() =>
                      handleOpenModal(
                        setGlobalContext,
                        "buttonDocumentoVentaFind"
                      )
                    }
                    className="button-base-anidado button-base-bg-primary"
                  >
                    <PiFileDoc size="2rem" className="button-base-icon" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label
              htmlFor="clienteNumeroDocumentoIdentidad"
              className="label-base"
            >
              Documento Identidad
            </label>
            <div className="input-base-container-button">
              <input
                ref={inputs["clienteNumeroDocumentoIdentidad"]}
                id="clienteNumeroDocumentoIdentidad"
                name="clienteNumeroDocumentoIdentidad"
                placeholder="Documento Identidad"
                value={data.clienteNumeroDocumentoIdentidad ?? ""}
                disabled
                className={
                  primer.tipo === "consultar"
                    ? "input-base"
                    : "input-base-button"
                }
              />
              {primer.tipo !== "consultar" && (
                <button
                  ref={inputs["buttonClienteFind"]}
                  id="buttonClienteFind"
                  name="buttonClienteFind"
                  title="Presione [ALT + C] para adjuntar cliente."
                  accessKey="c"
                  onClick={() =>
                    handleOpenModal(setGlobalContext, "buttonClienteFind")
                  }
                  onKeyDown={handleKeyDown}
                  className="button-base-anidado button-base-bg-primary"
                >
                  <TbDeviceIpadSearch
                    strokeWidth={2}
                    size="2rem"
                    className="button-base-icon"
                  />
                </button>
              )}
            </div>
          </div>
          <div className="input-base-container-100">
            <label htmlFor="clienteNombre" className="label-base">
              Nombre
            </label>
            <input
              ref={inputs["clienteNombre"]}
              id="clienteNombre"
              name="clienteNombre"
              placeholder="Nombre"
              value={data.clienteNombre ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-100">
            <label htmlFor="direccionPartida" className="label-base">
              Dirección Partida
            </label>
            <input
              id="direccionPartida"
              name="direccionPartida"
              placeholder="Dirección Partida"
              value={data.direccionPartida ?? ""}
              disabled
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-container-100">
          <label htmlFor="clienteDireccionId" className="label-base">
            Dirección Llegada
          </label>
          <select
            id="clienteDireccionId"
            name="clienteDireccionId"
            value={data.clienteDireccionId ?? ""}
            onChange={handleData}
            disabled={primer.tipo === "consultar"}
            className="input-base"
          >
            <option key="default" value="">
              SELECCIONAR
            </option>
            {direcciones?.map((x: IClienteDireccion) => (
              <option key={x.id} value={x.id}>
                {x.direccion}
              </option>
            ))}
          </select>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-40">
            <label htmlFor="motivoTrasladoId" className="label-base">
              Motivo
            </label>
            <select
              ref={inputs["motivoTrasladoId"]}
              id="motivoTrasladoId"
              name="motivoTrasladoId"
              value={data.motivoTrasladoId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {motivosTraslado.map((x: ICombo) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div
            className={
              data.motivoTrasladoId === "04"
                ? "input-base-container-33"
                : "input-base-container-75"
            }
          >
            <label htmlFor="motivoSustento" className="label-base">
              Sustento Motivo
            </label>
            <input
              id="motivoSustento"
              name="motivoSustento"
              placeholder="Sustento Motivo"
              value={data.motivoSustento ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
          <div className="input-base-container-40">
            <label htmlFor="ingresoEgresoStock" className="label-base">
              Entrada Salida Stock
            </label>
            <select
              ref={inputs["ingresoEgresoStock"]}
              id="ingresoEgresoStock"
              name="ingresoEgresoStock"
              value={data.ingresoEgresoStock ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {tipos.map((x: ITiposSumaResta) => (
                <option key={x.valor} value={x.valor}>
                  {x.valor}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-base-row">
          <div className="input-base-container-100">
            <label htmlFor="clienteDireccion" className="label-base">
              Dirección Llegada
            </label>
            <input
              id="clienteDireccion"
              name="clienteDireccion"
              placeholder="Dirección Llegada"
              value={data.clienteDireccion ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
          <div className="input-base-container-20">
            <label htmlFor="clienteDireccionId" className="label-base">
              Ubigeo Llegada
            </label>
            <input
              id="clienteDireccionId"
              name="clienteDireccionId"
              placeholder="Ubigeo Llegada"
              value={data.clienteDireccionId ?? ""}
              disabled
              className="input-base"
            />
          </div>
        </div>

        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="modalidadTransporteId" className="label-base">
              Modalidad Transporte
            </label>
            <select
              id="modalidadTransporteId"
              name="modalidadTransporteId"
              value={data.modalidadTransporteId}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {modalidadesTransporte?.map((x: ICombo) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-auto">
            {element.responsive === "full" && (
              <span className="label-base-checkbox">-</span>
            )}
            <CheckBox
              id="trasladoVehiculoM1L"
              value={data.trasladoVehiculoM1L}
              handleData={handleData}
              disabled={primer.tipo === "consultar"}
              label="Traslado vehículo M1L"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="transportistas" className="label-base">
              {data.modalidadTransporteId !== "02"
                ? "Transportistas"
                : "Conductores"}
            </label>
            <div className="input-base-container-button">
              <input
                ref={inputs["transportistas"]}
                id="transportistas"
                name="transportistas"
                placeholder="Adjuntar Transportistas..."
                value={data.transportistas ? data.transportistas.length : "0"}
                disabled
                className={
                  primer.tipo !== "consultar" &&
                  data.modalidadTransporteId !== ""
                    ? "input-base-button"
                    : "input-base"
                }
              />
              {primer.tipo !== "consultar" &&
                data.modalidadTransporteId !== "" && (
                  <button
                    ref={inputs["buttonTransportistaHelp"]}
                    id="buttonTransportistaHelp"
                    name="buttonTransportistaHelp"
                    title={`Presione [ALT + W] para adjuntar ${
                      data.modalidadTransporteId === "01"
                        ? "transportista"
                        : "conductores"
                    }.`}
                    accessKey="w"
                    onClick={() =>
                      handleOpenModal(
                        setGlobalContext,
                        "buttonTransportistaHelp"
                      )
                    }
                    onKeyDown={handleKeyDown}
                    disabled={
                      data.modalidadTransporteId === "01" &&
                      data.transportistas.length > 0
                    }
                    className="button-base-anidado button-base-bg-primary"
                  >
                    <TbDeviceIpadSearch
                      strokeWidth={2}
                      size="2rem"
                      className="button-base-icon"
                    />
                  </button>
                )}
            </div>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="vehiculos" className="label-base">
              Vehículos
            </label>
            <div className="input-base-container-button">
              <input
                ref={inputs["vehiculos"]}
                id="vehiculos"
                name="vehiculos"
                placeholder="Adjuntar Vehículos..."
                value={data.vehiculos ? data.vehiculos.length : "0"}
                disabled
                className={
                  primer.tipo !== "consultar" &&
                  data.modalidadTransporteId === "02"
                    ? "input-base-button"
                    : "input-base"
                }
              />
              {primer.tipo !== "consultar" &&
                data.modalidadTransporteId === "02" && (
                  <button
                    ref={inputs["buttonVehiculoHelp"]}
                    id="buttonVehiculoHelp"
                    name="buttonVehiculoHelp"
                    title="Presione [ALT + E] para adjuntar vehículos."
                    accessKey="e"
                    onClick={() =>
                      handleOpenModal(setGlobalContext, "buttonVehiculoHelp")
                    }
                    onKeyDown={handleKeyDown}
                    className="button-base-anidado button-base-bg-primary"
                  >
                    <TbDeviceIpadSearch
                      strokeWidth={2}
                      size="2rem"
                      className="button-base-icon"
                    />
                  </button>
                )}
            </div>
          </div>
          <div className="input-base-container-20">
            <label htmlFor="pesoBrutoTotal" className="label-base">
              Peso Bruto Total KG
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="pesoBrutoTotal"
              name="pesoBrutoTotal"
              placeholder="Peso Bruto Total KG"
              value={data.pesoBrutoTotal}
              onChange={handleData}
              autoComplete="off"
              min={0}
              step={0.1}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="oficina" className="label-base">
              Oficina
            </label>
            <input
              id="oficina"
              name="oficina"
              placeholder="Oficina"
              value={data.oficina ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="almacen" className="label-base">
              Almacen
            </label>
            <input
              id="almacen"
              name="almacen"
              placeholder="Almacen"
              value={data.almacen ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="almacenOrigen" className="label-base">
              Almacen Origen
            </label>
            <input
              id="almacenOrigen"
              name="almacenOrigen"
              placeholder="Almacen Origen"
              value={data.almacenOrigen ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-50">
            <label htmlFor="numeroFactura" className="label-base">
              Factura N°
            </label>
            <input
              id="numeroFactura"
              name="numeroFactura"
              placeholder="Factura N°"
              value={data.numeroFactura ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
          <div className="input-base-container-50">
            <label htmlFor="ordenCompra" className="label-base">
              Orden Compra
            </label>
            <input
              id="ordenCompra"
              name="ordenCompra"
              placeholder="Orden Compra"
              value={data.ordenCompra ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-100">
            <label htmlFor="observacion" className="label-base">
              Observación
            </label>
            <input
              id="observacion"
              name="observacion"
              placeholder="Observación"
              value={data.observacion ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
          <div className="input-base-container-20">
            <label htmlFor="costoMinimo" className="label-base">
              Costo Minimo
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="costoMinimo"
              name="costoMinimo"
              placeholder="Costo Minimo"
              value={data.costoMinimo}
              onChange={handleData}
              autoComplete="off"
              min={0}
              step={0.1}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-auto">
            {element.responsive === "full" && (
              <span className="label-base-checkbox">-</span>
            )}
            <CheckBox
              id="enviarSucursal"
              value={data.enviarSucursal}
              handleData={handleData}
              disabled={primer.tipo === "consultar"}
              label="Enviar a Sucursal"
            />
          </div>
          <div className="input-base-container-auto">
            {element.responsive === "full" && (
              <span className="label-base-checkbox">-</span>
            )}
            <CheckBox
              id="afectarStock"
              value={data.afectarStock}
              handleData={handleData}
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              label="Afectar Stock"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuiaRemisionCabecera;
