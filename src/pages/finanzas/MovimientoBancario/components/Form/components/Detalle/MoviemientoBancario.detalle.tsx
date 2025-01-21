import { ChangeEvent, useEffect, useState } from "react";
import { BsFillCartPlusFill, BsFillEraserFill } from "react-icons/bs";
import { FaBook, FaCartPlus, FaPlus } from "react-icons/fa6";
import { IoMdPricetags } from "react-icons/io";
import {
  CheckBox,
  Messages,
  PrecioFindModal,
  Table,
} from "../../../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../../../hooks";
import {
  IConceptoCompleto,
  IConceptoFind,
  IMovimientoBancario,
  IMovimientoBancarioDetalle,
  defaultConceptoCompleto,
  defaultMovimientoBancarioDetalle,
} from "../../../../../../../models";
import {
  getId,
  handleClearMensajes,
  handleConvertPrecios,
  handleFocus,
  handleHelpModal,
  handleInputType,
  handleNumber,
  handleSetTextos,
  handleToast,
  handleValCantidad,
  handleValPrecio,
  roundNumber,
} from "../../../../../../../util";
import { useMovimientoBancarioDetalleColumn } from "../../../Column";
interface IProps {
  dataGeneral: IMovimientoBancario;
  setDataGeneral: React.Dispatch<React.SetStateAction<IMovimientoBancario>>;
  handleDataGeneral: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => Promise<void> | void;
}

const MovimientoBancarioDetalle: React.FC<IProps> = ({
  dataGeneral,
  setDataGeneral,
  handleDataGeneral,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes, extra, api } = globalContext;
  const { primer, segundo } = modal;
  const { retorno } = form;
  const { simplificado, element } = extra;
  const mensaje = mensajes.filter((x) => x.origen === "detalle" && x.tipo >= 0);

  const [data, setData] = useState<IMovimientoBancarioDetalle>(
    defaultMovimientoBancarioDetalle
  );

  const [table, setTable] = useState<IMovimientoBancarioDetalle[]>(
    dataGeneral.detalles
  );

  const columns = useMovimientoBancarioDetalleColumn(primer.tipo);
  const inputs = useFocus(
    "tipoDocumentoIdentidadId",
    "numeroDocumentoIdentidad",
    "nombre",
    "buttonSaveTransportista"
  );
  const footerItems = [
    { text: "TOTAL", value: Number(dataGeneral.total), show: true },
  ];
  //#endregion

  //#region useEffect
  useEffect(() => {
    retorno &&
      retorno.origen === "conceptoFind" &&
      handleConceptoCompleto(retorno);
    retorno &&
      retorno.origen === "detalle" &&
      handleActionBar(retorno as IMovimientoBancarioDetalle);
  }, [retorno]);

  useEffect(() => {
    setTable(dataGeneral.detalles);
  }, [dataGeneral.detalles]);

  // useEffect(() => {
  //   data.tipo !== "registrar" &&
  //     handleConceptoCompleto(data.documentoRelacionado);
  // }, [data.tipo]);

  //#endregion

  //#region Funciones
  const handleData = ({
    target,
  }: ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >): void => {
    const { name } = target;
    const value = handleInputType(target);

    setData((x) => {
      const newData = { ...x, [name]: value };

      switch (name) {
        // case "cantidad":
        //   newData.abono;
        //   break;

        default:
          break;
      }
      return newData;
    });
  };

  const handleActionBar = (detalle: IMovimientoBancarioDetalle): void => {
    if (detalle.tipo === "eliminar") {
      handleCrudDetalles(detalle);
      return;
    }
    handleFocus(inputs["tipoDocumentoIdentidadId"]);
    setData(detalle);
  };

  const handleConceptoCompleto = async (
    concepto: IConceptoCompleto
  ): Promise<void> => {
    const { saldo, descripcion, fechaEmision, id } = concepto;
    setData((x) => ({
      ...x,
      saldo,
      abono: saldo,
      concepto: descripcion,
      documentoVentaCompraFechaEmision: fechaEmision,
      documentoVentaCompraId: id,
    }));
  };

  const handleValidation = async (): Promise<boolean> => {
    await handleClearMensajes(setGlobalContext);
    let textos: string[] = [];

    if (!data.concepto || data.concepto === "") {
      textos.push("El concepto es requerido");
    }

    if (data.tipo === "registrar") {
      const existe = dataGeneral.detalles.find(
        (x) => x.concepto === data.concepto
      );
      if (existe) {
        textos.push("El concepto ya existe en el detalle, imposible registrar");
      }
    }

    if (data.abono > data.saldo) {
      textos.push("El abono no puede ser mayor al saldo");
    }

    if (textos.length > 0) {
      handleSetTextos(setGlobalContext, "detalle", textos);
    }
    return textos.length === 0;
  };

  const handleCrudDetalles = (detalle: IMovimientoBancarioDetalle): void => {
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
  const handleAdd = (detalle: IMovimientoBancarioDetalle): void => {
    const nuevoDetalleId = table.length + 1;
    setDataGeneral((x) => ({
      ...x,
      detalles: [
        ...x.detalles,
        {
          ...detalle,
          abono: detalle.saldo,
          detalleId: nuevoDetalleId,
        },
      ],
    }));
  };

  const handleUpdate = (detalle: IMovimientoBancarioDetalle): void => {
    const existeDetalle = table.find(
      (x) => x.documentoVentaCompraId === detalle.documentoVentaCompraId
    );
    if (existeDetalle) {
      const indiceDetalle = table.findIndex(
        (x) => x.documentoVentaCompraId === detalle.documentoVentaCompraId
      );
      const nuevosDetalles = [...table];
      nuevosDetalles[indiceDetalle] = { ...existeDetalle, ...detalle };
      setDataGeneral((x) => ({ ...x, detalles: nuevosDetalles }));
    }
  };

  const handleDelete = (detalle: IMovimientoBancarioDetalle): void => {
    const existeDetalle = table.find(
      (x) => x.documentoVentaCompraId === detalle.documentoVentaCompraId
    );

    if (existeDetalle) {
      const nuevosDetalles = table.filter(
        (x) => x.documentoVentaCompraId !== detalle.documentoVentaCompraId
      );

      const detallesActualizados = nuevosDetalles.map((x, index) => ({
        ...x,
        item: index + 1,
      }));

      setDataGeneral((x) => ({ ...x, detalles: detallesActualizados }));
      handleClear();
    }
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
    setData(defaultMovimientoBancarioDetalle);
  };

  const handleKeyDown = async (e: any): Promise<void> => {
    if (e.key === "Enter") {
      await handleClearMensajes(setGlobalContext);
      let textos: string[] = [];

      switch (e.target.id) {
        case "buttonArticuloFind": {
          handleHelpModal(setGlobalContext, "articuloFind");
          e.stopPropagation();
          break;
        }

        case "buttonPrecioFind": {
          e.stopPropagation();
          handleHelpModal(setGlobalContext, "precioFind");
          break;
        }

        case "buttonSaveDetalle": {
          await handleSave();
          e.stopPropagation();
          break;
        }

        default: {
          break;
        }
      }

      if (textos.length > 0) {
        handleSetTextos(setGlobalContext, "detalle", textos);
        e.stopPropagation();
        handleFocus(inputs[e.target.id]);
      }
    }
  };

  return (
    <div className="form-base-container nota-pedido-detalle-form">
      {mensaje.length > 0 && <Messages />}
      <div className="filter-base">
        <span className="filter-base-text">Detalles</span>

        {primer.tipo !== "consultar" && (
          <>
            <div className="input-base-row">
              <div className="input-base-container-100">
                <label htmlFor="concepto" className="label-base">
                  Concepto
                </label>
                <div className="input-base-container-button">
                  <input
                    ref={inputs["concepto"]}
                    id="concepto"
                    name="concepto"
                    placeholder="Concepto"
                    value={data.concepto ?? ""}
                    onChange={handleData}
                    className="input-base-button"
                    disabled
                  />
                  <button
                    ref={inputs["buttonConceptoFind"]}
                    id="buttonConceptoFind"
                    name="buttonConceptoFind"
                    title="Presione [ALT +] para adjuntar concepto."
                    accessKey="+"
                    onClick={() =>
                      handleHelpModal(setGlobalContext, "conceptoFind")
                    }
                    onKeyDown={handleKeyDown}
                    disabled={data.tipo === "consultar"}
                    className="button-base-anidado button-base-bg-primary"
                  >
                    <FaBook
                      strokeWidth={2}
                      size="2rem"
                      className="button-base-icon"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="input-base-row">
              <div className="input-base-container-20">
                <label htmlFor="saldo" className="label-base">
                  Saldo
                </label>
                <input
                  id="saldo"
                  name="saldo"
                  placeholder="saldo"
                  value={data.saldo ?? ""}
                  disabled
                  className="input-base"
                />
              </div>
              <div className="input-base-container-33">
                <label htmlFor="abono" className="label-base">
                  Abono
                </label>
                <div className="input-base-container-button">
                  <input
                    ref={inputs["abono"]}
                    type="number"
                    inputMode="numeric"
                    id="abono"
                    name="abono"
                    placeholder="abono"
                    value={data.abono}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={0.1}
                    disabled={data.tipo === "consultar"}
                    className="input-base-button"
                  />
                  <button
                    id="buttonClearDetalle"
                    name="buttonClearDetalle"
                    title="Presione [ALT -] para limpiar el detalle."
                    accessKey="-"
                    onClick={handleClear}
                    className="button-base-anidado-plano button-base-bg-red"
                  >
                    <BsFillEraserFill
                      size="2rem"
                      className="button-base-icon"
                    />
                  </button>
                  <button
                    id="buttonSaveDetalle"
                    name="buttonSaveDetalle"
                    title="Presione [ALT + D] para guardar el detalle."
                    accessKey="d"
                    onClick={handleSave}
                    onKeyDown={handleKeyDown}
                    disabled={data.tipo === "consultar"}
                    className="button-base-anidado button-base-bg-secondary"
                  >
                    <FaPlus size="2rem" className="button-base-icon" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Table
        data={table}
        columns={columns}
        doubleClick={false}
        pagination={false}
        selectable={false}
        border={true}
        tableClassName="movimiento-bancario-detalle-table"
      />
    </div>
  );
};

export default MovimientoBancarioDetalle;
