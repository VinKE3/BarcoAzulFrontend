/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ChangeEvent, useEffect, useState } from "react";
import { BasicKeyHandler } from "../../../../../components";
import { useDebounce, useGlobalContext } from "../../../../../hooks";
import {
  IDocumentoCompraCuentaCorriente,
  IMovimientoBancarioFilter,
  IMovimientoBancarioTable,
  defaultMovimientoBancarioFilter,
} from "../../../../../models";
import {
  getListar,
  handleInputType,
  handleSetErrorMensaje,
  resetPagination,
} from "../../../../../util";

interface IProps {
  tablas: IDocumentoCompraCuentaCorriente[];
}
const MovimientoBancarioFilter: React.FC<IProps> = ({ tablas }) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { table, modal, mensajes } = globalContext;
  const { primer } = modal;
  const { pagina } = table;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  const [filter, setFilter] = useState<IMovimientoBancarioFilter>(
    defaultMovimientoBancarioFilter
  );
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
  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    resetPagination(setGlobalContext);
    setFilter((x) => ({ ...x, [name]: value }));
  };

  const handleListar = async (): Promise<void> => {
    try {
      const params = new URLSearchParams({
        concepto: search.concepto,
        cuentaCorrienteId: search.cuentaCorrienteId,
        fechaInicio: search.fechaInicio,
        fechaFin: search.fechaFin,
      });
      const {
        data,
        total,
      }: { data: IMovimientoBancarioTable[]; total: number } = await getListar(
        globalContext,
        params
      );
      setGlobalContext((x) => ({ ...x, table: { ...x.table, data, total } }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };
  //#endregion
  return (
    <div className="filter-base">
      <span className="filter-base-text">Filtrar por</span>
      <BasicKeyHandler selector="articulo-filter">
        <div className="input-base-row">
          <div className="input-base-container-33 articulo-filter">
            <div className="input-base-container-75">
              <label htmlFor="conceptoFilter" className="label-base">
                Concepto
              </label>
              <input
                id="conceptoFilter"
                name="concepto"
                placeholder="Descripción"
                value={filter.concepto}
                onChange={handleData}
                autoComplete="off"
                className="input-base"
              />
            </div>
          </div>
          <div className="input-base-container-50">
            <label htmlFor="cuentaCorrienteId" className="label-base">
              Cuenta Corriente
            </label>
            <select
              id="cuentaCorrienteId"
              name="cuentaCorrienteId"
              value={filter.cuentaCorrienteId}
              onChange={handleData}
              className="input-base"
            >
              {tablas.map((x) => (
                <option key={x.cuentaCorrienteId} value={x.cuentaCorrienteId}>
                  {x.entidadBancariaNombre}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-20">
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
          <div className="input-base-container-20">
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

export default MovimientoBancarioFilter;
