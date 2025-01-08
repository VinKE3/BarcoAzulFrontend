/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { BasicKeyHandler } from "../../../../../components";
import { useDebounce, useGlobalContext } from "../../../../../hooks";
import {
  IMovimientoArticuloFilter,
  IMovimientoArticuloTable,
  defaultMovimientoArticuloFilter,
} from "../../../../../models";
import { getListar, handleSetErrorMensaje } from "../../../../../util";

const MovimientoArticuloFilter: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, mensajes } = globalContext;
  const { primer } = modal;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  const [filter, setFilter] = useState<IMovimientoArticuloFilter>(
    defaultMovimientoArticuloFilter
  );
  const search = useDebounce(filter);
  const estadosStock = [
    { Id: "", Descripcion: "TODOS" },
    { Id: "AL01-01-STOCK AGOTANDOSE", Descripcion: "STOCK AGOTANDOSE" },
    { Id: "AL02-02-STOCK SUFICIENTE", Descripcion: "STOCK SUFICIENTE" },
    { Id: "AL03-03-STOCK EXCESIVO", Descripcion: "STOCK EXCESIVO" },
    { Id: "AL04-04-SIN STOCK", Descripcion: "SIN STOCK" },
  ];
  const [dataCompleta, setDataCompleta] = useState<IMovimientoArticuloTable[]>(
    []
  );
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleListar();
  }, []);

  useEffect(() => {
    handleFiltrar();
  }, [search]);

  useEffect(() => {
    primer.id === null && mensaje.length > 0 && handleListar();
  }, [modal, mensajes]);
  //#endregion

  //#region Funciones
  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleListar = async (): Promise<void> => {
    try {
      const params = new URLSearchParams({
        estadoStock: search.estadoStock,
        descripcion: search.descripcion,
      });
      const response: IMovimientoArticuloTable[] = await getListar(
        globalContext,
        params
      );
      setDataCompleta(response);
      setGlobalContext((x) => ({
        ...x,
        table: { ...x.table, data: response, total: response.length },
      }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };
  const handleFiltrar = (): void => {
    const filtrado = dataCompleta.filter((x) => {
      const descripcionMatch = x.articuloDescripcion
        .toLowerCase()
        .includes(filter.descripcion.toLowerCase());

      const normalize = (value: string) => value.trim().toLowerCase();

      const estadoStockMatch = filter.estadoStock
        ? normalize(x.estadoStock) === normalize(filter.estadoStock)
        : true;
      return descripcionMatch && estadoStockMatch;
    });

    setGlobalContext((x) => ({
      ...x,
      table: { ...x.table, data: filtrado, total: filtrado.length },
    }));
  };

  return (
    <div className="filter-base">
      <span className="filter-base-text">Filtrar por</span>
      <BasicKeyHandler selector="articulo-filter">
        <div className="input-base-row articulo-filter">
          <div className="input-base-container-50">
            <label htmlFor="estadoStock" className="label-base">
              estadoStock
            </label>
            <select
              id="estadoStock"
              name="estadoStock"
              value={filter.estadoStock}
              onChange={handleData}
              className="input-base"
            >
              {estadosStock.map((x) => (
                <option key={x.Id} value={x.Id}>
                  {x.Descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-75">
            <label htmlFor="descripcionFilter" className="label-base">
              Descripción
            </label>
            <input
              id="descripcionFilter"
              name="descripcion"
              placeholder="Descripción"
              value={filter.descripcion}
              onChange={handleData}
              autoComplete="off"
              className="input-base"
            />
          </div>
        </div>
      </BasicKeyHandler>
    </div>
  );
};

export default MovimientoArticuloFilter;
