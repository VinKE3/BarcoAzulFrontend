import { ChangeEvent, useEffect, useState } from "react";
import { BasicKeyHandler } from "../../../../../components";
import { useDebounce, useGlobalContext } from "../../../../../hooks";
import {
  ICuadreStockFilter,
  ICuadreStockTable,
  defaultCuadreStockFilter,
} from "../../../../../models";
import {
  getListar,
  handleInputType,
  handleSetErrorMensaje,
  resetPagination,
} from "../../../../../util";

const CuadreStockFilter: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { table, modal, mensajes, extra } = globalContext;
  const { simplificado } = extra;
  const { fechaFin, fechaInicio } = simplificado;
  const { primer } = modal;
  const { pagina } = table;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  const [filter, setFilter] = useState<ICuadreStockFilter>({
    ...defaultCuadreStockFilter,
    fechaInicio: fechaInicio,
    fechaFin: fechaFin,
  });
  const search = useDebounce(filter);
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleListar();
  }, [search, pagina]);

  useEffect(() => {
    primer.id === null && mensaje.length > 0 && handleListar();
  }, [modal, mensajes]);
  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    resetPagination(setGlobalContext);
    setFilter((x) => ({ ...x, [name]: value }));
  };

  const handleListar = async (): Promise<void> => {
    try {
      const params = new URLSearchParams({
        fechaInicio: search.fechaInicio,
        fechaFin: search.fechaFin,
      });
      const { data, total }: { data: ICuadreStockTable[]; total: number } =
        await getListar(globalContext, params);
      setGlobalContext((x) => ({ ...x, table: { ...x.table, data, total } }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };
  //#endregion
  return (
    <div className="filter-base">
      <span className="filter-base-text">Filtrar por</span>
      <BasicKeyHandler selector="cuadre-stock-filter">
        <div className="input-base-row cuadre-stock-filter">
          <div className="input-base-container-50">
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
          <div className="input-base-container-50">
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
      </BasicKeyHandler>
    </div>
  );
};

export default CuadreStockFilter;
