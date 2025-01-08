/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobalContext } from "../../../../../../../hooks";
import {
  IArticulosPersonal,
  IEntradaArticulos,
  IEntradaArticulosTablas,
  defaultEntradaArticulosTablas,
} from "../../../../../../../models";
interface IProps {
  data: IEntradaArticulos;
  handleData: (x: any) => Promise<void> | void;
}
const EntradaArticulosCabecera: React.FC<IProps> = ({ data, handleData }) => {
  //#region useState
  const { globalContext } = useGlobalContext();
  const { modal, form, extra } = globalContext;
  const { primer } = modal;
  const { element } = extra;

  const { personal }: IEntradaArticulosTablas =
    form.tablas || defaultEntradaArticulosTablas;
  const { inputs } = element;
  //#endregion
  return (
    <div className="form-base-container guia-remision-form">
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
          {/* <div className="input-base-container-25">
            <label htmlFor="fechaIngreso" className="label-base">
              Ingreso
            </label>
            <input
              type="date"
              id="fechaIngreso"
              name="fechaIngreso"
              value={data.fechaIngreso}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div> */}
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
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

export default EntradaArticulosCabecera;
