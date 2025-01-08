import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { BasicKeyHandler, ButtonFooter, ModalForm } from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import { IDepartamento, IDistrito, IDistritoTablas, IProvincia, defaultDistritoTablas } from "../../../../../models";
import { handleInputType, handleSetInputs } from "../../../../../util";

const DistritoModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form } = globalContext;
  const { primer } = modal;
  const { departamentos }: IDistritoTablas = form.tablas || defaultDistritoTablas;
  const [data, setData] = useState<IDistrito>(form.data);
  const inputs = useFocus("distritoId", "departamentoId");
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

    setData((x) => {
      const newData = { ...x, [name]: value };

      if (name === "departamentoId") {
        newData.provinciaId = "";
      }
      return newData;
    });
  };

  const provincias = useMemo(() => {
    const departamento = departamentos.find((x) => x.id === data.departamentoId);
    return departamento?.provincias ?? [];
  }, [data.departamentoId, departamentos]);
  //#endregion

  return (
    <>
      {departamentos.length > 0 && (
        <BasicKeyHandler selector="distrito-modal">
          <ModalForm title={`${primer.tipo} distrito`} className="distrito-modal md:min-w-[50%]">
            <div className="modal-base-content">
              <div className="input-base-row">
                <div className="input-base-container-33">
                  <label htmlFor="distritoId" className="label-base">
                    Código
                  </label>
                  <input
                    ref={inputs["distritoId"]}
                    id="distritoId"
                    name="distritoId"
                    placeholder="Código"
                    value={data.distritoId}
                    onChange={handleData}
                    autoComplete="off"
                    autoFocus
                    maxLength={2}
                    disabled={primer.tipo !== "registrar"}
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
                  <label htmlFor="provinciaId" className="label-base">
                    Provincia
                  </label>
                  <select
                    id="provinciaId"
                    name="provinciaId"
                    value={data.provinciaId}
                    onChange={handleData}
                    disabled={primer.tipo !== "registrar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {provincias.map((x: IProvincia) => (
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

            <ButtonFooter data={data} inputFocus={primer.tipo === "registrar" ? "distritoId" : "departamentoId"} />
          </ModalForm>
        </BasicKeyHandler>
      )}
    </>
  );
};

export default DistritoModal;
