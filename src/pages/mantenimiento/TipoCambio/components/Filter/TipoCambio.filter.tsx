import { ChangeEvent, useEffect, useState } from "react";
import { BasicKeyHandler } from "../../../../../components";
import { useDebounce, useGlobalContext } from "../../../../../hooks";
import { ITipoCambioFilter, ITipoCambioTable, defaultTipoCambioFilter } from "../../../../../models";
import { getListar, handleInputType, handleSetErrorMensaje, meses, resetPagination } from "../../../../../util";

const TipoCambioFilter: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { table, modal, mensajes } = globalContext;
  const { primer } = modal;
  const { pagina } = table;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  const [filter, setFilter] = useState<ITipoCambioFilter>(defaultTipoCambioFilter);
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
  const handleData = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    resetPagination(setGlobalContext);
    setFilter((x) => ({ ...x, [name]: value }));
  };

  const handleListar = async (): Promise<void> => {
    try {
      const params = new URLSearchParams({
        anio: search.anio,
        mes: search.mes,
      });
      const { data, total }: { data: ITipoCambioTable[]; total: number } = await getListar(globalContext, params);
      setGlobalContext((x) => ({ ...x, table: { ...x.table, data, total } }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };
  //#endregion

  return (
    <div className="filter-base">
      <span className="filter-base-text">Filtrar por</span>
      <BasicKeyHandler selector="tipo-cambio-filter">
        <div className="input-base-row tipo-cambio-filter">
          <div className="input-base-container-50">
            <label htmlFor="anio" className="label-base">
              Año
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="anio"
              name="anio"
              autoFocus
              min={2000}
              value={filter.anio}
              onChange={handleData}
              className="input-base"
            />
          </div>
          <div className="input-base-container-50">
            <label htmlFor="mes" className="label-base">
              Mes
            </label>
            <select id="mes" name="mes" value={filter.mes} onChange={handleData} className="input-base">
              {meses.map((x) => (
                <option key={x.numero} value={x.numero}>
                  {x.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </BasicKeyHandler>
    </div>
  );
};
export default TipoCambioFilter;
