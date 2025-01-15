import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { AiOutlineCloudServer } from "react-icons/ai";
import {
  BasicKeyHandler,
  ButtonFooter,
  ModalForm,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  ICombo,
  ITiposDocumentoIdentidad,
  IDepartamento,
  IDistrito,
  IProvincia,
  ITransportista,
  ITransportistaTablas,
  defaultTransportistaTablas,
} from "../../../../../models";
import {
  getConsultarRucDni,
  handleClearMensajes,
  handleFocus,
  handleInputType,
  handleSetErrorMensaje,
  handleSetInputs,
} from "../../../../../util";

const TransportistaModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, modal, form } = globalContext;
  const { primer } = modal;
  const {
    departamentos,
    tiposTransportista,
    tiposDocumentoIdentidad,
  }: ITransportistaTablas = form.tablas || defaultTransportistaTablas;
  const [data, setData] = useState<ITransportista>(form.data);
  const inputs = useFocus("tipo", "numeroDocumentoIdentidad", "nombre");
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);
  //#endregion

  //#region Funciones
  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = target;
    const value = handleInputType(target);

    setData((x) => {
      const newData = { ...x, [name]: value };

      switch (name) {
        case "departamentoId":
          newData.departamentoId = value === "" ? null : (value as string);
          newData.provinciaId = null;
          newData.distritoId = null;
          break;
        case "provinciaId":
          newData.provinciaId = value === "" ? null : (value as string);
          newData.distritoId = null;
          break;
        case "distritoId":
          newData.distritoId = value === "" ? null : (value as string);
          break;
        case "correoElectronico":
          newData.correoElectronico = value === "" ? null : (value as string);
          break;
        default:
          break;
      }

      return newData;
    });
  };

  const handleConsultarRuc = async (): Promise<void> => {
    try {
      await handleClearMensajes(setGlobalContext);

      const param = new URLSearchParams({
        tipo: data.tipoDocumentoIdentidadId === "1" ? "dni" : "ruc",
        numeroDocumentoIdentidad: data.numeroDocumentoIdentidad,
      });

      const {
        numeroDocumentoIdentidad,
        nombre,
        nombres,
        apellidos,
        direccion,
        ubigeo,
      } = await getConsultarRucDni(globalContext, param);

      setData((x) => ({
        ...x,
        numeroDocumentoIdentidad,
        nombre: nombre || `${apellidos} ${nombres}`,
        apellidos,
        direccion,
        ...(ubigeo.length > 0 && {
          departamentoId: ubigeo[ubigeo.length - 1].substring(0, 2), // Los 2 primeros caracteres
          provinciaId: ubigeo[ubigeo.length - 1].substring(2, 4), // Los 2 siguientes
          distritoId: ubigeo[ubigeo.length - 1].substring(4, 6), // Los últimos 2 caracteres
        }),
      }));
      handleFocus(inputs["nombre"]);
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
      {departamentos.length > 0 && (
        <BasicKeyHandler selector="transportista-modal">
          <ModalForm
            title={`${primer.tipo} transportista`}
            className="transportista-modal md:min-w-[50%]"
          >
            <div className="modal-base-content">
              <div className="input-base-row">
                <div className="input-base-container-50">
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
                  <label htmlFor="tipoConductor" className="label-base">
                    Tipo Conductor
                  </label>
                  <select
                    ref={inputs["tipoConductor"]}
                    id="tipoConductor"
                    name="tipoConductor"
                    value={data.tipoConductor ?? ""}
                    onChange={handleData}
                    autoFocus
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {tiposTransportista.map((x: ICombo) => (
                      <option key={x.id} value={x.id}>
                        {x.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-50">
                  <label
                    htmlFor="tipoDocumentoIdentidadId"
                    className="label-base"
                  >
                    Tipo Documento
                  </label>
                  <select
                    id="tipoDocumentoIdentidadId"
                    name="tipoDocumentoIdentidadId"
                    value={data.tipoDocumentoIdentidadId ?? ""}
                    onChange={handleData}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {tiposDocumentoIdentidad.map(
                      (x: ITiposDocumentoIdentidad) => (
                        <option key={x.id} value={x.id}>
                          {x.abreviatura}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="input-base-container-50">
                  <label
                    htmlFor="numeroDocumentoIdentidad"
                    className="label-base"
                  >
                    RUC / DNI
                  </label>
                  <div className="input-base-container-button">
                    <input
                      ref={inputs["numeroDocumentoIdentidad"]}
                      id="numeroDocumentoIdentidad"
                      name="numeroDocumentoIdentidad"
                      placeholder="RUC / DNI"
                      value={data.numeroDocumentoIdentidad ?? ""}
                      onChange={handleData}
                      autoComplete="off"
                      autoFocus={primer.tipo === "modificar"}
                      minLength={0}
                      maxLength={15}
                      disabled={primer.tipo === "consultar"}
                      className={
                        primer.tipo !== "consultar" &&
                        !api.loading &&
                        (data.tipoDocumentoIdentidadId === "1" ||
                          data.tipoDocumentoIdentidadId === "6")
                          ? "input-base-button"
                          : "input-base"
                      }
                    />
                    {primer.tipo !== "consultar" &&
                      !api.loading &&
                      (data.tipoDocumentoIdentidadId === "1" ||
                        data.tipoDocumentoIdentidadId === "6") && (
                        <button
                          id="buttonConsultarRUC"
                          name="buttonConsultarRUC"
                          title="Presione [ALT + Z] para consultar a SUNAT."
                          accessKey="z"
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
                <div className="input-base-container-50">
                  <label htmlFor="nombre" className="label-base">
                    Nombre
                  </label>
                  <input
                    ref={inputs["nombre"]}
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    value={data.nombre ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    autoFocus={primer.tipo === "modificar"}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
                  <label htmlFor="apellidos" className="label-base">
                    Apellidos
                  </label>
                  <input
                    id="apellidos"
                    name="apellidos"
                    placeholder="Apellidos"
                    value={data.apellidos ?? ""}
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
                <div className="input-base-container-50">
                  <label htmlFor="correoElectronico" className="label-base">
                    Correo
                  </label>
                  <input
                    id="correoElectronico"
                    name="correoElectronico"
                    placeholder="Correo"
                    value={data.correoElectronico ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
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
                <div className="input-base-container-50">
                  <label htmlFor="licenciaConducir" className="label-base">
                    Licencia Conducir
                  </label>
                  <input
                    id="licenciaConducir"
                    name="licenciaConducir"
                    placeholder="Licencia Conducir"
                    value={data.licenciaConducir ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
                  <label htmlFor="NumeroRegistroMTC" className="label-base">
                    N° Registro
                  </label>
                  <input
                    id="NumeroRegistroMTC"
                    name="NumeroRegistroMTC"
                    placeholder="N° Registro"
                    value={data.NumeroRegistroMTC ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>
            </div>

            <ButtonFooter
              data={data}
              inputFocus={primer.tipo === "registrar" ? "id" : "nombre"}
            />
          </ModalForm>
        </BasicKeyHandler>
      )}
    </>
  );
};

export default TransportistaModal;
