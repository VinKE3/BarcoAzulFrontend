import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce, useGlobalContext } from "../../../../hooks";
import {
  IPedidoFind,
  IPedidoFindFilter,
  IPedidoFindModal,
  IPedidoFindTable,
  defaultPedidoFindFilter,
} from "../../../../models";
import { getListar, handleFocus, handleInputType, handleSetErrorMensaje, handleSetRetorno } from "../../../../util";
import { TableKeyHandler } from "../../../Keys";
import { ModalHelp } from "../../../Modal";
import usePedidoFindModalColumn from "./pedidoFindModal.column";

const PedidoFindModal: React.FC<IPedidoFindModal> = ({ inputFocus }) => {
  //#region useState
  const menu: string = "Venta/Pedido";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { inputs } = extra.element;

  const [filter, setFilter] = useState<IPedidoFindFilter>(defaultPedidoFindFilter);
  const search = useDebounce(filter);
  const [data, setData] = useState<IPedidoFindTable[]>([]);
  const columns = usePedidoFindModalColumn(inputFocus);
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
        fechaInicio: search.fechaInicio,
        fechaFin: search.fechaFin,
        numeroDocumento: search.numeroDocumento,
        soloPendientes: "true",
      });
      const { data }: { data: IPedidoFindTable[] } = await getListar(globalContext, params, menu);
      setData(data);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "help");
    }
  };

  const tableKeyDown = (row: IPedidoFindTable): void => {
    const retorno: IPedidoFind = { ...row, origen: "pedidoFind" };
    handleSetRetorno(setGlobalContext, retorno);
    inputs[inputFocus] && handleFocus(inputs[inputFocus]);
  };
  //#endregion

  return (
    <TableKeyHandler selector="pedido-find-modal">
      <ModalHelp
        data={data}
        columns={columns}
        handleKeyDown={tableKeyDown}
        title="Consultar Pedidos"
        inputFocus={inputFocus}
        classNameModal="pedido-find-modal md:max-h-[80%] md:w-[50%]"
        classNameTable="pedido-find-modal-table"
      >
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="numeroDocumentoFilter" className="label-base">
              Documento
            </label>
            <input
              id="numeroDocumentoFilter"
              name="numeroDocumento"
              placeholder="Documento"
              value={filter.numeroDocumento}
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

export default PedidoFindModal;
