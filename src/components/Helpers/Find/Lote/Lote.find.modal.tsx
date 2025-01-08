import { ChangeEvent, useEffect, useState } from "react";
import { useLoteFindModalColumn } from ".";
import { useDebounce, useGlobalContext } from "../../../../hooks";
import { ILoteFind, ILoteFindFilter, ILoteFindModal, ILoteFindTable, defaultLoteFindFilter } from "../../../../models";
import { get, handleFocus, handleInputType, handleSetErrorMensaje, handleSetRetorno } from "../../../../util";
import { TableKeyHandler } from "../../../Keys";
import { ModalHelp } from "../../../Modal";

const LoteFindModal: React.FC<ILoteFindModal> = ({ almacenId, detalle, inputFocus, venta = true }) => {
  //#region useState
  const menu: string = "Mantenimiento/Lote/ListarPorArticuloYAlmacen";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { inputs } = extra.element;

  const [filter, setFilter] = useState<ILoteFindFilter>(defaultLoteFindFilter);
  const search = useDebounce(filter);
  const [data, setData] = useState<ILoteFindTable[]>([]);
  const columns = useLoteFindModalColumn(inputFocus);
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
      const urlParams = new URLSearchParams({
        almacenId: almacenId,
        articuloId: detalle.articuloId,
        soloHabilitadosParaVenta: venta.toString(),
        numero: search.numero,
      });
      const { data }: { data: ILoteFindTable[] } = await get({ globalContext, menu, urlParams });
      setData(data);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "help");
    }
  };

  const tableKeyDown = (row: ILoteFindTable): void => {
    const retorno: ILoteFind = { ...row, origen: "loteFind" };
    handleSetRetorno(setGlobalContext, retorno);
    inputs[inputFocus] && handleFocus(inputs[inputFocus]);
  };

  //#endregion

  return (
    <TableKeyHandler selector="lote-find-modal" readButton={false}>
      <ModalHelp
        data={data}
        columns={columns}
        showFooter={false}
        handleKeyDown={tableKeyDown}
        title={`Consultar Lotes - ${detalle.descripcion}`}
        inputFocus={inputFocus}
        classNameModal="lote-find-modal md:min-w-[35%]"
        classNameTable="lote-find-modal-table"
      >
        <div className="input-base-row">
          <div className="input-base-container-100">
            <label htmlFor="numeroFilter" className="label-base">
              Número
            </label>
            <input
              id="numeroFilter"
              name="numero"
              placeholder="Número"
              value={filter.numero}
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

export default LoteFindModal;
