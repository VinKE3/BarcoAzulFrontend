import { ChangeEvent, useEffect, useState } from "react";
import { BasicKeyHandler } from "../../../../../components";
import { useDebounce, useGlobalContext } from "../../../../../hooks";
import {
  IDocumentoCompraFilter,
  IDocumentoCompraTable,
  defaultDocumentoCompraFilter,
} from "../../../../../models";
import {
  getListar,
  handleInputType,
  handleSetErrorMensaje,
  resetPagination,
} from "../../../../../util";

const DocumentoCompraFilter: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { table, modal, mensajes } = globalContext;
  const { primer } = modal;
  const { pagina } = table;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  const [filter, setFilter] = useState<IDocumentoCompraFilter>(
    defaultDocumentoCompraFilter
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
  const handleData = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    resetPagination(setGlobalContext);
    setFilter((x) => ({ ...x, [name]: value }));
  };

  const handleListar = async (): Promise<void> => {
    try {
      const params = new URLSearchParams({
        proveedor: search.proveedor,
        fechaInicio: search.fechaInicio,
        fechaFin: search.fechaFin,
      });
      const { data, total }: { data: IDocumentoCompraTable[]; total: number } =
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
      <BasicKeyHandler selector="articulo-filter">
        <div className="input-base-row">
          <div className="input-base-container-33 articulo-filter">
            <div className="input-base-container-75">
              <label htmlFor="proveedorFilter" className="label-base">
                Proveedor
              </label>
              <input
                id="proveedorFilter"
                name="proveedor"
                placeholder="Descripción"
                value={filter.proveedor}
                onChange={handleData}
                autoComplete="off"
                className="input-base"
              />
            </div>
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

export default DocumentoCompraFilter;
