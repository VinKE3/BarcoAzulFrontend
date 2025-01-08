import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce, useGlobalContext } from "../../../../hooks";
import {
  defaultArticuloAlternativoFilter,
  IArticuloAlternativoFilter,
  IArticuloAlternativoFindModal,
  IArticuloFind,
  IArticuloFindTable,
} from "../../../../models";
import { get, handleFocus, handleInputType, handleSetErrorMensaje, handleSetRetorno } from "../../../../util";
import { CheckBox } from "../../../Input";
import { TableKeyHandler } from "../../../Keys";
import { ModalHelp } from "../../../Modal";
import useArticuloAlternativoFindColumn from "./articuloAlternativoFindModal.column";

const ArticuloAlternativoFindModal: React.FC<IArticuloAlternativoFindModal> = ({ almacenId, articulo, inputFocus }) => {
  //#region useState
  const menu: string = "Mantenimiento/Articulo/Buscar";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { inputs } = extra.element;

  const [filter, setFilter] = useState<IArticuloAlternativoFilter>(defaultArticuloAlternativoFilter);
  const search = useDebounce(filter);
  const [data, setData] = useState<IArticuloFindTable[]>([]);
  const columns = useArticuloAlternativoFindColumn(inputFocus);
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleListar();
  }, [search]);
  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setFilter((x) => ({ ...x, [name]: value }));
  };

  const handleListar = async (): Promise<void> => {
    try {
      const urlParams = new URLSearchParams({
        almacenId: almacenId,
        articuloId: articulo.id,
        alternativo: search.isAlternativo.toString(),
        farmacologiaId: search.isFarmacologia ? articulo.farmacologiaId : " ",
        grupoFarmacologicoId: search.isGrupoFarmacologico ? articulo.grupoFarmacologicoId : " ",
        lineaId: search.isLaboratorio ? articulo.lineaId : " ",
        conStock: search.isStock.toString(),
      });
      const { data }: { data: IArticuloFindTable[] } = await get({ globalContext, menu, urlParams });
      setData(data);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "help");
    }
  };

  const tableKeyDown = (row: IArticuloFindTable): void => {
    const retorno: IArticuloFind = { ...row, origen: "articuloFind" };
    handleSetRetorno(setGlobalContext, retorno, "tercer");
    inputs[inputFocus] && handleFocus(inputs[inputFocus]);
  };
  //#endregion

  return (
    <TableKeyHandler selector="articulo-alternativo-find-modal">
      <ModalHelp
        modalProp="tercer"
        data={data}
        columns={columns}
        alwaysSelected={false}
        selectable={false}
        showFooter={false}
        handleKeyDown={tableKeyDown}
        inputFocus={inputFocus}
        title="Consultar Artículos Alternativos"
        classNameModal="articulo-alternativo-find-modal"
        classNameTable="articulo-alternativo-find-table"
      >
        <div className="filter-base">
          <span className="filter-base-text">Filtrar por</span>
          <div className="input-base-row">
            <div className="input-base-container-auto">
              <CheckBox
                id="isFarmacologia"
                value={filter.isFarmacologia}
                handleData={handleData}
                disabled={false}
                autoFocus={true}
                label="Farmacología (Genérico)"
              />
            </div>
            <div className="input-base-container-auto">
              <CheckBox
                id="isGrupoFarmacologico"
                value={filter.isGrupoFarmacologico}
                handleData={handleData}
                disabled={false}
                label="Grupo Farmacológico"
              />
            </div>
            <div className="input-base-container-auto">
              <CheckBox id="isLaboratorio" value={filter.isLaboratorio} handleData={handleData} disabled={false} label="Laboratorio" />
            </div>
            <div className="input-base-container-auto">
              <CheckBox id="isStock" value={filter.isStock} handleData={handleData} disabled={false} label="Solo con Stock" />
            </div>
          </div>
        </div>
      </ModalHelp>
    </TableKeyHandler>
  );
};

export default ArticuloAlternativoFindModal;
