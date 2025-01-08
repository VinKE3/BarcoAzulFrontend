import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { AiOutlineCloudServer } from "react-icons/ai";
import {
  BasicKeyHandler,
  ButtonFooter,
  CheckBox,
  ModalForm,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  ICombo,
  IDepartamento,
  IDistrito,
  IMoneda,
  IPersonal,
  IPersonalTablas,
  IProvincia,
  ITipoVenta,
  defaultPersonalTablas,
} from "../../../../../models";
import {
  getConsultarRucDni,
  handleClearMensajes,
  handleFocus,
  handleInputType,
  handleSetErrorMensaje,
  handleSetInputs,
} from "../../../../../util";

const PersonaModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, modal, form } = globalContext;
  const { primer } = modal;
  const {
    cargos,
    entidadesBancaria,
    monedas,
    tiposCuentaBancaria,
    sexos,
    estadosCivil,
    departamentos,
  }: IPersonalTablas = form.tablas || defaultPersonalTablas;
  const [data, setData] = useState<IPersonal>(form.data);
  const inputs = useFocus("cargoId", "numeroDocumentoIdentidad", "nombres");

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

    setData((x) => {
      const newData = { ...x, [name]: value };

      if (name === "departamentoId") {
        newData.provinciaId = "";
        newData.distritoId = "";
      } else if (name === "provinciaId") {
        newData.distritoId = "";
      } else if (name === "correoElectronico") {
        newData.correoElectronico = value === "" ? null : (value as string);
      } else if (name === "fechaNacimiento") {
        newData.fechaNacimiento = value === "" ? null : (value as string);
      }
      return newData;
    });
  };
  const handleConsultarRuc = async (): Promise<void> => {
    try {
      await handleClearMensajes(setGlobalContext);

      const params = new URLSearchParams({
        tipo: data.numeroDocumentoIdentidad?.length === 8 ? "dni" : "ruc",
        numeroDocumentoIdentidad: data.numeroDocumentoIdentidad ?? "",
      });

      const {
        numeroDocumentoIdentidad,
        apellidos,
        nombre,
        nombres,
        direccion,
      } = await getConsultarRucDni(globalContext, params);

      // Definir variables para almacenar los valores de apellido y nombre
      let apellidoPaterno = "";
      let apellidoMaterno = "";
      let nombresFinal = nombres ?? "";

      if (data.numeroDocumentoIdentidad?.length === 8) {
        // Si es DNI, asignar apellidos y nombres
        apellidoPaterno = apellidos?.split(" ")[0] ?? "";
        apellidoMaterno = apellidos?.split(" ")[1] ?? "";
        nombresFinal = nombres ?? "";
      } else {
        // Si es RUC, asignar todo el valor de "nombre" al campo "nombres"
        nombresFinal = nombre;
      }

      setData((x) => ({
        ...x,
        numeroDocumentoIdentidad,
        apellidoPaterno,
        apellidoMaterno,
        nombres: nombresFinal,
        direccion,
      }));
      handleFocus(inputs["nombres"]);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, api.origen);
      handleFocus(inputs["numeroDocumentoIdentidad"]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key === "Enter") {
      handleConsultarRuc();
    }
  };

  const provincias = useMemo(() => {
    const departamento = departamentos.find(
      (x) => x.id === data.departamentoId
    );
    return departamento?.provincias ?? [];
  }, [data.departamentoId, departamentos]);

  const distritos = useMemo(() => {
    const provincia = provincias.find((x) => x.id === data.provinciaId);
    return provincia?.distritos ?? [];
  }, [data.provinciaId, provincias]);

  //#endregion
  return (
    <>
      <BasicKeyHandler selector="personal-modal">
        <ModalForm
          title={`${primer.tipo} personal`}
          className="personal-modal md:min-w-[60%]"
        >
          <div className="modal-base-content">
            <div className="input-base-row">
              <div className="input-base-container-33">
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
              <div className="input-base-container-100">
                <label htmlFor="cargoId" className="label-base">
                  Cargo
                </label>
                <select
                  ref={inputs["cargoId"]}
                  id="cargoId"
                  name="cargoId"
                  value={data.cargoId ?? ""}
                  onChange={handleData}
                  autoFocus
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                >
                  <option key="default" value="">
                    SELECCIONAR
                  </option>
                  {cargos.map((x: ICombo) => (
                    <option key={x.id} value={x.id}>
                      {x.descripcion}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-base-container-auto">
                <label htmlFor="isActivo" className="label-base">
                  Estado
                </label>
                <CheckBox
                  id="isActivo"
                  value={data.isActivo}
                  handleData={handleData}
                  disabled={primer.tipo === "consultar"}
                  label="Activo"
                />
              </div>
            </div>

            <div className="input-base-row">
              <div className="input-base-container-50">
                <label
                  htmlFor="numeroDocumentoIdentidad"
                  className="label-base"
                >
                  Documento Identidad
                </label>
                <div className="input-base-container-button">
                  <input
                    ref={inputs["numeroDocumentoIdentidad"]}
                    id="numeroDocumentoIdentidad"
                    name="numeroDocumentoIdentidad"
                    placeholder="Documento Identidad"
                    value={data.numeroDocumentoIdentidad ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className={
                      primer.tipo !== "consultar" && !api.loading
                        ? "input-base-button"
                        : "input-base"
                    }
                  />
                  {primer.tipo === "registrar" && !api.loading && (
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
              <div className="input-base-container-50">
                <label htmlFor="apellidoPaterno" className="label-base">
                  Apellido Paterno
                </label>
                <input
                  id="apellidoPaterno"
                  name="apellidoPaterno"
                  placeholder="Apellido Paterno"
                  value={data.apellidoPaterno}
                  onChange={handleData}
                  autoComplete="off"
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                />
              </div>
              <div className="input-base-container-50">
                <label htmlFor="apellidoMaterno" className="label-base">
                  Apellido Materno
                </label>
                <input
                  id="apellidoMaterno"
                  name="apellidoMaterno"
                  placeholder="Apellido Materno"
                  value={data.apellidoMaterno ?? ""}
                  onChange={handleData}
                  autoComplete="off"
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                />
              </div>
            </div>

            <div className="input-base-row">
              <div className="input-base-container-100">
                <label htmlFor="nombres" className="label-base">
                  Nombres
                </label>
                <input
                  ref={inputs["nombres"]}
                  id="nombres"
                  name="nombres"
                  placeholder="Nombres"
                  value={data.nombres}
                  onChange={handleData}
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
                  value={data.direccion ?? ""}
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
                  value={data.departamentoId ?? ""}
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
                  value={data.provinciaId ?? ""}
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
                  value={data.distritoId ?? ""}
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
                  value={data.correoElectronico ?? ""}
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
                  value={data.telefono ?? ""}
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
                  value={data.celular ?? ""}
                  onChange={handleData}
                  autoComplete="off"
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                />
              </div>
            </div>

            <div className="input-base-row">
              <div className="input-base-container-33">
                <label htmlFor="fechaNacimiento" className="label-base">
                  Nacimiento
                </label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={data.fechaNacimiento ?? ""}
                  onChange={handleData}
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                />
              </div>
              <div className="input-base-container-33">
                <label htmlFor="sexoId" className="label-base">
                  Género
                </label>
                <select
                  id="sexoId"
                  name="sexoId"
                  value={data.sexoId ?? ""}
                  onChange={handleData}
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                >
                  <option key="default" value="">
                    SELECCIONAR
                  </option>
                  {sexos.map((x: ITipoVenta) => (
                    <option key={x.id} value={x.id}>
                      {x.descripcion}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-base-container-33">
                <label htmlFor="estadoCivilId" className="label-base">
                  Estado Civil
                </label>
                <select
                  id="estadoCivilId"
                  name="estadoCivilId"
                  value={data.estadoCivilId ?? ""}
                  onChange={handleData}
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                >
                  <option key="default" value="">
                    SELECCIONAR
                  </option>
                  {estadosCivil.map((x: ICombo) => (
                    <option key={x.id} value={x.id}>
                      {x.descripcion}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-base-row">
              <div className="input-base-container-25">
                <label htmlFor="tipoCuentaBancariaId" className="label-base">
                  Tipo Cuenta
                </label>
                <select
                  id="tipoCuentaBancariaId"
                  name="tipoCuentaBancariaId"
                  value={data.tipoCuentaBancariaId ?? ""}
                  onChange={handleData}
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                >
                  <option key="default" value="">
                    SELECCIONAR
                  </option>
                  {tiposCuentaBancaria.map((x: ICombo) => (
                    <option key={x.id} value={x.id}>
                      {x.descripcion}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-base-container-25">
                <label htmlFor="entidadBancariaId" className="label-base">
                  Entidad Bancaria
                </label>
                <select
                  id="entidadBancariaId"
                  name="entidadBancariaId"
                  value={data.entidadBancariaId ?? ""}
                  onChange={handleData}
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                >
                  <option key="default" value="">
                    SELECCIONAR
                  </option>
                  {entidadesBancaria.map((x: ICombo) => (
                    <option key={x.id} value={x.id}>
                      {x.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-base-container-25">
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
              <div className="input-base-container-25">
                <label htmlFor="cuentaCorriente" className="label-base">
                  Cuenta Corriente
                </label>
                <input
                  id="cuentaCorriente"
                  name="cuentaCorriente"
                  placeholder="Cuenta Corriente"
                  value={data.cuentaCorriente ?? ""}
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
          <ButtonFooter data={data} inputFocus="tipo" />
        </ModalForm>
      </BasicKeyHandler>
    </>
  );
};

export default PersonaModal;
