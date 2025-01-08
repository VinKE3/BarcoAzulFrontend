import { useEffect } from "react";
import { useGlobalContext } from "../../../../../hooks";
import { ICorrelativoTable } from "../../../../../models";
import { getListar, handleSetErrorMensaje } from "../../../../../util";

const CorrelativoFilter: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { table, modal, mensajes } = globalContext;
  const { primer } = modal;
  const { pagina } = table;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleListar();
  }, [pagina]);

  useEffect(() => {
    primer.id === null && mensaje.length > 0 && handleListar();
  }, [modal, mensajes]);
  //#endregion

  //#region Funciones
  const handleListar = async (): Promise<void> => {
    try {
      const { data, total }: { data: ICorrelativoTable[]; total: number } = await getListar(globalContext);
      setGlobalContext((x) => ({ ...x, table: { ...x.table, data, total } }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };
  //#endregion

  return null;
};
export default CorrelativoFilter;
