/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState, useEffect } from "react";
import { TbDeviceIpadSearch } from "react-icons/tb";
import { FaMoneyBillTransfer, FaPaste } from "react-icons/fa6";
import { useGlobalContext } from "../../../../../../../hooks";
import { CheckBox } from "../../../../../../../components";
import {
  ICombo,
  IMoneda,
  IClienteDireccion,
  IDocumentoVenta,
  IDocumentoVentaTablas,
  ITiposPago,
  IPorcentajes,
  IPersonal,
  ITipoVenta,
  defaultDocumentoVentaTablas,
  ICuentaCorrienteBancaria,
  IMotivosNota,
  defaultDocumentoVenta,
  ISerie,
  IDocumentoVentaPendiente,
} from "../../../../../../../models";
import {
  handleHelpModal,
  helpModalMap,
  handleSelectCuentaBancaria,
  handleSelectPersonal,
  handleClearMensajes,
  handleFocus,
  handleToast,
  handleOpenModal,
} from "../../../../../../../util";
import { BsFillCalculatorFill, BsFillEraserFill } from "react-icons/bs";
import { PiFileDoc } from "react-icons/pi";
interface IProps {
  data: IDocumentoVenta;
  setData: React.Dispatch<React.SetStateAction<IDocumentoVenta>>;
  handleData: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => Promise<void> | void;
  handleGetTipoCambio: (retorno: boolean) => Promise<number>;
  handleNumero: (x: any) => Promise<void> | void;
}
const DocumentoVentaCabecera: React.FC<IProps> = ({
  data,
  setData,
  handleData,
  handleGetTipoCambio,
  handleNumero,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, modal, form, extra } = globalContext;
  const { primer } = modal;
  const {
    tiposDocumento,
    vendedores,
    direcciones,
    tiposVenta,
    tiposCobro,
    cuentasCorrientes,
    monedas,
    porcentajesIGV,
    series,
    motivosNota,
    documentosPendientes,
  }: IDocumentoVentaTablas = form.tablas || defaultDocumentoVentaTablas;
  const { element } = extra;
  const { inputs } = element;
  const [filterMotivosVenta, setFilterMotivosVenta] = useState<IMotivosNota[]>(
    []
  );

  //#region Funciones

  const handleClearNotaPedido = (): void => {
    setData(defaultDocumentoVenta);
    handleFocus(inputs["tipoDocumentoId"]);
    handleToast("warning", "Nota de pedido borrada, vuelva a ingresar datos.");
  };

  const handleClearCuota = (): void => {
    setData((x) => ({ ...x, cuotas: [] }));
  };

  const handleOpenModal2 = async (origen: string): Promise<void> => {
    if (origen in helpModalMap) {
      await handleClearMensajes(setGlobalContext);
      handleHelpModal(setGlobalContext, helpModalMap[origen]);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key !== "Enter") return;

    e.stopPropagation();
    handleHelpModal(setGlobalContext, "proveedorFind");
  };

  //#endregion

  useEffect(() => {
    if (data.tipoDocumentoId === "07" || data.tipoDocumentoId === "08") {
      const motivosFiltrados = motivosNota.filter(
        (motivo) => motivo.tipoDocumentoId === data.tipoDocumentoId
      );
      setFilterMotivosVenta(motivosFiltrados);
    } else {
      setFilterMotivosVenta([]);
    }
  }, [data.tipoDocumentoId, motivosNota]);

  return (
    <div className="form-base-container nota-pedido-form">
      <div className="modal-base-content">
        <div className="input-base-row">
          <div className="input-base-container-20">
            <label htmlFor="id" className="label-base">
              Documento N°
            </label>
            <input
              id="id"
              name="id"
              placeholder="Documento N°"
              value={data.id ?? ""}
              disabled
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="tipoDocumentoId" className="label-base">
              Tipo Documento
            </label>
            <select
              ref={inputs["tipoDocumentoId"]}
              id="tipoDocumentoId"
              name="tipoDocumentoId"
              value={data.tipoDocumentoId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
              autoFocus
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {tiposDocumento.map((x: ICombo) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="serie" className="label-base">
              Serie
            </label>
            <select
              id="serie"
              name="serie"
              value={data.serie ?? ""}
              onChange={handleData}
              disabled={primer.tipo !== "registrar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {series
                .filter(
                  (x: ISerie) => x.tipoDocumentoId === data.tipoDocumentoId
                )
                .sort((x: ISerie, y: ISerie) => x.serie.localeCompare(y.serie))
                .map((x: ISerie, index) => (
                  <option
                    key={x.tipoDocumentoId + x.serie + index}
                    value={x.serie}
                  >
                    {x.serie}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="numero" className="label-base">
              Número
            </label>
            <input
              id="numero"
              name="numero"
              placeholder="Número"
              value={data.numero ?? ""}
              onChange={handleData}
              onBlur={handleNumero}
              autoComplete="off"
              maxLength={10}
              disabled={true}
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="fechaEmision" className="label-base">
              F. Emisión
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
          <div className="input-base-container-33">
            <label htmlFor="fechaVencimiento" className="label-base">
              F. Vencimiento
            </label>
            <input
              type="date"
              id="fechaVencimiento"
              name="fechaVencimiento"
              value={data.fechaVencimiento}
              onChange={handleData}
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
        </div>

        <div className="input-base-row">
          <div className="input-base-container-100">
            <label htmlFor="notaPedido" className="label-base">
              Nota de Pedido
            </label>
            <div className="input-base-container-button">
              <input
                id="notaPedido"
                name="notaPedido"
                placeholder="Adjuntar Nota de Pedido..."
                value={data.numeroPedido ?? ""}
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
                    id="buttonClearNotaPedido"
                    name="buttonClearNotaPedido"
                    title="Presione [ALT + A] para borrar nota de pedido."
                    accessKey="a"
                    onClick={handleClearNotaPedido}
                    disabled={data.numeroPedido === null}
                    className="button-base-anidado-plano button-base-bg-red"
                  >
                    <BsFillEraserFill
                      size="2rem"
                      className="button-base-icon"
                    />
                  </button>
                  <button
                    id="buttonNotaPedidoFind"
                    name="buttonNotaPedidoFind"
                    title="Presione [ALT + S] para adjuntar nota de pedido."
                    accessKey="s"
                    onClick={() =>
                      handleOpenModal(setGlobalContext, "buttonNotaPedidoFind")
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
                  onClick={() => handleOpenModal2("buttonClienteFind")}
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
            <label htmlFor="clienteDireccionId" className="label-base">
              Dirección
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
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="personalId" className="label-base">
              Vendedor
            </label>
            <select
              id="personalId"
              name="personalId"
              value={data.personalId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {vendedores.map((x: IPersonal) => (
                <option key={x.id} value={x.id}>
                  {handleSelectPersonal(x)}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="tipoVentaId" className="label-base">
              Tipo Venta
            </label>
            <select
              id="tipoVentaId"
              name="tipoVentaId"
              value={data.tipoVentaId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {tiposVenta.map((x: ITipoVenta) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="tipoCobroId" className="label-base">
              Tipo Cobro
            </label>
            <select
              ref={inputs["tipoCobroId"]}
              id="tipoCobroId"
              name="tipoCobroId"
              value={data.tipoCobroId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {tiposCobro
                .filter(
                  (x: ITiposPago) => x.tipoVentaCompraId === data.tipoVentaId
                )
                .map((x: ITiposPago) => (
                  <option key={x.id} value={x.id}>
                    {x.descripcion}
                  </option>
                ))}
            </select>
          </div>
          {(data.tipoCobroId === "CH" || data.tipoCobroId === "DE") && (
            <>
              <div className="input-base-container-40">
                <label htmlFor="cuentaCorrienteId" className="label-base">
                  Cta Cte
                </label>
                <select
                  id="cuentaCorrienteId"
                  name="cuentaCorrienteId"
                  value={data.cuentaCorrienteId ?? ""}
                  onChange={handleData}
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                >
                  <option key="default" value="">
                    SELECCIONAR
                  </option>
                  {cuentasCorrientes.map((x: ICuentaCorrienteBancaria) => (
                    <option
                      key={x.cuentaCorrienteId}
                      value={x.cuentaCorrienteId}
                    >
                      {handleSelectCuentaBancaria(x)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-base-container-20">
                <label htmlFor="numeroOperacion" className="label-base">
                  Número
                </label>
                <input
                  id="numeroOperacion"
                  name="numeroOperacion"
                  value={data.numeroOperacion ?? ""}
                  placeholder="Número"
                  onChange={handleData}
                  disabled={
                    primer.tipo === "consultar" || data.detalles.length > 0
                  }
                  className="input-base"
                />
              </div>
            </>
          )}
          {data.tipoCobroId === "CU" && (
            <div className="input-base-container-40">
              <label htmlFor="cuotas" className="label-base">
                Cuotas
              </label>
              <div className="input-base-container-button">
                <input
                  id="cuotas"
                  name="cuotas"
                  placeholder="Adjuntar Cuotas..."
                  value={data.cuotas.length}
                  disabled
                  className={
                    primer.tipo !== "registrar" || data.detalles.length === 0
                      ? "input-base"
                      : "input-base-button"
                  }
                />
                {primer.tipo !== "consultar" && data.detalles.length > 0 && (
                  <>
                    <button
                      id="buttonClearCuota"
                      name="buttonClearCuota"
                      title="Presione [ALT + Q] para borrar cuotas."
                      accessKey="q"
                      onClick={handleClearCuota}
                      disabled={data.cuotas.length === 0}
                      className="button-base-anidado-plano button-base-bg-red"
                    >
                      <BsFillEraserFill
                        size="2rem"
                        className="button-base-icon"
                      />
                    </button>
                    <button
                      id="buttonCuotaHelp"
                      name="buttonCuotaHelp"
                      title="Presione [ALT + W] para generar cuotas."
                      accessKey="w"
                      onClick={() =>
                        handleOpenModal(setGlobalContext, "buttonCuotaHelp")
                      }
                      className="button-base-anidado button-base-bg-primary"
                    >
                      <BsFillCalculatorFill
                        size="2rem"
                        className="button-base-icon"
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="monedaId" className="label-base">
              Moneda
            </label>
            <select
              id="monedaId"
              name="monedaId"
              value={data.monedaId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {monedas.map((x: IMoneda) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="tipoCambio" className="label-base">
              Tipo de Cambio
            </label>
            <div className="input-base-container-button">
              <input
                type="number"
                inputMode="numeric"
                ref={inputs["tipoCambio"]}
                id="tipoCambio"
                name="tipoCambio"
                value={data.tipoCambio}
                disabled
                className={
                  primer.tipo !== "consultar" && !api.loading
                    ? "input-base-button"
                    : "input-base"
                }
              />
              {primer.tipo !== "consultar" && !api.loading && (
                <button
                  id="buttonConsultarTipoCambio"
                  name="buttonConsultarTipoCambio"
                  title="Presione [ALT + Z] para consultar a SUNAT."
                  accessKey="z"
                  onClick={() => handleGetTipoCambio(false)}
                  onKeyDown={handleKeyDown}
                  disabled={data.detalles.length > 0}
                  className="button-base-anidado button-base-bg-primary"
                >
                  <FaMoneyBillTransfer
                    strokeWidth={2}
                    size="2rem"
                    className="button-base-icon"
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        {(data.tipoDocumentoId === "07" || data.tipoDocumentoId === "08") && (
          <>
            <div className="input-base-row">
              <div className="input-base-container-33">
                <label htmlFor="documentoReferenciaId" className="label-base">
                  Documento
                </label>
                <div className="input-base-container-button">
                  <select
                    id="documentoReferenciaId"
                    name="documentoReferenciaId"
                    value={data.documentoReferenciaId ?? ""}
                    onChange={handleData}
                    disabled={primer.tipo === "consultar"}
                    className="input-base-button"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {documentosPendientes?.map(
                      (x: IDocumentoVentaPendiente) => (
                        <option key={x.id} value={x.id}>
                          {x.numeroDocumento}
                        </option>
                      )
                    )}
                  </select>
                  {primer.tipo !== "consultar" &&
                    data.documentoReferenciaId && (
                      <button
                        id="buttonDocumentoPendienteHelp"
                        name="buttonDocumentoPendienteHelp"
                        title="Presione [ALT + V] para copiar detalle."
                        accessKey="v"
                        onClick={() =>
                          handleOpenModal(
                            setGlobalContext,
                            "buttonDocumentoPendienteHelp"
                          )
                        }
                        onKeyDown={handleKeyDown}
                        className="button-base-anidado button-base-bg-primary"
                      >
                        <FaPaste
                          strokeWidth={2}
                          size="2rem"
                          className="button-base-icon"
                        />
                      </button>
                    )}
                </div>
              </div>
              <div className="input-base-container-auto">
                {element.responsive === "full" && (
                  <span className="label-base-checkbox">-</span>
                )}
                <CheckBox
                  id="abonar"
                  value={data.abonar}
                  handleData={handleData}
                  disabled={primer.tipo === "consultar"}
                  label="Abonar"
                />
              </div>
              <div className="input-base-container-33">
                <label htmlFor="motivoNotaId" className="label-base">
                  Motivo
                </label>
                <select
                  id="motivoNotaId"
                  name="motivoNotaId"
                  value={data.motivoNotaId ?? ""}
                  onChange={handleData}
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                >
                  <option key="default" value="">
                    SELECCIONAR
                  </option>
                  {filterMotivosVenta.map((x: IMotivosNota) => (
                    <option key={x.id} value={x.id}>
                      {x.descripcion}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-base-container-33">
                <label htmlFor="fechaReferencia" className="label-base">
                  F. Referencia
                </label>
                <input
                  type="date"
                  id="fechaReferencia"
                  name="fechaReferencia"
                  value={data.fechaReferencia}
                  onChange={handleData}
                  disabled={
                    primer.tipo === "consultar" || data.detalles.length > 0
                  }
                  className="input-base"
                />
              </div>
              <div className="input-base-container-33">
                <label htmlFor="motivoSustento" className="label-base">
                  Motivo Sustento
                </label>
                <input
                  id="motivoSustento"
                  name="motivoSustento"
                  value={data.motivoSustento ?? ""}
                  placeholder="Motivo Sustento"
                  onChange={handleData}
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                />
              </div>
            </div>
          </>
        )}
        {data.tipoDocumentoId !== "07" && data.tipoDocumentoId !== "08" && (
          <div className="input-base-row">
            <div className="input-base-container-50">
              <label htmlFor="guiaRemision" className="label-base">
                Guía Remisión
              </label>
              <input
                id="guiaRemision"
                name="guiaRemision"
                value={data.guiaRemision ?? ""}
                placeholder="Guía Remisión"
                onChange={handleData}
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
            <div className="input-base-container-50">
              <label htmlFor="numeroPedido" className="label-base">
                Nota Pedido
              </label>
              <input
                id="numeroPedido"
                name="numeroPedido"
                value={data.numeroPedido ?? ""}
                placeholder="Nota Pedido"
                onChange={handleData}
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
          </div>
        )}
        <div className="input-base-container-100">
          <label htmlFor="orden" className="label-base">
            Orden de Compra
          </label>
          <input
            id="orden"
            name="orden"
            value={data.orden ?? ""}
            placeholder="Orden"
            onChange={handleData}
            disabled={primer.tipo === "consultar"}
            className="input-base"
          />
        </div>
        <div className="input-base-container-100">
          <label htmlFor="observacion" className="label-base">
            Observación
          </label>
          <input
            id="observacion"
            name="observacion"
            value={data.observacion ?? ""}
            placeholder="Observación"
            onChange={handleData}
            disabled={primer.tipo === "consultar"}
            className="input-base"
          />
        </div>
        <div className="input-base-row">
          <div className="input-base-container-auto">
            {element.responsive === "full" && (
              <span className="label-base-checkbox">-</span>
            )}
            <CheckBox
              id="incluyeIGV"
              value={data.incluyeIGV}
              handleData={handleData}
              disabled={
                primer.tipo === "consultar" ||
                data.tipoDocumentoId === "03" ||
                data.isOperacionGratuita
              }
              label="Incluye IGV"
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
              disabled={
                primer.tipo === "consultar" ||
                data.tipoDocumentoId === "07" ||
                data.tipoDocumentoId === "08" ||
                data.detalles.length > 0
              }
              label="Afectar Stock"
            />
          </div>
          <div className="input-base-container-auto">
            {element.responsive === "full" && (
              <span className="label-base-checkbox">-</span>
            )}
            <CheckBox
              id="isOperacionGratuita"
              value={data.isOperacionGratuita}
              handleData={handleData}
              disabled={primer.tipo === "consultar"}
              label="Operación Gratuita"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentoVentaCabecera;
