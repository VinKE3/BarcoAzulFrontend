import { ChangeEvent } from "react";
import { useGlobalContext } from "../../../../../../../hooks";

import {
  ICuentaPorPagar,
} from "../../../../../../../models";

interface IProps {
  data: ICuentaPorPagar;
  handleData: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => Promise<void> | void;
}
const CuentaPorPagarCabecera: React.FC<IProps> = ({ data, handleData }) => {
  //#region useState
  const { globalContext } = useGlobalContext();
  const { modal} = globalContext;
  const { primer } = modal;
  //#endregion
  return (
    <div className="form-base-container cuenta-por-pagar-form">
      <div className="modal-base-content">
        <div className="input-base-row">
          <div className="input-base-container-25">
            <label htmlFor="tipoDocumento" className="label-base">
              Tipo Documento
            </label>
            <input
              id="tipoDocumento"
              name="tipoDocumento"
              placeholder="tipoDocumento"
              value={data.tipoDocumento.descripcion ?? ""}
              disabled
              className="input-base"
            />
          </div>
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
            <label htmlFor="fechaContable" className="label-base">
              Fecha
            </label>
            <input
              type="date"
              id="fechaContable"
              name="fechaContable"
              value={data.fechaContable}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
          <div className="input-base-container-25">
            <label htmlFor="monedaId" className="label-base">
              Moneda
            </label>
            <input
              id="monedaId"
              name="monedaId"
              value={data.monedaId}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-100">
            <label htmlFor="nombre" className="label-base">
              Razón Social
            </label>
            <input
              id="nombre"
              name="nombre"
              placeholder="Razón Social"
              value={data.proveedor.nombre ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="total" className="label-base">
              Total a Pagar
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="total"
              name="total"
              placeholder="total"
              value={data.total ?? ""}
              onChange={handleData}
              autoComplete="off"
              min={0}
              step={1}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="abonado" className="label-base">
              Abonado
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="abonado"
              name="abonado"
              placeholder="abonado"
              value={data.abonado ?? ""}
              onChange={handleData}
              autoComplete="off"
              min={0}
              step={1}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="saldo" className="label-base">
              Saldo Total
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="saldo"
              name="saldo"
              placeholder="saldo"
              value={data.saldo ?? ""}
              onChange={handleData}
              autoComplete="off"
              min={0}
              step={1}
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

export default CuentaPorPagarCabecera;
