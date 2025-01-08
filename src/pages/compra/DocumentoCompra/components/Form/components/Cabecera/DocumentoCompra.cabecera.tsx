/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState, useEffect } from "react";
import { TbDeviceIpadSearch } from "react-icons/tb";
import { useGlobalContext } from "../../../../../../../hooks";
import { CheckBox } from "../../../../../../../components";
import {
  ICombo,
  IMoneda,
  IDocumentoCompra,
  IDocumentoCompraTablas,
  ITiposPago,
  defaultDocumentoCompraTablas,
  IDocumentoCompraPorcentajes,
  IMotivosNota,
  IDocumentoCompraCuentaCorriente,
  IPorcentajes,
  IDocumentoCompraPendiente,
} from "../../../../../../../models";
import { handleHelpModal, get } from "../../../../../../../util";
import { FaMoneyBillTransfer } from "react-icons/fa6";

interface IProps {
  data: IDocumentoCompra;
  handleData: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => Promise<void> | void;
  handleGetTipoCambio: (retorno: boolean) => Promise<number>;
  handleNumero: (x: any) => Promise<void> | void;
  handleSerie: (x: any) => Promise<void> | void;
}
const DocumentoCompraCabecera: React.FC<IProps> = ({
  data,
  handleData,
  handleGetTipoCambio,
  handleNumero,
  handleSerie,
}) => {
  //#region useState
  const documentosPendientesListar: string =
    "Compra/DocumentoCompra/ListarPendientes";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, modal, form, extra } = globalContext;
  const { primer } = modal;
  const {
    tiposDocumento,
    tiposCompra,
    tiposPago,
    monedas,
    porcentajesIGV,
    porcentajesPercepcion,
    motivosNota,
    cuentasCorrientes,
  }: IDocumentoCompraTablas = form.tablas || defaultDocumentoCompraTablas;
  const { element } = extra;
  const { inputs } = element;

  const [filteredTiposPago, setFilteredTiposPago] = useState(tiposPago);
  const [filterMotivosVenta, setFilterMotivosVenta] = useState<IMotivosNota[]>(
    []
  );
  const [documentosCompraPendientes, setDocumentosCompraPendientes] = useState<
    IDocumentoCompraPendiente[]
  >([]);
  //#endregion

  //#region useEffect


  const simulateChangeEvent = (
    name: string,
    value: string
  ): React.ChangeEvent<HTMLSelectElement> => {
    return {
      target: { name, value } as EventTarget & HTMLSelectElement,
    } as React.ChangeEvent<HTMLSelectElement>;
  };

  const handleTipoCompraChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTipoCompraId = event.target.value;

    handleData(event);

    const pagosFiltrados = tiposPago.filter(
      (pago) => pago.tipoVentaCompraId === selectedTipoCompraId
    );
    setFilteredTiposPago(pagosFiltrados);

    handleData(simulateChangeEvent("tipoPagoId", ""));
  };

  const handleTipoPagoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTipoPagoId = event.target.value;

    handleData(event);

    const tipoPagoSeleccionado = tiposPago.find(
      (pago) => pago.id === selectedTipoPagoId
    );
    const plazo = tipoPagoSeleccionado?.plazo || 0;

    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + plazo);
    const nuevaFechaVencimiento = fechaActual.toISOString().split("T")[0];

    handleData(simulateChangeEvent("fechaVencimiento", nuevaFechaVencimiento));
  };
  //#endregion

  //#region Funciones
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key !== "Enter") return;

    e.stopPropagation();
    handleHelpModal(setGlobalContext, "proveedorFind");
  };

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

  //#endregion

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

  useEffect(() => {
    if (data.proveedorId) {
      getPendientes();
    }
  }, [data.proveedorId]);

  return (
    <div className="form-base-container documento-compra-form">
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
              Documento
            </label>
            <select
              ref={inputs["tipoDocumentoId"]}
              id="tipoDocumentoId"
              name="tipoDocumentoId"
              value={data.tipoDocumentoId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
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
            <input
              id="serie"
              name="serie"
              value={data.serie ?? ""}
              placeholder="Serie"
              onChange={handleData}
              onBlur={handleSerie}
              autoComplete="off"
              maxLength={4}
              autoFocus
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
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
              disabled={primer.tipo !== "registrar"}
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
              autoFocus
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="fechaContable" className="label-base">
              F. Contable
            </label>
            <input
              type="date"
              id="fechaContable"
              name="fechaContable"
              value={data.fechaContable}
              onChange={handleData}
              autoFocus
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
              autoFocus
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-container-100">
          <label htmlFor="proveedorNombre" className="label-base">
            Proveedor
          </label>
          <div className="input-base-container-button">
            <input
              id="proveedorNombre"
              name="proveedorNombre"
              placeholder="Proveedor"
              value={data.proveedorNombre ?? ""}
              disabled
              className={
                primer.tipo !== "registrar" ? "input-base" : "input-base-button"
              }
            />
            {primer.tipo === "registrar" && (
              <button
                ref={inputs["buttonProveedorFind"]}
                id="buttonProveedorFind"
                name="buttonProveedorFind"
                title="Presione [ALT + C] para adjuntar proveedor."
                accessKey="c"
                onClick={() =>
                  handleHelpModal(setGlobalContext, "proveedorFind")
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
          <label htmlFor="proveedorDireccion" className="label-base">
            Dirección
          </label>
          <input
            id="proveedorDireccion"
            name="proveedorDireccion"
            value={data.proveedorDireccion}
            placeholder="Dirección"
            onChange={handleData}
            autoFocus
            disabled={primer.tipo === "consultar" || data.detalles.length > 0}
            className="input-base"
          />
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="tipoCompraId" className="label-base">
              Tipo Compra
            </label>
            <select
              ref={inputs["tipoCompraId"]}
              id="tipoCompraId"
              name="tipoCompraId"
              value={data.tipoCompraId ?? ""}
              onChange={handleTipoCompraChange}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {tiposCompra.map((x: ICombo) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="tipoPagoId" className="label-base">
              Tipo Pago
            </label>
            <select
              ref={inputs["tipoPagoId"]}
              id="tipoPagoId"
              name="tipoPagoId"
              value={data.tipoPagoId ?? ""}
              onChange={handleTipoPagoChange}
              disabled={primer.tipo === "consultar" || data.tipoCompraId === ""}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {filteredTiposPago.map((x: ITiposPago) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          {(data.tipoPagoId === "CH" || data.tipoPagoId === "DE") && (
            <>
              <div className="input-base-container-33">
                <label htmlFor="numeroOperacion" className="label-base">
                  Número
                </label>
                <input
                  id="numeroOperacion"
                  name="numeroOperacion"
                  value={data.numeroOperacion}
                  placeholder="Número"
                  onChange={handleData}
                  autoFocus
                  disabled={
                    primer.tipo === "consultar" || data.detalles.length > 0
                  }
                  className="input-base"
                />
              </div>
              <div className="input-base-container-33">
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
                  {cuentasCorrientes.map(
                    (x: IDocumentoCompraCuentaCorriente) => (
                      <option
                        key={x.cuentaCorrienteId}
                        value={x.cuentaCorrienteId}
                      >
                        {x.numero}
                      </option>
                    )
                  )}
                </select>
              </div>
            </>
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
        <div className="input-base-container-100">
          <label htmlFor="guiaRemision" className="label-base">
            Guía Remisión
          </label>
          <input
            id="guiaRemision"
            name="guiaRemision"
            value={data.guiaRemision}
            placeholder="Dirección"
            onChange={handleData}
            autoFocus
            disabled={primer.tipo === "consultar" || data.detalles.length > 0}
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
            value={data.observacion}
            placeholder="Dirección"
            onChange={handleData}
            autoFocus
            disabled={primer.tipo === "consultar" || data.detalles.length > 0}
            className="input-base"
          />
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="subTotal" className="label-base">
              SubTotal
            </label>
            <input
              id="subTotal"
              name="subTotal"
              value={data.subTotal}
              placeholder="Dirección"
              onChange={handleData}
              autoFocus
              disabled
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="porcentajeIGV" className="label-base">
              IGV
            </label>
            <select
              ref={inputs["porcentajeIGV"]}
              id="porcentajeIGV"
              name="porcentajeIGV"
              value={data.porcentajeIGV ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {porcentajesIGV.map((x: IPorcentajes) => (
                <option key={x.porcentaje} value={x.porcentaje}>
                  {x.porcentaje}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="montoIGV" className="label-base">
              Monto IGV
            </label>
            <input
              id="montoIGV"
              name="montoIGV"
              value={data.montoIGV}
              placeholder="Monto IGV"
              onChange={handleData}
              autoFocus
              disabled
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="total" className="label-base">
              Total
            </label>
            <input
              id="total"
              name="total"
              value={data.total}
              placeholder="Dirección"
              onChange={handleData}
              autoFocus
              disabled
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="totalNeto" className="label-base">
              Total Neto
            </label>
            <input
              id="totalNeto"
              name="totalNeto"
              value={data.totalNeto}
              placeholder="Total Neto"
              onChange={handleData}
              autoFocus
              disabled
              className="input-base"
            />
          </div>
          <div className="input-base-container-auto">
            {element.responsive === "full" && (
              <span className="label-base-checkbox">-</span>
            )}
            <CheckBox
              id="incluyeIGV"
              value={data.incluyeIGV}
              handleData={handleData}
              disabled={primer.tipo === "consultar"}
              label="IGV"
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
              disabled={primer.tipo === "consultar"}
              label="Afectar Stock"
            />
          </div>
          {(data.tipoDocumentoId === "07" || data.tipoDocumentoId === "08") && (
            <div className="input-base-container-auto">
              {element.responsive === "full" && (
                <span className="label-base-checkbox">-</span>
              )}
              <CheckBox
                id="afectarPrecio"
                value={data.afectarPrecio}
                handleData={handleData}
                disabled={primer.tipo === "consultar"}
                label="Afectar Precio"
              />
            </div>
          )}
        </div>
        {(data.tipoDocumentoId === "07" || data.tipoDocumentoId === "08") && (
          <>
            <div className="input-base-row">
              <div className="input-base-container-auto">
                <label htmlFor="documentoReferenciaId" className="label-base">
                  Documento
                </label>
                <select
                  id="documentoReferenciaId"
                  name="documentoReferenciaId"
                  value={data.documentoReferenciaId ?? ""}
                  onChange={handleData}
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                >
                  <option key="default" value="">
                    SELECCIONAR
                  </option>
                  {documentosCompraPendientes.map(
                    (x: IDocumentoCompraPendiente) => (
                      <option key={x.id} value={x.id}>
                        {x.numeroDocumento}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="input-base-container-auto">
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
              <div className="input-base-container-auto">
                {element.responsive === "full" && (
                  <span className="label-base-checkbox">-</span>
                )}
                <CheckBox
                  id="abonar"
                  value={data.abonar}
                  handleData={handleData}
                  disabled={primer.tipo === "consultar"}
                  label="Afectar Stock"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentoCompraCabecera;
