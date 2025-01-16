import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce, useGlobalContext } from "../../../../hooks";
import {
  INotaPedidoFind,
  INotaPedidoFindFilter,
  INotaPedidoFindModal,
  INotaPedidoFindTable,
  defaultNotaPedidoFindFilter,
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
import useNotaPedidoFindModalColumn from "./notaPedidoFindModal.column";

const NotaPedidoFindModal: React.FC<INotaPedidoFindModal> = ({
  inputFocus,
}) => {
  //#region useState
  const menu: string = "Venta/NotaPedido";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { element, simplificado } = extra;
  const { fechaFin, fechaInicio } = simplificado;
  const { inputs } = element;

  const [filter, setFilter] = useState<INotaPedidoFindFilter>({
    ...defaultNotaPedidoFindFilter,
    fechaInicio: fechaInicio,
    fechaFin: fechaFin,
  });
  const search = useDebounce(filter);
  const [data, setData] = useState<INotaPedidoFindTable[]>([]);
  const columns = useNotaPedidoFindModalColumn(inputFocus);
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleListar();
  }, [search]);

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setFilter((x) => ({ ...x, [name]: value }));
  };

  const handleListar = async (): Promise<void> => {
    try {
      const params = new URLSearchParams({
        fechaInicio: search.fechaInicio,
        fechaFin: search.fechaFin,
        clienteNombre: search.clienteNombre,
      });
      const { data }: { data: INotaPedidoFindTable[] } = await getListar(
        globalContext,
        params,
        menu
      );
      setData(data);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "help");
    }
  };

  const handleKeyDown = (row: INotaPedidoFindTable): void => {
    const retorno: INotaPedidoFind = { ...row, origen: "notaPedidoFind" };
    handleSetRetorno(setGlobalContext, retorno);
    inputs[inputFocus] && handleFocus(inputs[inputFocus]);
  };
  //#endregion

  return (
    <TableKeyHandler selector="nota-pedido-find-modal">
      <ModalHelp
        data={data}
        columns={columns}
        handleKeyDown={handleKeyDown}
        title="Consultar Notas de Pedido"
        inputFocus={inputFocus}
        classNameModal="nota-pedido-find-modal md:min-w-[40%]"
        classNameTable="nota-pedido-find-modal-table"
      >
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="clienteNombreFilter" className="label-base">
              Cliente
            </label>
            <input
              id="clienteNombreFilter"
              name="clienteNombre"
              placeholder="Cliente"
              value={filter.clienteNombre}
              onChange={handleData}
              autoComplete="off"
              autoFocus
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="fechaInicio" className="label-base">
              Desde
            </label>
            <input
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              value={filter.fechaInicio}
              onChange={handleData}
              className="input-base"
            />
          </div>

          <div className="input-base-container-33">
            <label htmlFor="fechaFin" className="label-base">
              Hasta
            </label>
            <input
              type="date"
              id="fechaFin"
              name="fechaFin"
              value={filter.fechaFin}
              onChange={handleData}
              className="input-base"
            />
          </div>
        </div>
      </ModalHelp>
    </TableKeyHandler>
  );
};

export default NotaPedidoFindModal;
