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
  IVehiculo,
  IVehiculoFind,
} from "../../../../../../../../models";
import {
  getId,
  handleClearMensajes,
  handleClearModalProp,
  handleFocus,
  handleHelpModal,
  handleInputType,
  handleSetInputs,
  handleSetTextos,
} from "../../../../../../../../util";
import useVehiculoGuiaColumn from "./vehiculoGuia.column";
import { TbDeviceIpadSearch } from "react-icons/tb";

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
  const { api, modal, form } = globalContext;
  const { segundo } = modal;
  const { retorno } = form;
  const columns = useVehiculoGuiaColumn(segundo.tipo);
  const [data, setData] = useState<IGuiaRemisionVehiculo>(
    defaultGuiaRemisionVehiculo
  );
  const [table, setTable] = useState<IGuiaRemisionVehiculo[]>(dataVehiculo);
  const inputs = useFocus("numeroPlaca", "buttonSaveVehiculo");
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);

  useEffect(() => {
    retorno &&
      retorno.origen === "vehiculoDetalle" &&
      handleActionBar(retorno as IGuiaRemisionVehiculo);
    retorno &&
      retorno.origen === "vehiculoFind" &&
      handleVehiculoFind(retorno as IVehiculoFind);
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

  const handleVehiculoFind = async (find: IVehiculoFind): Promise<void> => {
    const vehiculoCompleto: IVehiculo = await getId(
      globalContext,
      find.id,
      "Mantenimiento/Vehiculo"
    );

    const { numeroPlaca, id } = vehiculoCompleto;

    setData((x) => ({
      ...x,
      numeroPlaca,
      vehiculoId: id,
    }));

    handleFocus(inputs["buttonSaveVehiculo"]);
  };

  const handleActionBar = (detalle: IGuiaRemisionVehiculo): void => {
    if (detalle.tipo === "eliminar") {
      handleCrudDetalles(detalle);
      return;
    }
    handleFocus(inputs["numeroPlaca"]);
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
    const existeDetalle = table.find(
      (x) => x.numeroPlaca === vehiculo.numeroPlaca
    );
    if (existeDetalle) {
      const nuevosDetalles = table.filter(
        (x) => x.numeroPlaca !== vehiculo.numeroPlaca
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
    const existe = table.find((x) => x.numeroPlaca === data.numeroPlaca);
    if (existe) {
      textos.push("El vehículo ya existe en el detalle, imposible registrar.");
    }

    // Validaciones específicas para el detalle general
    if (!data.numeroPlaca) {
      textos.push("La placa es requerida");
    }
    if (
      !data.numeroPlaca ||
      data.numeroPlaca.trim().length !== 6 ||
      data.numeroPlaca.includes("-")
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
      handleFocus(inputs["numeroPlaca"]);
      return;
    }

    handleCrudDetalles(data);
    handleClear();
  };

  const handleClear = (): void => {
    setData(defaultGuiaRemisionVehiculo);
    handleFocus(inputs["numeroPlaca"]);
  };

  const handleOpen = async (origen: string): Promise<void> => {
    await handleClearMensajes(setGlobalContext);

    switch (origen) {
      case "buttonVehiculoFind": {
        handleHelpModal(setGlobalContext, "vehiculoFind", "tercer");
        break;
      }
    }
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
              <label htmlFor="numeroPlaca" className="label-base">
                N° Placa
              </label>
              <input
                ref={inputs["numeroPlaca"]}
                id="numeroPlaca"
                name="numeroPlaca"
                placeholder="N° Placa"
                value={data.numeroPlaca ?? ""}
                onChange={handleData}
                autoComplete="off"
                autoFocus
                minLength={6}
                maxLength={6}
                className="input-base"
              />
            </div>
            <div className="input-base-container-100">
              <label htmlFor="VehiculoId" className="label-base">
                Vehiculo Id
              </label>
              <div className="input-base-container-button">
                <input
                  id="vehiculoId"
                  name="vehiculoId"
                  placeholder="vehiculoId"
                  value={data.vehiculoId ?? ""}
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
                  className="button-base-anidado-plano button-base-bg-secondary"
                >
                  <FaCar size="2rem" className="button-base-icon" />
                </button>
                <button
                  id="buttonVehiculoFind"
                  name="buttonVehiculoFind"
                  title="Presione [ALT + C] para adjuntar Vehiculo."
                  accessKey="c"
                  onClick={() => handleOpen("buttonVehiculoFind")}
                  onKeyDown={handleKeyDown}
                  disabled={data.tipo === "consultar"}
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
