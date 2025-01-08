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
  dataDetraccion: IConfiguracionDetalle[];
  handleDetraccion: (detraccion: IConfiguracionDetalle[]) => void;
}

const Detraccion: React.FC<IProps> = ({ dataDetraccion, handleDetraccion }) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { form, mensajes } = globalContext;
  const { retorno } = form;
  const mensaje = mensajes.filter(
    (x) => x.origen === "adicionalDetraccion" && x.tipo >= 0
  );

  const [data, setData] = useState<IConfiguracionDetalle>(
    defaultConfiguracionDetalle
  );
  const [table, setTable] = useState<IConfiguracionDetalle[]>(dataDetraccion);
  const [show, setShow] = useState<boolean>(false);
  const inputs = useFocus("porcentajeDetraccion");
  const columns = usePorcentajeColumn("detraccion");
  //#endregion

  //#region useEffect
  useEffect(() => {
    retorno &&
      retorno.origen === "detraccionDetalle" &&
      handleActionBar(retorno);
  }, [retorno]);

  useEffect(() => {
    handleDetraccion(table);
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
    handleFocus(inputs["porcentajeDetraccion"]);
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

  const handleAdd = (detraccion: IConfiguracionDetalle): void => {
    const nuevoDetalleId = table.length + 1;
    setTable((x) => [...x, { ...detraccion, detalleId: nuevoDetalleId }]);
  };

  const handleUpdate = (detraccion: IConfiguracionDetalle): void => {
    const existeDetalle = table.find(
      (x) => x.detalleId === detraccion.detalleId
    );

    if (existeDetalle) {
      const indiceDetalle = table.findIndex(
        (x) => x.detalleId === detraccion.detalleId
      );
      const nuevosDetalles = [...table];
      nuevosDetalles[indiceDetalle] = { ...existeDetalle, ...detraccion };
      setTable(nuevosDetalles);
    }
  };

  const handleDelete = (detraccion: IConfiguracionDetalle): void => {
    const existeDetalle = table.find(
      (x) => x.detalleId === detraccion.detalleId
    );

    if (existeDetalle) {
      const nuevosDetalles = table.filter(
        (x) => x.detalleId !== detraccion.detalleId
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
      handleSetTextos(setGlobalContext, "adicionalDetraccion", textos);
    }

    return textos.length === 0;
  };

  const handleSave = async (): Promise<void> => {
    const detalleValido = await handleValidation();
    if (!detalleValido) {
      handleFocus(inputs["porcentajeDetraccion"]);
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
      <h4 className="main-header-sub-title">Detracción</h4>

      {mensaje.length >= 0 && <Messages mensajes={mensaje} />}

      {!show && (
        <ButtonGroup showRegistrar={false} showAnular={false}>
          <button
            id="buttonAgregarDetraccion"
            name="buttonAgregarDetraccion"
            onClick={handleNew}
            className="button-base button-base-bg-secondary"
          >
            <BsFileEarmarkPlusFill
              size={"1.5rem"}
              className="button-base-icon"
            />
            <span className="button-base-text">Agregar Detracción</span>
          </button>
        </ButtonGroup>
      )}

      {show && (
        <BasicKeyHandler selector={"detraccion"}>
          <div className="main-modal-secondary detraccion">
            <div className="input-base-row">
              <div className="input-base-container-100">
                <label htmlFor="porcentajeDetraccion" className="label-base">
                  Porcentaje
                </label>
                <input
                  ref={inputs["porcentajeDetraccion"]}
                  type="number"
                  inputMode="numeric"
                  id="porcentajeDetraccion"
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
                <label htmlFor="defaultDetraccion" className="label-base">
                  Estado
                </label>
                <CheckBox
                  id="defaultDetraccion"
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
              inputFocus="porcentajeDetraccion"
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
export default Detraccion;
