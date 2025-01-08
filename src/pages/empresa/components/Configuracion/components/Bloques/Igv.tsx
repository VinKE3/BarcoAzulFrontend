import { ChangeEvent, useEffect, useState } from "react";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { BasicKeyHandler, ButtonFooter, ButtonGroup, CheckBox, Messages, Table } from "../../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../../hooks";
import { defaultConfiguracionDetalle, IConfiguracionDetalle } from "../../../../../../models";
import { handleClearMensajes, handleFocus, handleInputType, handleSetTextos } from "../../../../../../util";
import { usePorcentajeColumn } from "../Column";

interface IProps {
  dataIGV: IConfiguracionDetalle[];
  handleIGV: (igv: IConfiguracionDetalle[]) => void;
}

const Igv: React.FC<IProps> = ({ dataIGV, handleIGV }) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { form, mensajes } = globalContext;
  const { retorno } = form;
  const mensaje = mensajes.filter((x) => x.origen === "adicionalIGV" && x.tipo >= 0);

  const [data, setData] = useState<IConfiguracionDetalle>(defaultConfiguracionDetalle);
  const [table, setTable] = useState<IConfiguracionDetalle[]>(dataIGV);
  const [show, setShow] = useState<boolean>(false);
  const inputs = useFocus("porcentajeIGV");
  const columns = usePorcentajeColumn("igv");
  //#endregion

  //#region useEffect
  useEffect(() => {
    retorno && retorno.origen === "igvDetalle" && handleActionBar(retorno);
  }, [retorno]);

  useEffect(() => {
    handleIGV(table);
  }, [table]);
  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
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
    handleFocus(inputs["porcentajeIGV"]);
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

  const handleAdd = (igv: IConfiguracionDetalle): void => {
    const nuevoDetalleId = table.length + 1;
    setTable((x) => [...x, { ...igv, detalleId: nuevoDetalleId }]);
  };

  const handleUpdate = (igv: IConfiguracionDetalle): void => {
    const existeDetalle = table.find((x) => x.detalleId === igv.detalleId);

    if (existeDetalle) {
      const indiceDetalle = table.findIndex((x) => x.detalleId === igv.detalleId);
      const nuevosDetalles = [...table];
      nuevosDetalles[indiceDetalle] = { ...existeDetalle, ...igv };
      setTable(nuevosDetalles);
    }
  };

  const handleDelete = (igv: IConfiguracionDetalle): void => {
    const existeDetalle = table.find((x) => x.detalleId === igv.detalleId);

    if (existeDetalle) {
      const nuevosDetalles = table.filter((x) => x.detalleId !== igv.detalleId);
      const detallesActualizados = nuevosDetalles.map((x, index) => ({ ...x, detalleId: index + 1 }));
      setTable(detallesActualizados);
      handleClear();
    }
  };

  const handleValidation = async (): Promise<boolean> => {
    await handleClearMensajes(setGlobalContext);
    const textos: string[] = [];

    if (data.tipo === "registrar" || data.tipo === "modificar") {
      const existe = table.some((x) => x.porcentaje === data.porcentaje && x.detalleId !== data.detalleId);
      if (existe) {
        textos.push(`El porcentaje ya existe en el detalle, imposible ${data.tipo}.`);
      }
    }

    if (data.porcentaje === null || data.porcentaje === undefined || data.porcentaje < 0) {
      textos.push("El porcentaje es requerido");
    }

    if (data.default) {
      const existe = table.some((x) => x.default === data.default && x.detalleId !== data.detalleId);
      if (existe) {
        textos.push("Solo puede haber un registro por defecto.");
      }
    }

    if (textos.length > 0) {
      handleSetTextos(setGlobalContext, "adicionalIGV", textos);
    }

    return textos.length === 0;
  };

  const handleSave = async (): Promise<void> => {
    const detalleValido = await handleValidation();
    if (!detalleValido) {
      handleFocus(inputs["porcentajeIGV"]);
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
      <h4 className="main-header-sub-title">IGV</h4>

      {mensaje.length >= 0 && <Messages mensajes={mensaje} />}

      {!show && (
        <ButtonGroup showRegistrar={false} showAnular={false}>
          <button
            id="buttonAgregarIGV"
            name="buttonAgregarIGV"
            onClick={handleNew}
            className="button-base button-base-bg-secondary"
          >
            <BsFileEarmarkPlusFill
              size={"1.5rem"}
              className="button-base-icon"
            />
            <span className="button-base-text">Agregar IGV</span>
          </button>
        </ButtonGroup>
      )}

      {show && (
        <BasicKeyHandler selector={"igv"}>
          <div className="main-modal-secondary igv">
            <div className="input-base-row">
              <div className="input-base-container-100">
                <label htmlFor="porcentajeIGV" className="label-base">
                  Porcentaje
                </label>
                <input
                  ref={inputs["porcentajeIGV"]}
                  type="number"
                  inputMode="numeric"
                  id="porcentajeIGV"
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
                <label htmlFor="defaultIGV" className="label-base">
                  Estado
                </label>
                <CheckBox
                  id="defaultIGV"
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
              inputFocus="porcentajeIGV"
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
export default Igv;
