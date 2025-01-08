import { ChangeEvent, useEffect, useState } from "react";
import { FaKitMedical } from "react-icons/fa6";
import { SiShutterstock } from "react-icons/si";
import { useDebounce, useGlobalContext } from "../../../../hooks";
import {
  defaultArticuloFindAdicional,
  defaultArticuloFindFilter,
  IArticuloFind,
  IArticuloFindAdicional,
  IArticuloFindFilter,
  IArticuloFindModal,
  IArticuloFindTable,
  IStockFindTable,
} from "../../../../models";
import {
  get,
  handleFocus,
  handleInitialData,
  handleInputType,
  handleResetMensajeError,
  handleSetErrorMensaje,
  handleSetRetorno,
} from "../../../../util";
import { TableKeyHandler } from "../../../Keys";
import { ModalHelp } from "../../../Modal";
import { Table } from "../../../Table";
import { SelectButton } from "../../SelectButton";
import { ArticuloAlternativoFindModal } from "../ArticuloAlternativo";
import { StockFindModal } from "../Stock";
import useArticuloFindColumn from "./articuloFindModal.column";

const ArticuloFindModal: React.FC<IArticuloFindModal> = ({
  inputFocus,
  almacenId,
}) => {
  //#region useState
  const menu: string = "Mantenimiento/Articulo/Buscar";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, extra } = globalContext;
  const { retorno } = form;
  const { tercer } = modal;
  const { row } = globalContext.table;
  const { inputs } = extra.element;

  const [filter, setFilter] = useState<IArticuloFindFilter>(
    defaultArticuloFindFilter
  );
  const [data, setData] = useState<IArticuloFindTable[]>([]);
  const [adicional, setAdicional] = useState<IArticuloFindAdicional>(
    defaultArticuloFindAdicional
  );
  const search = useDebounce(filter);
  const columns = useArticuloFindColumn(inputFocus);
  //#endregion

  //#region useEffect
  useEffect(() => {
    modal.tercer.tipo && handleModalTercero(retorno as string);
  }, [modal.tercer]);

  useEffect(() => {
    retorno &&
      retorno.origen === "articuloAlternativoFind" &&
      tableKeyDown(retorno);
  }, [retorno]);

  useEffect(() => {
    handleListarDataVenta();
  }, [search]);

  useEffect(() => {
    data.length > 0 && handleArticuloAdicional(row as number);
  }, [data, row]);
  //#endregion

  //#region Funciones
  const handleDataVenta = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setFilter((x) => ({ ...x, [name]: value }));
  };

  const handleListarDataVenta = async (): Promise<void> => {
    try {
      const urlParams = new URLSearchParams({
        almacenId: almacenId,
        descripcion: search.descripcion,
      });
      const { data }: { data: IArticuloFindTable[] } = await get({
        globalContext,
        menu,
        urlParams,
      });
      setData(data);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "help");
    }
  };

  const handleAdicional = async (name: string, data: any): Promise<void> => {
    setAdicional((x) => ({ ...x, [name]: data }));
  };

  const handleArticuloAdicional = async (row: number): Promise<void> => {
    const fila = data[row];
    handleAdicional("articulo", fila);
  };

  const handleModalTercero = async (origen: string): Promise<void> => {
    switch (origen) {
      case "stock": {
        const menu: string = "Mantenimiento/Articulo/GetStockPorAlmacen";
        const urlParams = new URLSearchParams({
          id: modal.tercer.id as string,
        });
        const data: IStockFindTable[] = await get({
          globalContext,
          menu,
          urlParams,
        });
        handleAdicional(origen, data);
        break;
      }
      case "farma":
      case "grupo": {
        const menu =
          origen === "farma"
            ? "Mantenimiento/Farmacologia"
            : "Mantenimiento/GrupoFarmacologico";
        await handleInitialData(globalContext, null, "tercer", menu)
          .then((response) => {
            setGlobalContext((x) => ({
              ...x,
              api: { ...x.api, origen: "form" },
            }));
            handleAdicional(origen, response);
          })
          .catch((error) => {
            handleResetMensajeError(
              setGlobalContext,
              true,
              true,
              error,
              "help"
            );
          });
        break;
      }

      default: {
        break;
      }
    }
  };

  // const handleCloseSubModal = (): void => {
  //   handleClearModalProp(setGlobalContext, "tercer", false, true);
  // };

  const tableKeyDown = (row: IArticuloFindTable): void => {
    const retorno: IArticuloFind = { ...row, origen: "articuloFind" };
    handleSetRetorno(setGlobalContext, retorno);
    inputs[inputFocus] && handleFocus(inputs[inputFocus]);
  };
  //#endregion

  return (
    <TableKeyHandler selector="articulo-find-modal">
      <ModalHelp
        showTable={false}
        handleKeyDown={tableKeyDown}
        title="Consultar Artículos"
        inputFocus={inputFocus}
        classNameModal="articulo-find-modal md:min-h-fit md:min-w-[90%]"
      >
        <div className="card-base">
          <div className="card-base-container-full">
            <div className="input-base-row">
              <div className="input-base-container-100">
                <label htmlFor="descripcionFilter" className="label-base">
                  Descripción
                </label>
                <input
                  id="descripcionFilter"
                  name="descripcion"
                  placeholder="Descripción"
                  value={filter.descripcion}
                  onChange={handleDataVenta}
                  autoComplete="off"
                  autoFocus
                  className="input-base"
                />
              </div>
            </div>

            <Table
              data={data}
              columns={columns}
              doubleClick={false}
              pagination={false}
              alwaysSelected={true}
              onKeyDown={tableKeyDown}
              tableClassName="articulo-find"
            />
          </div>

          <div className="card-base-container-mini">
            <div className="card-base-block">
              <span className="card-base-label">Laboratorio</span>
              <span className="card-base-input">
                {adicional.articulo.lineaDescripcion ?? ""}
              </span>
            </div>
            <div className="card-base-block">
              <span className="card-base-label">Farmacología</span>
              <span className="card-base-input">
                {adicional.articulo.farmacologiaNombre ?? ""}
              </span>
            </div>
            <div className="card-base-block">
              <span className="card-base-label">Grupo Farmacológico</span>
              <span className="card-base-input">
                {adicional.articulo.grupoFarmacologicoDescripcion ?? ""}
              </span>
            </div>
            <div className="card-base-block">
              <div className="grid grid-cols-2">
                <span className="card-base-label">Stock Tiendas</span>
                <span className="card-base-label">Alternativos</span>
              </div>
              <div className="grid grid-cols-2">
                <div className="button-base-container-center">
                  <SelectButton
                    isSubModal={true}
                    subModalProp="tercer"
                    subModal={{ id: adicional.articulo.id, menu: "stock" }}
                    Icon={SiShutterstock}
                  />
                </div>
                <div className="button-base-container-center">
                  <SelectButton
                    isSubModal={true}
                    subModalProp="tercer"
                    subModal={{
                      id: adicional.articulo.id,
                      menu: "alternativo",
                    }}
                    Icon={FaKitMedical}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalHelp>

      {/* {tercer.tipo && retorno === "farma" && (
        <FarmacologiaModal
          customData={adicional.farmacologia}
          customModal={modal.tercer}
          onClose={handleCloseSubModal}
        />
      )}
      {tercer.tipo && retorno === "grupo" && (
        <GrupoFarmacologicoModal
          customData={adicional.grupoFarmacologico}
          customModal={modal.tercer}
          onClose={handleCloseSubModal}
        />
      )} */}
      {tercer.tipo && retorno === "stock" && (
        <StockFindModal
          title={
            data.find((x) => x.id === modal.tercer.id)?.descripcion as string
          }
          data={adicional.stock}
        />
      )}
      {tercer.tipo && retorno === "alternativo" && (
        <ArticuloAlternativoFindModal
          almacenId={almacenId}
          articulo={adicional.articulo}
          inputFocus={inputFocus}
        />
      )}
    </TableKeyHandler>
  );
};

export default ArticuloFindModal;
