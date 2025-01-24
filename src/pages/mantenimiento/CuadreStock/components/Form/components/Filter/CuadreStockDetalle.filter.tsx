/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce, useGlobalContext } from "../../../../../../../hooks";
import {
  defaultCuadreStockDetalleFilter,
  ICuadreStockDetalle,
  ICuadreStockDetalleFilter,
  ICuadreStockDetalleTable,
} from "../../../../../../../models";
import {
  get,
  getListar,
  handleResetContext,
  handleSetErrorMensaje,
} from "../../../../../../../util";
import { BasicKeyHandler } from "../../../../../../../components";

interface IProps {
  dataDetalles: ICuadreStockDetalle[];

  setDataDetalles: React.Dispatch<React.SetStateAction<ICuadreStockDetalle[]>>;
}

const CuadreStockDetalleFilter: React.FC<IProps> = ({
  dataDetalles,
  setDataDetalles,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, mensajes } = globalContext;
  const { primer } = modal;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  const [filter, setFilter] = useState<ICuadreStockDetalleFilter>(
    defaultCuadreStockDetalleFilter
  );
  const search = useDebounce(filter);
  const [dataCompleta, setDataCompleta] = useState<ICuadreStockDetalleTable[]>(
    []
  );

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
    // try {
    //   const urlParams = new URLSearchParams({
    //     codigoBarras: search.codigoBarras,
    //     subLineaDescripcion: search.subLineaDescripcion,
    //     descripcion: search.descripcion,
    //   });
    //   const response: ICuadreStockDetalleTable[] = await get({
    //     globalContext,
    //     menu: "Almacen/CuadreStock/GetDetalles",
    //     urlParams,
    //   });
    //   console.log(response, "response");
    //   setDataCompleta(response);
    //   setGlobalContext((x) => ({
    //     ...x,
    //     table: { ...x.table, data: response, total: response.length },
    //   }));
    // } catch (error) {
    //   handleSetErrorMensaje(setGlobalContext, error);
    // }
  };

  const handleFiltrar = (): void => {
    const filtrado = dataDetalles.filter((x) => {
      const descripcionMatch = x.descripcion
        .toLowerCase()
        .includes(filter.descripcion.toLowerCase());

      const subLineaMatch = x.subLineaDescripcion
        .toLowerCase()
        .includes(filter.subLineaDescripcion.toLowerCase());

      const codigoBarrasMatch = x.codigoBarras
        .toLowerCase()
        .includes(filter.codigoBarras.toLowerCase());

      return descripcionMatch && subLineaMatch && codigoBarrasMatch;
    });
    setDataDetalles(filtrado);
  };
  return (
    <div className="filter-base">
      <span className="filter-base-text">Filtrar por</span>
      <BasicKeyHandler selector="cuadre-stock-detalle-filter">
        <div className="input-base-row cuadre-stock-detalle-filter">
          <div className="input-base-container-33">
            <label htmlFor="codigoBarrasFilter" className="label-base">
              Código de Barras
            </label>
            <input
              id="codigoBarrasFilter"
              name="codigoBarras"
              placeholder="Código de Barras"
              value={filter.codigoBarras}
              onChange={handleData}
              autoComplete="off"
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="subLineaDescripcionFilter" className="label-base">
              Sub-Linea
            </label>
            <input
              id="subLineaDescripcionFilter"
              name="subLineaDescripcion"
              placeholder="Sub-Linea"
              value={filter.subLineaDescripcion}
              onChange={handleData}
              autoComplete="off"
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
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

export default CuadreStockDetalleFilter;
