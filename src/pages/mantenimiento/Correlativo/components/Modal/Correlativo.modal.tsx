import { ChangeEvent, useEffect, useState } from "react";
import {
  BasicKeyHandler,
  ButtonFooter,
  ModalForm,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  ICombo,
  ICorrelativo,
  ICorrelativoTablas,
  defaultCorrelativoTablas,
} from "../../../../../models";
import { handleInputType, handleSetInputs } from "../../../../../util";

const CorrelativoModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form } = globalContext;
  const { primer } = modal;
  const { tiposDocumento }: ICorrelativoTablas =
    form.tablas || defaultCorrelativoTablas;
  const [data, setData] = useState<ICorrelativo>(form.data);
  const inputs = useFocus("tipoDocumentoId", "numero");
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);
  //#endregion

  //#region Funciones
  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setData((x) => ({ ...x, [name]: value }));
  };
  //#endregion

  return (
    <BasicKeyHandler selector="correlativo-modal">
      <ModalForm
        title={`${primer.tipo} correlativo`}
        className="correlativo-modal md:min-w-[50%]"
      >
        <div className="form-base">
          <div className="input-base-row">
            <div className="input-base-container-33">
              <label htmlFor="tipoDocumentoId" className="label-base">
                Tipo Documento
              </label>
              <select
                ref={inputs["tipoDocumentoId"]}
                id="tipoDocumentoId"
                name="tipoDocumentoId"
                value={data.tipoDocumentoId}
                onChange={handleData}
                autoFocus
                disabled={primer.tipo !== "registrar"}
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
              <label htmlFor="serie" className="main-label">
                Serie
              </label>
              <input
                id="serie"
                name="serie"
                placeholder="Serie"
                value={data.serie}
                onChange={handleData}
                autoComplete="off"
                disabled={primer.tipo !== "registrar"}
                className="input-base"
              />
            </div>
            <div className="input-base-container-33">
              <label htmlFor="numero" className="main-label">
                Número
              </label>
              <input
                type="number"
                inputMode="numeric"
                ref={inputs["numero"]}
                id="numero"
                name="numero"
                placeholder="Número"
                value={data.numero}
                onChange={handleData}
                autoComplete="off"
                min={0}
                autoFocus={primer.tipo === "modificar"}
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
          </div>
        </div>
        <ButtonFooter
          data={data}
          inputFocus={
            primer.tipo === "registrar" ? "tipoDocumentoId" : "numero"
          }
        />
      </ModalForm>
    </BasicKeyHandler>
  );
};

export default CorrelativoModal;
