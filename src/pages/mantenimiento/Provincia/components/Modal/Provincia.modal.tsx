import { ChangeEvent, useEffect, useState } from "react";
import { BasicKeyHandler, ButtonFooter, ModalForm } from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import { IDepartamento, IProvincia, IProvinciaTablas, defaultProvinciaTablas } from "../../../../../models";
import { handleInputType, handleSetInputs } from "../../../../../util";

const ProvinciaModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form } = globalContext;
  const { primer } = modal;
  const { departamentos }: IProvinciaTablas = form.tablas || defaultProvinciaTablas;
  const [data, setData] = useState<IProvincia>(form.data);
  const inputs = useFocus("provinciaId", "departamentoId");
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);
  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setData((x) => ({ ...x, [name]: value }));
  };
  //#endregion

  return (
    <>
      {departamentos.length > 0 && (
        <BasicKeyHandler selector="provincia-modal">
          <ModalForm title={`${primer.tipo} provincia`} className="provincia-modal md:min-w-[50%]">
            <div className="modal-base-content">
              <div className="input-base-row">
                <div className="input-base-container-33">
                  <label htmlFor="provinciaId" className="label-base">
                    Código
                  </label>
                  <input
                    ref={inputs["provinciaId"]}
                    id="provinciaId"
                    name="provinciaId"
                    placeholder="Código"
                    value={data.provinciaId}
                    onChange={handleData}
                    autoComplete="off"
                    autoFocus
                    maxLength={2}
                    disabled={primer.tipo != "registrar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-100">
                  <label htmlFor="departamentoId" className="label-base">
                    Departamento
                  </label>
                  <select
                    ref={inputs["departamentoId"]}
                    id="departamentoId"
                    name="departamentoId"
                    value={data.departamentoId}
                    onChange={handleData}
                    autoFocus={primer.tipo !== "registrar"}
                    disabled={primer.tipo !== "registrar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {departamentos.map((x: IDepartamento) => (
                      <option key={x.id} value={x.id}>
                        {x.nombre}
                      </option>
                    ))}
                  </select>
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

            <ButtonFooter data={data} inputFocus={primer.tipo === "registrar" ? "provinciaId" : "departamentoId"} />
          </ModalForm>
        </BasicKeyHandler>
      )}
    </>
  );
};

export default ProvinciaModal;
