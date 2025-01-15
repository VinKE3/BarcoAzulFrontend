import { ChangeEvent, useEffect, useState } from "react";
import { FaCar } from "react-icons/fa6";
import {
  ModalForm,
  Table,
  TableKeyHandler,
} from "../../../../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../../../../hooks";
import {
  IGuiaRemisionVehiculo,
  defaultGuiaRemisionVehiculo,
} from "../../../../../../../../models";
import {
  handleClearMensajes,
  handleClearModalProp,
  handleFocus,
  handleInputType,
  handleSetInputs,
  handleSetTextos,
} from "../../../../../../../../util";
import useVehiculoGuiaColumn from "./vehiculoGuia.column";

interface IProp {
  dataVehiculo: IGuiaRemisionVehiculo[];
  handleVehiculos: (vehiculos: IGuiaRemisionVehiculo[]) => void;
}

const VehiculoGuiaModal: React.FC<IProp> = ({
  dataVehiculo,
  handleVehiculos,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form } = globalContext;
  const { segundo } = modal;
  const { retorno } = form;
  const columns = useVehiculoGuiaColumn(segundo.tipo);
  const [data, setData] = useState<IGuiaRemisionVehiculo>(
    defaultGuiaRemisionVehiculo
  );
  const [table, setTable] = useState<IGuiaRemisionVehiculo[]>(dataVehiculo);
  const inputs = useFocus("placa");
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);

  useEffect(() => {
    retorno &&
      retorno.origen === "vehiculoDetalle" &&
      handleActionBar(retorno as IGuiaRemisionVehiculo);
  }, [retorno]);

  useEffect(() => {
    handleVehiculos(table);
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

  const handleActionBar = (detalle: IGuiaRemisionVehiculo): void => {
    if (detalle.tipo === "eliminar") {
      handleCrudDetalles(detalle);
      return;
    }
    handleFocus(inputs["placa"]);
    setData({ ...detalle, tipo: detalle.tipo });
  };

  const handleCrudDetalles = (detalle: IGuiaRemisionVehiculo): void => {
    switch (detalle.tipo) {
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

  const handleAdd = (vehiculo: IGuiaRemisionVehiculo): void => {
    const nuevoDetalleId = table.length + 1;
    setTable((x) => [...x, { ...vehiculo, item: nuevoDetalleId }]);
  };

  const handleDelete = (vehiculo: IGuiaRemisionVehiculo): void => {
    const existeDetalle = table.find((x) => x.placa === vehiculo.placa);
    if (existeDetalle) {
      const nuevosDetalles = table.filter((x) => x.placa !== vehiculo.placa);

      const detallesActualizados = nuevosDetalles.map((x, index) => ({
        ...x,
        item: index + 1,
      }));

      setTable(detallesActualizados);
    }
  };

  const handleValidation = async (): Promise<boolean> => {
    await handleClearMensajes(setGlobalContext);

    const textos: string[] = [];
    const existe = table.find((x) => x.placa === data.placa);
    if (existe) {
      textos.push("El vehículo ya existe en el detalle, imposible registrar.");
    }

    // Validaciones específicas para el detalle general
    if (!data.placa) {
      textos.push("La placa es requerida");
    }
    if (
      !data.placa ||
      data.placa.trim().length !== 6 ||
      data.placa.includes("-")
    ) {
      textos.push(
        "La placa debe contener exactamente 6 caracteres sin espacios ni guiones."
      );
    }

    if (textos.length > 0) {
      handleSetTextos(setGlobalContext, "adicional", textos);
    }

    return textos.length === 0;
  };

  const handleSave = async (): Promise<void> => {
    const detalleValido = await handleValidation();
    if (!detalleValido) {
      handleFocus(inputs["placa"]);
      return;
    }

    handleCrudDetalles(data);
    handleClear();
  };

  const handleClear = (): void => {
    setData(defaultGuiaRemisionVehiculo);
    handleFocus(inputs["placa"]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (e.key === "Enter") handleSave();
  };
  //#endregion

  return (
    <ModalForm
      title="vehiculos"
      origenMensajes="adicional"
      replaceClose={true}
      onClose={() => handleClearModalProp(setGlobalContext, "segundo")}
      className="md:min-w-[450px]"
    >
      <TableKeyHandler selector="vehiculo-guia-modal" readButton={true}>
        <div className="filter-base vehiculo-guia-modal">
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
            <div className="input-base-container-20">
              <label htmlFor="placa" className="label-base">
                N° Placa
              </label>
              <input
                ref={inputs["placa"]}
                id="placa"
                name="placa"
                placeholder="N° Placa"
                value={data.placa ?? ""}
                onChange={handleData}
                autoComplete="off"
                autoFocus
                minLength={6}
                maxLength={6}
                className="input-base"
              />
            </div>
            <div className="input-base-container-100">
              <label htmlFor="vehiculoCodigo" className="label-base">
                Vehiculo Codigo
              </label>

              <div className="input-base-container-button">
                <input
                  id="vehiculoCodigo"
                  name="vehiculoCodigo"
                  placeholder="vehiculoCodigo"
                  value={data.vehiculoCodigo ?? ""}
                  onChange={handleData}
                  autoComplete="off"
                  disabled
                  className="input-base-button"
                />
                <button
                  id="buttonSaveVehiculo"
                  name="buttonSaveVehiculo"
                  title="Presione [ALT + A] para guardar registro."
                  accessKey="a"
                  onClick={handleSave}
                  onKeyDown={handleKeyDown}
                  disabled={data.tipo === "consultar"}
                  className="button-base-anidado button-base-bg-secondary"
                >
                  <FaCar size="2rem" className="button-base-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </TableKeyHandler>

      <Table
        tableClassName="vehiculo-guia-table"
        data={table}
        columns={columns}
        doubleClick={false}
        pagination={false}
        selectable={false}
      />
    </ModalForm>
  );
};

export default VehiculoGuiaModal;
