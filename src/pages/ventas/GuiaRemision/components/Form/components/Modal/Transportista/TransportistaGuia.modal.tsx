import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { AiOutlineCloudServer } from "react-icons/ai";
import { MdAddBox } from "react-icons/md";
import { TbDeviceIpadSearch } from "react-icons/tb";
import {
  ModalForm,
  Table,
  TableKeyHandler,
} from "../../../../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../../../../hooks";
import {
  ICombo,
  IGuiaRemisionTransportista,
  ITiposDocumentoIdentidad,
  ITransportista,
  ITransportistaFind,
  ITransportistaTablas,
  defaultGuiaRemisionTransportista,
  defaultTransportistaTablas,
} from "../../../../../../../../models";
import {
  getConsultarRucDni,
  getId,
  getTablas,
  handleClearMensajes,
  handleClearModalProp,
  handleFocus,
  handleHelpModal,
  handleInputType,
  handleSetErrorMensaje,
  handleSetInputs,
  handleSetTextos,
} from "../../../../../../../../util";
import useTransportistaGuiaColumn from "./transportistaGuia.column";

interface IProp {
  modalidad: string;
  dataTransportista: IGuiaRemisionTransportista[];
  handleTransportistas: (transportistas: IGuiaRemisionTransportista[]) => void;
}

const TransportistaGuiaModal: React.FC<IProp> = ({
  modalidad,
  dataTransportista,
  handleTransportistas,
}) => {
  //#region useState
  const menu = "Mantenimiento/Transportista";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, modal, form } = globalContext;
  const { segundo } = modal;
  const { retorno } = form;
  const columns = useTransportistaGuiaColumn(segundo.tipo);
  const [data, setData] = useState<IGuiaRemisionTransportista>(
    defaultGuiaRemisionTransportista
  );
  const [tablas, setTablas] = useState<ITransportistaTablas>(
    defaultTransportistaTablas
  );
  const { tiposDocumentoIdentidad } = tablas;
  const [table, setTable] =
    useState<IGuiaRemisionTransportista[]>(dataTransportista);
  const inputs = useFocus(
    "tipoDocumentoIdentidadId",
    "numeroDocumentoIdentidad",
    "nombre",
    "buttonSaveTransportista"
  );
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleTablas();
  }, []);

  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);

  useEffect(() => {
    retorno &&
      retorno.origen === "transportistaFind" &&
      handleTransportistaFind(retorno as ITransportistaFind);
    retorno &&
      retorno.origen === "transportistaDetalle" &&
      handleActionBar(retorno as IGuiaRemisionTransportista);
  }, [retorno]);

  useEffect(() => {
    handleTransportistas(table);
  }, [table]);
  //#endregion

  //#region Funciones
  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setData((x) => ({ ...x, [name]: value }));
  };

  const handleTablas = async (): Promise<void> => {
    const result: ITransportistaTablas = await getTablas(globalContext, menu);
    setTablas(result);
  };

  const handleConsultarRuc = async (): Promise<void> => {
    try {
      await handleClearMensajes(setGlobalContext);

      const param = new URLSearchParams({
        tipo: data.tipoDocumentoIdentidadId === "1" ? "dni" : "ruc",
        numeroDocumentoIdentidad: data.numeroDocumentoIdentidad as string,
      });

      const { numeroDocumentoIdentidad, nombres, nombre, apellidos } =
        await getConsultarRucDni(globalContext, param);
      setData((x) => ({
        ...x,
        numeroDocumentoIdentidad: numeroDocumentoIdentidad,
        nombre: nombres || nombre,
        apellidos: apellidos,
      }));
      handleFocus(inputs["nombre"]);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "adicional");
      handleFocus(inputs["numeroDocumentoIdentidad"]);
    }
  };

  const handleTransportistaFind = async (
    find: ITransportistaFind
  ): Promise<void> => {
    const transportistaCompleto: ITransportista = await getId(
      globalContext,
      find.id,
      "Mantenimiento/Transportista"
    );

    const {
      tipoConductor,
      tipoDocumentoIdentidadId,
      numeroDocumentoIdentidad,
      nombre,
      apellidos,
      direccion,
      licenciaConducir,
      NumeroRegistroMTC,
    } = transportistaCompleto;

    setData((x) => ({
      ...x,
      tipoConductor,
      tipoDocumentoIdentidadId,
      numeroDocumentoIdentidad,
      nombre,
      apellidos: apellidos ?? "",
      direccion,
      licenciaConducir,
      NumeroRegistroMTC,
    }));
    handleFocus(inputs["buttonSaveTransportista"]);
  };

  const handleActionBar = (detalle: IGuiaRemisionTransportista): void => {
    if (detalle.tipoModal === "eliminar") {
      handleCrudDetalles(detalle);
      return;
    }
    handleFocus(inputs["tipoDocumentoIdentidadId"]);
    setData(detalle);
  };

  const handleCrudDetalles = (detalle: IGuiaRemisionTransportista): void => {
    switch (detalle.tipoModal) {
      case "registrar":
        handleAdd(detalle);
        break;
      case "eliminar":
        handleDelete(detalle);
        break;
      default:
        break;
    }
  };

  const handleAdd = (transportista: IGuiaRemisionTransportista): void => {
    const nuevoDetalleId = table.length + 1;
    setTable((x) => [
      ...x,
      {
        ...transportista,
        tipo: modalidad,
        item: nuevoDetalleId,
      },
    ]);
  };

  const handleDelete = (transportista: IGuiaRemisionTransportista): void => {
    const existeDetalle = table.find(
      (x) =>
        x.numeroDocumentoIdentidad === transportista.numeroDocumentoIdentidad
    );

    if (existeDetalle) {
      const nuevosDetalles = table.filter(
        (x) =>
          x.numeroDocumentoIdentidad !== transportista.numeroDocumentoIdentidad
      );

      const detallesActualizados = nuevosDetalles.map((x, index) => ({
        ...x,
        item: index + 1,
      }));

      setTable(detallesActualizados);
      handleClear();
    }
  };

  const handleValidation = async (): Promise<boolean> => {
    await handleClearMensajes(setGlobalContext);

    const textos: string[] = [];

    const existe = table.find(
      (x) => x.numeroDocumentoIdentidad === data.numeroDocumentoIdentidad
    );
    if (existe) {
      textos.push(
        "El transportista ya existe en el detalle, imposible registrar."
      );
    }

    if (modalidad === "01") {
      // Modalidad 01: Validar número de registro MTC
      if (table.length > 0) {
        textos.push(
          "Modalidad Transporte público solo admite un transportista, imposible registrar más."
        );
      }
    }

    // Validaciones específicas para el detalle general
    if (
      !data.tipoDocumentoIdentidadId ||
      data.tipoDocumentoIdentidadId === ""
    ) {
      textos.push("El tipo de documento de identidad es requerido");
    }

    if (
      !data.numeroDocumentoIdentidad ||
      data.numeroDocumentoIdentidad.length < 6
    ) {
      textos.push("El documento de identidad es requerido");
    }

    if (!data.nombre || data.nombre === "") {
      textos.push("El nombre es requerido");
    }

    // Validación según modalidad
    if (modalidad === "01") {
      // Modalidad 01: Validar número de registro MTC
      if (!data.numeroRegistroMTC || data.numeroRegistroMTC === "") {
        textos.push("El N° de registro MTC es requerido");
      }
    } else if (modalidad === "02") {
      // Modalidad 02: Validar licencia de conducir
      if (!data.licenciaConducir || data.licenciaConducir === "") {
        textos.push("La licencia de conducir es requerida");
      }
    }

    if (textos.length > 0) {
      handleSetTextos(setGlobalContext, "adicional", textos);
    }

    return textos.length === 0;
  };

  const handleSave = async (): Promise<void> => {
    const detalleValido = await handleValidation();
    if (!detalleValido) {
      handleFocus(inputs["tipoDocumentoIdentidadId"]);
      return;
    }

    handleCrudDetalles(data);
    handleClear();
  };

  const handleClear = (): void => {
    setData(defaultGuiaRemisionTransportista);
    handleFocus(inputs["tipoDocumentoIdentidadId"]);
  };

  const handleOpen = async (origen: string): Promise<void> => {
    await handleClearMensajes(setGlobalContext);

    switch (origen) {
      case "buttonConsultarRuc": {
        await handleConsultarRuc();
        break;
      }
      case "buttonSaveTransportista": {
        await handleSave();
        break;
      }
      case "buttonTransportistaFind": {
        handleHelpModal(setGlobalContext, "transportistaFind", "tercer");
        break;
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key !== "Enter") return;

    e.stopPropagation();
    handleOpen(e.currentTarget.id);
  };

  //#endregion

  return (
    <>
      {tiposDocumentoIdentidad.length > 0 && (
        <ModalForm
          title={
            modalidad === "01" ? "adjuntar transportista" : "adjuntar conductor"
          }
          origenMensajes="adicional"
          replaceClose={true}
          onClose={() => handleClearModalProp(setGlobalContext, "segundo")}
          className="md:min-w-[50%]"
        >
          <TableKeyHandler
            selector="transportista-guia-modal"
            readButton={true}
          >
            <div className="filter-base transportista-guia-modal">
              <div className="input-base-row">
                <div className="input-base-container-20">
                  <label htmlFor="item" className="label-base">
                    Item
                  </label>
                  <input
                    id="item"
                    name="item"
                    placeholder="Item"
                    value={data.item}
                    disabled
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
                  <label
                    htmlFor="tipoDocumentoIdentidadId"
                    className="label-base"
                  >
                    Tipo Documento
                  </label>
                  <select
                    ref={inputs["tipoDocumentoIdentidadId"]}
                    id="tipoDocumentoIdentidadId"
                    name="tipoDocumentoIdentidadId"
                    value={data.tipoDocumentoIdentidadId ?? ""}
                    onChange={handleData}
                    autoFocus
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
                      minLength={0}
                      maxLength={15}
                      className={
                        !api.loading &&
                        (data.tipoDocumentoIdentidadId === "1" ||
                          data.tipoDocumentoIdentidadId === "6")
                          ? "input-base-button"
                          : "input-base"
                      }
                    />
                    {!api.loading &&
                      (data.tipoDocumentoIdentidadId === "1" ||
                        data.tipoDocumentoIdentidadId === "6") && (
                        <button
                          id="buttonConsultarRuc"
                          name="buttonConsultarRuc"
                          onClick={() => handleOpen("buttonConsultarRuc")}
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
                    disabled={modalidad === "01"}
                    className="input-base"
                  />
                </div>
              </div>
              <div className="input-base-row">
                <div className="input-base-container-50">
                  <label htmlFor="licenciaConducir" className="label-base">
                    Licencia
                  </label>
                  <input
                    id="licenciaConducir"
                    name="licenciaConducir"
                    placeholder="Licencia"
                    value={data.licenciaConducir ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={modalidad !== "02"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-100">
                  <label htmlFor="numeroRegistroMTC" className="label-base">
                    N° Registro MTC
                  </label>
                  <div className="input-base-container-button">
                    <input
                      id="numeroRegistroMTC"
                      name="numeroRegistroMTC"
                      placeholder="Nª Registro MTC"
                      value={data.numeroRegistroMTC ?? ""}
                      onChange={handleData}
                      autoComplete="off"
                      disabled={modalidad !== "01"}
                      className="input-base-button"
                    />
                    <button
                      ref={inputs["buttonSaveTransportista"]}
                      id="buttonSaveTransportista"
                      name="buttonSaveTransportista"
                      title="Presione [ALT + A] para guardar registro."
                      accessKey="a"
                      onClick={() => handleOpen("buttonSaveTransportista")}
                      onKeyDown={handleKeyDown}
                      disabled={data.tipoModal === "consultar"}
                      className="button-base-anidado-plano button-base-bg-secondary"
                    >
                      <MdAddBox size="2rem" className="button-base-icon" />
                    </button>
                    <button
                      id="buttonTransportistaFind"
                      name="buttonTransportistaFind"
                      title="Presione [ALT + C] para adjuntar transportista."
                      accessKey="c"
                      onClick={() => handleOpen("buttonTransportistaFind")}
                      onKeyDown={handleKeyDown}
                      disabled={data.tipoModal === "consultar"}
                      className="button-base-anidado button-base-bg-primary"
                    >
                      <TbDeviceIpadSearch
                        size="2rem"
                        className="button-base-icon"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TableKeyHandler>

          <Table
            tableClassName="transportista-guia-table"
            data={table}
            columns={columns}
            doubleClick={false}
            pagination={false}
            selectable={false}
          />
        </ModalForm>
      )}
    </>
  );
};

export default TransportistaGuiaModal;
