import { ChangeEvent, useEffect, useState } from "react";
import {
  BasicKeyHandler,
  ButtonFooter,
  ModalForm,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  ICombo,
  IEntidadBancaria,
  IEntidadBancariaTablas,
  defaultEntidadBancariaTablas,
} from "../../../../../models";
import { handleInputType, handleSetInputs } from "../../../../../util";

const EntidadBancariaModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form } = globalContext;
  const { primer } = modal;
  const { tiposEntidadesBancarias }: IEntidadBancariaTablas =
    form.tablas || defaultEntidadBancariaTablas;
  const [data, setData] = useState<IEntidadBancaria>(form.data);
  const inputs = useFocus("tipo");
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
    <>
      {tiposEntidadesBancarias.length > 0 && (
        <BasicKeyHandler selector="entidad-bancaria-modal">
          <ModalForm
            title={`${primer.tipo} entidad bancaria`}
            className="entidad-bancaria-modal md:min-w-[50%]"
          >
            <div className="modal-base-content">
              <div className="input-base-row">
                <div className="input-base-container-25">
                  <label htmlFor="id" className="label-base">
                    Código
                  </label>
                  <input
                    id="id"
                    name="id"
                    placeholder="Código"
                    value={data.id}
                    disabled
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
                  <label htmlFor="tipo" className="label-base">
                    Tipo
                  </label>
                  <select
                    ref={inputs["tipo"]}
                    id="tipo"
                    name="tipo"
                    value={data.tipo}
                    onChange={handleData}
                    autoFocus
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {tiposEntidadesBancarias.map((x: ICombo) => (
                      <option key={x.id} value={x.id}>
                        {x.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-base-container-33">
                  <label htmlFor="ruc" className="label-base">
                    RUC
                  </label>
                  <input
                    id="ruc"
                    name="ruc"
                    placeholder="RUC"
                    value={data.ruc ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>
              <div className="input-base-row">
                <div className="input-base-container-100">
                  <label htmlFor="nombre" className="label-base">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    value={data.nombre}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>
            </div>
            <ButtonFooter data={data} inputFocus="tipo" />
          </ModalForm>
        </BasicKeyHandler>
      )}
    </>
  );
};

export default EntidadBancariaModal;
