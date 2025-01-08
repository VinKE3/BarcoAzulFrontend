import React, { ChangeEvent, useMemo } from "react";
import { BasicKeyHandler, ButtonFooter } from "../../../components";
import { useGlobalContext } from "../../../hooks";
import {
  defaultConfiguracionTablas,
  IConfiguracion,
  IConfiguracionTablas,
  IDepartamento,
  IDistrito,
  IProvincia,
} from "../../../models";

interface IProps {
  dataGeneral: IConfiguracion;
  handleDataGeneral: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const EmpresaDatosTab: React.FC<IProps> = ({
  dataGeneral,
  handleDataGeneral,
}) => {
  //#region useState
  const { globalContext } = useGlobalContext();
  const { modal, form, extra } = globalContext;
  const { primer } = modal;
  const { element } = extra;
  const { departamentos } =
    (form.tablas as IConfiguracionTablas) || defaultConfiguracionTablas;
  const { inputs } = element;
  //#endregion

  //#region useEffect
  //#endregion

  //#region Funciones
  const provincias = useMemo(() => {
    const departamento = departamentos.find(
      (x) => x.id === dataGeneral.departamentoId
    );
    return departamento?.provincias ?? [];
  }, [dataGeneral.departamentoId, departamentos]);

  const distritos = useMemo(() => {
    const provincia = provincias.find((x) => x.id === dataGeneral.provinciaId);
    return provincia?.distritos ?? [];
  }, [dataGeneral.provinciaId, provincias]);
  //#endregion

  return (
    <>
      {departamentos.length > 0 && (
        <div className="tab-base-container">
          <BasicKeyHandler selector="empresa-datos">
            <div className="empresa-datos">
              <div className="input-base-row">
                <div className="input-base-container-33">
                  <label
                    htmlFor="numeroDocumentoIdentidad"
                    className="label-base"
                  >
                    Número Documento
                  </label>
                  <input
                    ref={inputs["numeroDocumentoIdentidad"]}
                    id="numeroDocumentoIdentidad"
                    name="numeroDocumentoIdentidad"
                    placeholder="Número Documento Identidad"
                    value={dataGeneral.numeroDocumentoIdentidad}
                    onChange={handleDataGeneral}
                    autoComplete="off"
                    autoFocus
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-100">
                  <label htmlFor="nombre" className="label-base">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    value={dataGeneral.nombre}
                    onChange={handleDataGeneral}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-100">
                  <label htmlFor="direccion" className="label-base">
                    Dirección
                  </label>
                  <input
                    id="direccion"
                    name="direccion"
                    placeholder="Dirección"
                    value={dataGeneral.direccion ?? ""}
                    onChange={handleDataGeneral}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-33">
                  <label htmlFor="departamentoId" className="label-base">
                    Departamento
                  </label>
                  <select
                    id="departamentoId"
                    name="departamentoId"
                    value={dataGeneral.departamentoId ?? ""}
                    onChange={handleDataGeneral}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {departamentos.map((departamento: IDepartamento) => (
                      <option key={departamento.id} value={departamento.id}>
                        {departamento.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-base-container-33">
                  <label htmlFor="provinciaId" className="label-base">
                    Provincia
                  </label>
                  <select
                    id="provinciaId"
                    name="provinciaId"
                    value={dataGeneral.provinciaId ?? ""}
                    onChange={handleDataGeneral}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {provincias.map((provincia: IProvincia) => (
                      <option key={provincia.id} value={provincia.id}>
                        {provincia.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-base-container-33">
                  <label htmlFor="distritoId" className="label-base">
                    Distrito
                  </label>
                  <select
                    id="distritoId"
                    name="distritoId"
                    value={dataGeneral.distritoId ?? ""}
                    onChange={handleDataGeneral}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {distritos.map((distrito: IDistrito) => (
                      <option key={distrito.id} value={distrito.id}>
                        {distrito.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-33">
                  <label htmlFor="correoElectronico" className="label-base">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="correoElectronico"
                    name="correoElectronico"
                    placeholder="correo.electrónico@....com"
                    value={dataGeneral.correoElectronico ?? ""}
                    onChange={handleDataGeneral}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-33">
                  <label htmlFor="telefono" className="label-base">
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    placeholder="Teléfono"
                    value={dataGeneral.telefono ?? ""}
                    onChange={handleDataGeneral}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-33">
                  <label htmlFor="celular" className="label-base">
                    Celular
                  </label>
                  <input
                    id="celular"
                    name="celular"
                    placeholder="Celular 1"
                    value={dataGeneral.celular ?? ""}
                    onChange={handleDataGeneral}
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
                    value={dataGeneral.observacion ?? ""}
                    onChange={handleDataGeneral}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-50">
                  <label htmlFor="filtroFechaInicio" className="label-base">
                    Desde
                  </label>
                  <input
                    type="date"
                    id="filtroFechaInicio"
                    name="filtroFechaInicio"
                    value={dataGeneral.filtroFechaInicio}
                    onChange={handleDataGeneral}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
                  <label htmlFor="filtroFechaFin" className="label-base">
                    Hasta
                  </label>
                  <input
                    type="date"
                    id="filtroFechaFin"
                    name="filtroFechaFin"
                    value={dataGeneral.filtroFechaFin}
                    onChange={handleDataGeneral}
                    className="input-base"
                  />
                </div>
              </div>

              <ButtonFooter
                data={dataGeneral}
                clearForm={false}
                showClose={false}
                inputFocus="numeroDocumentoIdentidad"
              />
            </div>
          </BasicKeyHandler>
        </div>
      )}
    </>
  );
};
export default EmpresaDatosTab;
