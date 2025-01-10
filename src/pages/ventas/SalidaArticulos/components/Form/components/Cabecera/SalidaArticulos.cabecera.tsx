/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbDeviceIpadSearch } from "react-icons/tb";
import { useGlobalContext } from "../../../../../../../hooks";
import {
  defaultSalidaArticulosTablas,
  IArticulosPersonal,
  ISalidaArticulos,
  ISalidaArticulosTablas,
  IMoneda,
  IMotivoArticulos,
} from "../../../../../../../models";
import { handleHelpModal } from "../../../../../../../util";

interface IProps {
  data: ISalidaArticulos;
  handleData: (x: any) => Promise<void> | void;
  handleGetTipoCambio: (retorno: boolean) => Promise<number>;
}
const SalidaArticulosCabecera: React.FC<IProps> = ({
  data,
  handleData,
  handleGetTipoCambio,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, modal, form, extra } = globalContext;
  const { primer } = modal;
  const { element } = extra;

  const { personal, monedas, motivos }: ISalidaArticulosTablas =
    form.tablas || defaultSalidaArticulosTablas;
  const { inputs } = element;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key !== "Enter") return;

    e.stopPropagation();
    handleHelpModal(setGlobalContext, "proveedorFind");
  };
  //#endregion
  return (
    <div className="form-base-container salida-articulos-form">
      <div className="modal-base-content">
        <div className="input-base-row">
          <div className="input-base-container-25">
            <label htmlFor="serie" className="label-base">
              Serie
            </label>
            <input
              id="serie"
              name="serie"
              placeholder="Serie"
              value={data.serie ?? ""}
              disabled
              className="input-base"
            />
          </div>
          <div className="input-base-container-50">
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
              Fecha
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
        </div>
        <div className="input-base-row">
          <div className="input-base-container-50">
            <label htmlFor="personalId" className="label-base">
              Encargado
            </label>
            <select
              ref={inputs["personalId"]}
              id="personalId"
              name="personalId"
              value={data.personalId ?? ""}
              onChange={handleData}
              autoFocus
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {personal.map((x: IArticulosPersonal) => (
                <option key={x.id} value={x.id}>
                  {x.nombres}
                </option>
              ))}
            </select>
          </div>
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
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="motivoId" className="label-base">
              Motivo Ingreso
            </label>
            <select
              ref={inputs["motivoId"]}
              id="motivoId"
              name="motivoId"
              value={data.motivoId ?? ""}
              onChange={handleData}
              autoFocus
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {motivos.map((x: IMotivoArticulos) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
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
                  primer.tipo !== "registrar"
                    ? "input-base"
                    : "input-base-button"
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
        </div>
        <div className="input-base-row">
          <div className="input-base-container-100">
            <label htmlFor="proveedorDireccion" className="label-base">
              Concepto
            </label>
            <input
              id="proveedorDireccion"
              name="proveedorDireccion"
              placeholder="Concepto"
              value={data.proveedorDireccion ?? ""}
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
        </div>
      </div>
    </div>
  );
};

export default SalidaArticulosCabecera;
