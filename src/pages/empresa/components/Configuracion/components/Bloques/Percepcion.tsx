import { ChangeEvent, useEffect, useState } from "react";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import {
  BasicKeyHandler,
  ButtonFooter,
  ButtonGroup,
  CheckBox,
  Messages,
  Table,
} from "../../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../../hooks";
import {
  defaultConfiguracionDetalle,
  IConfiguracionDetalle,
} from "../../../../../../models";
import {
  handleClearMensajes,
  handleFocus,
  handleInputType,
  handleSetTextos,
} from "../../../../../../util";
import { usePorcentajeColumn } from "../Column";

interface IProps {
  dataPercepcion: IConfiguracionDetalle[];
  handlePercepcion: (percepcion: IConfiguracionDetalle[]) => void;
}

const Percepcion: React.FC<IProps> = ({ dataPercepcion, handlePercepcion }) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { form, mensajes } = globalContext;
  const { retorno } = form;
  const mensaje = mensajes.filter(
    (x) => x.origen === "adicionalPercepcion" && x.tipo >= 0
  );

  const [data, setData] = useState<IConfiguracionDetalle>(
    defaultConfiguracionDetalle
  );
  const [table, setTable] = useState<IConfiguracionDetalle[]>(dataPercepcion);
  const [show, setShow] = useState<boolean>(false);
  const inputs = useFocus("porcentajePercepcion");
  const columns = usePorcentajeColumn("percepcion");
  //#endregion

  //#region useEffect
  useEffect(() => {
    retorno &&
      retorno.origen === "percepcionDetalle" &&
      handleActionBar(retorno);
  }, [retorno]);

  useEffect(() => {
    handlePercepcion(table);
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

  const handleNew = (): void => {
    setData(defaultConfiguracionDetalle);
    setShow(true);
  };

  const handleActionBar = (detalle: IConfiguracionDetalle): void => {
    if (detalle.tipo === "eliminar") {
      handleCrud(detalle);
      return;
    }
    setShow(true);
    handleFocus(inputs["porcentajePercepcion"]);
    setData(detalle);
  };

  const handleCrud = (detalle: IConfiguracionDetalle): void => {
    switch (detalle.tipo) {
      case "registrar":
        handleAdd(detalle);
        break;
      case "modificar":
        handleUpdate(detalle);
        break;
      case "eliminar":
        handleDelete(detalle);
        break;
      default:
        break;
    }
  };

  const handleAdd = (percepcion: IConfiguracionDetalle): void => {
    const nuevoDetalleId = table.length + 1;
    setTable((x) => [...x, { ...percepcion, detalleId: nuevoDetalleId }]);
  };

  const handleUpdate = (percepcion: IConfiguracionDetalle): void => {
    const existeDetalle = table.find(
      (x) => x.detalleId === percepcion.detalleId
    );
    if (existeDetalle) {
      const indiceDetalle = table.findIndex(
        (x) => x.detalleId === percepcion.detalleId
      );
      const nuevosDetalles = [...table];
      nuevosDetalles[indiceDetalle] = { ...existeDetalle, ...percepcion };
      setTable(nuevosDetalles);
    }
  };

  const handleDelete = (percepcion: IConfiguracionDetalle): void => {
    const existeDetalle = table.find(
      (x) => x.detalleId === percepcion.detalleId
    );

    if (existeDetalle) {
      const nuevosDetalles = table.filter(
        (x) => x.detalleId !== percepcion.detalleId
      );
      const detallesActualizados = nuevosDetalles.map((x, index) => ({
        ...x,
        detalleId: index + 1,
      }));
      setTable(detallesActualizados);
      handleClear();
    }
  };

  const handleValidation = async (): Promise<boolean> => {
    await handleClearMensajes(setGlobalContext);
    const textos: string[] = [];

    if (data.tipo === "registrar" || data.tipo === "modificar") {
      const existe = table.some(
        (x) =>
          x.porcentaje === data.porcentaje && x.detalleId !== data.detalleId
      );
      if (existe) {
        textos.push(
          `El porcentaje ya existe en el detalle, imposible ${data.tipo}.`
        );
      }
    }

    if (
      data.porcentaje === null ||
      data.porcentaje === undefined ||
      data.porcentaje < 0
    ) {
      textos.push("El porcentaje es requerido");
    }

    if (data.default) {
      const existe = table.some(
        (x) => x.default === data.default && x.detalleId !== data.detalleId
      );
      if (existe) {
        textos.push("Solo puede haber un registro por defecto.");
      }
    }

    if (textos.length > 0) {
      handleSetTextos(setGlobalContext, "adicionalPercepcion", textos);
    }

    return textos.length === 0;
  };

  const handleSave = async (): Promise<void> => {
    const detalleValido = await handleValidation();
    if (!detalleValido) {
      handleFocus(inputs["porcentajePercepcion"]);
      return;
    }

    handleCrud(data);
    handleClear();
  };

  const handleClear = (): void => {
    setData(defaultConfiguracionDetalle);
    handleClearMensajes(setGlobalContext);
    setShow(false);
  };
  //#endregion

  return (
    <div className="empresa-configuracion-container">
      <h4 className="main-header-sub-title">Percepción</h4>

      {mensaje.length >= 0 && <Messages mensajes={mensaje} />}

      {!show && (
        <ButtonGroup showRegistrar={false} showAnular={false}>
          <button
            id="buttonAgregarPercepcion"
            name="buttonAgregarPercepcion"
            onClick={handleNew}
            className="button-base button-base-bg-secondary"
          >
            <BsFileEarmarkPlusFill
              size={"1.5rem"}
              className="button-base-icon"
            />
            <span className="button-base-text">Agregar Percepcion</span>
          </button>
        </ButtonGroup>
      )}

      {show && (
        <BasicKeyHandler selector={"percepcion"}>
          <div className="main-modal-secondary percepcion">
            <div className="input-base-row">
              <div className="input-base-container-100">
                <label htmlFor="porcentajePercepcion" className="label-base">
                  Porcentaje
                </label>
                <input
                  ref={inputs["porcentajePercepcion"]}
                  type="number"
                  inputMode="numeric"
                  id="porcentajePercepcion"
                  name="porcentaje"
                  placeholder="Porcentaje"
                  value={data.porcentaje}
                  onChange={handleData}
                  autoComplete="off"
                  min={0}
                  step={0.1}
                  className="input-base"
                />
              </div>
              <div className="input-base-container-auto">
                <label htmlFor="defaultPercepcion" className="label-base">
                  Estado
                </label>
                <CheckBox
                  id="defaultPercepcion"
                  name="default"
                  value={data.default}
                  handleData={handleData}
                  label="Por Defecto"
                />
              </div>
            </div>

            <ButtonFooter
              modalProp="segundo"
              data={data}
              replaceSend={true}
              onSend={handleSave}
              replaceClose={true}
              onClose={handleClear}
              inputFocus="porcentajePercepcion"
            />
          </div>
        </BasicKeyHandler>
      )}

      <Table
        data={table}
        columns={columns}
        doubleClick={false}
        pagination={false}
        selectable={false}
        tableClassName="porcentaje-table"
      />
    </div>
  );
};
export default Percepcion;
