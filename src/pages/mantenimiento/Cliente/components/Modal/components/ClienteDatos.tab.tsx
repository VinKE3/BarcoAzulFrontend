import React, { ChangeEvent, useEffect, useMemo } from "react";
import { AiOutlineCloudServer } from "react-icons/ai";
import {
  BasicKeyHandler,
  ButtonFooter,
  CheckBox,
} from "../../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../../hooks";
import {
  defaultClienteTablas,
  ICliente,
  IClienteTablas,
  IDepartamento,
  IDistrito,
  IProvincia,
} from "../../../../../../models";
import {
  getConsultarRucDni,
  handleClearMensajes,
  handleFocus,
  handleInputType,
  handleSetErrorMensaje,
  handleSetInputs,
} from "../../../../../../util";

interface IProps {
  dataGeneral: ICliente;
  setDataGeneral: React.Dispatch<React.SetStateAction<ICliente>>;
}
const ClienteDatosTab: React.FC<IProps> = ({ dataGeneral, setDataGeneral }) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, modal, form } = globalContext;
  const { primer } = modal;
  const { departamentos }: IClienteTablas = form.tablas || defaultClienteTablas;
  const inputs = useFocus("tipoDocumentoIdentidadId", "nombre");
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
    setDataGeneral((x) => {
      const newData = { ...x, [name]: value };

      if (name === "departamentoId") {
        newData.provinciaId = "";
        newData.distritoId = "";
      } else if (name === "provinciaId") {
        newData.distritoId = "";
      } else if (name === "correoElectronico") {
        newData.correoElectronico = value === "" ? null : (value as string);
      }
      return newData;
    });
  };

  const handleConsultarRuc = async (): Promise<void> => {
    try {
      await handleClearMensajes(setGlobalContext);

      const params = new URLSearchParams({
        tipo: dataGeneral.tipoDocumentoIdentidadId == "1" ? "dni" : "ruc",
        numeroDocumentoIdentidad: dataGeneral.numeroDocumentoIdentidad,
      });

      const { numeroDocumentoIdentidad, nombre, direccion } =
        await getConsultarRucDni(globalContext, params);

      setDataGeneral((x) => ({
        ...x,
        numeroDocumentoIdentidad: numeroDocumentoIdentidad,
        nombre: nombre,
        direccionPrincipal: direccion,
      }));
      handleFocus(inputs["nombre"]);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, api.origen);
      handleFocus(inputs["tipoDocumentoIdentidadId"]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key === "Enter") {
      handleConsultarRuc();
    }
  };

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
        <BasicKeyHandler selector="cliente-datos">
          <div className="form-base cliente-datos">
            <div className="input-base-row">
              <div className="input-base-container-25">
                <label htmlFor="id" className="label-base">
                  Código
                </label>
                <input
                  id="id"
                  name="id"
                  placeholder="Código"
                  value={dataGeneral.id ?? ""}
                  onChange={handleData}
                  autoComplete="off"
                  disabled
                  className="input-base"
                />
              </div>

              <div className="input-base-container-33">
                <label
                  htmlFor="numeroDocumentoIdentidad"
                  className="label-base"
                >
                  Documento Identidad
                </label>
                <div className="input-base-container-button">
                  <input
                    id="numeroDocumentoIdentidad"
                    name="numeroDocumentoIdentidad"
                    placeholder="Documento Identidad"
                    value={dataGeneral.numeroDocumentoIdentidad}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className={
                      primer.tipo === "registrar" &&
                      (dataGeneral.tipoDocumentoIdentidadId === "1" ||
                        dataGeneral.tipoDocumentoIdentidadId === "6") &&
                      !api.loading
                        ? "input-base-button"
                        : "input-base"
                    }
                  />
                  {primer.tipo === "registrar" &&
                   
                    !api.loading && (
                      <button
                        id="buttonConsultarRUC"
                        name="buttonConsultarRUC"
                        title="Presione [ALT + C] para consultar a SUNAT."
                        accessKey="c"
                        onClick={handleConsultarRuc}
                        onKeyDown={handleKeyDown}
                        className="button-base-anidado button-base-bg-primary"
                      >
                        <AiOutlineCloudServer
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
                <label htmlFor="nombre" className="label-base">
                  Nombre
                </label>
                <input
                  ref={inputs["nombre"]}
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre"
                  value={dataGeneral.nombre ?? ""}
                  onChange={handleData}
                  autoComplete="off"
                  autoFocus={primer.tipo === "modificar"}
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                />
              </div>
            </div>

            <div className="input-base-row">
              <div className="input-base-container-100">
                <label htmlFor="direccionPrincipal" className="label-base">
                  Dirección
                </label>
                <input
                  id="direccionPrincipal"
                  name="direccionPrincipal"
                  placeholder="Dirección"
                  value={dataGeneral.direccionPrincipal ?? ""}
                  onChange={handleData}
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
                  onChange={handleData}
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
                  onChange={handleData}
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
                  onChange={handleData}
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
                  onChange={handleData}
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
                  onChange={handleData}
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
                  placeholder="Celular"
                  value={dataGeneral.celular ?? ""}
                  onChange={handleData}
                  autoComplete="off"
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                />
              </div>
            </div>
            <div className="input-base-row">
              <div className="input-base-container-33">
                <label htmlFor="codigoEstablecimiento" className="label-base">
                  Código Establecimiento
                </label>
                <input
                  id="codigoEstablecimiento"
                  name="codigoEstablecimiento"
                  placeholder="Código Establecimiento"
                  value={dataGeneral.codigoEstablecimiento ?? ""}
                  onChange={handleData}
                  autoComplete="off"
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                />
              </div>
              <div className="input-base-container-auto">
                <CheckBox
                  id="isAgenteRetencion"
                  value={dataGeneral.isAgenteRetencion}
                  handleData={handleData}
                  disabled={primer.tipo === "consultar"}
                  label="Agente Retención"
                />
              </div>
            </div>
            <ButtonFooter
              data={dataGeneral}
              inputFocus="numeroDocumentoIdentidad"
            />
          </div>
        </BasicKeyHandler>
      )}
    </>
  );
};

export default ClienteDatosTab;
