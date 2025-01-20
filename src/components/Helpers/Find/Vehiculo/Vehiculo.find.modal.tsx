import { ChangeEvent, useEffect, useState } from "react";
import { useVehiculoFindModalColumn } from ".";
import { useDebounce, useGlobalContext } from "../../../../hooks";
import {
  IVehiculoFind,
  IVehiculoFindFilter,
  IVehiculoFindModal,
  IVehiculoFindTable,
  defaultVehiculoFindFilter,
} from "../../../../models";
import {
  getListar,
  handleFocus,
  handleInputType,
  handleSetErrorMensaje,
  handleSetRetorno,
} from "../../../../util";
import { TableKeyHandler } from "../../../Keys";
import { ModalHelp } from "../../../Modal";

const VehiculoFindModal: React.FC<IVehiculoFindModal> = ({ inputFocus }) => {
  //#region useState
  const menu: string = "Mantenimiento/Vehiculo";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { inputs } = extra.element;

  const [filter, setFilter] = useState<IVehiculoFindFilter>(
    defaultVehiculoFindFilter
  );
  const search = useDebounce(filter);
  const [data, setData] = useState<IVehiculoFindTable[]>([]);
  const columns = useVehiculoFindModalColumn();
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleListar();
  }, [search]);
  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setFilter((x) => ({ ...x, [name]: value }));
  };

  const handleListar = async (): Promise<void> => {
    try {
      const params = new URLSearchParams({
        numeroPlaca: search.numeroPlaca,
      });
      const { data }: { data: IVehiculoFindTable[] } = await getListar(
        globalContext,
        params,
        menu
      );
      setData(data);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "help");
    }
  };

  //Función que toma los datos de la fila cuando se presiona Enter
  const tableKeyDown = (row: IVehiculoFindTable): void => {
    const retorno: IVehiculoFind = { ...row, origen: "vehiculoFind" };
    handleSetRetorno(setGlobalContext, retorno, "tercer");
    inputs[inputFocus] && handleFocus(inputs[inputFocus]);
  };
  //#endregion
  return (
    <TableKeyHandler selector="vehiculo-find-modal">
      <ModalHelp
        modalProp="tercer"
        data={data}
        columns={columns}
        handleKeyDown={tableKeyDown}
        title={`Consultar Vehiculo`}
        inputFocus={inputFocus}
        classNameModal="vehiculo-find-modal"
        classNameTable="vehiculo-find-modal-table"
      >
        <div className="input-base-row">
          <div className="input-base-container-50">
            <label htmlFor="numeroPlacaFilter" className="label-base">
              Placa
            </label>
            <input
              id="numeroPlacaFilter"
              name="numeroPlaca"
              placeholder="Placa"
              value={filter.numeroPlaca}
              onChange={handleData}
              autoComplete="off"
              autoFocus
              className="input-base"
            />
          </div>
        </div>
      </ModalHelp>
    </TableKeyHandler>
  );
};

export default VehiculoFindModal;
