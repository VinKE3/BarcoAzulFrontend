import { useGlobalContext } from "../../../../hooks";
import { IPrecioFind, IPrecioFindModal, IPrecioFindTable } from "../../../../models";
import { handleFocus, handleSetRetorno } from "../../../../util";
import { ModalHelp } from "../../../Modal";
import usePrecioFindModalColumn from "./precioFindModal.column";

const PrecioFindModal : React.FC<IPrecioFindModal> = ({ articulo, inputFocus }) => {
    //#region useState
    const { globalContext, setGlobalContext } = useGlobalContext();
    const { extra } = globalContext;
    const { inputs } = extra.element;
    const columns = usePrecioFindModalColumn(inputFocus);
    const { descripcion, precioVenta1, precioVenta2, precioVenta3, precioVenta4 } = articulo;
    const newData = [
      { id: "precioVenta1", precio: precioVenta1 },
      { id: "precioVenta2", precio: precioVenta2 },
      { id: "precioVenta3", precio: precioVenta3 },
      { id: "precioVenta4", precio: precioVenta4 },
    ];
    //#endregion

     //#region Funciones
  const handleKeyDown = (row: IPrecioFindTable): void => {
    const retorno: IPrecioFind = { ...row, origen: "precioFind" };
    handleSetRetorno(setGlobalContext, retorno);
    inputs[inputFocus] && handleFocus(inputs[inputFocus]);
  };
  //#endregion
  return (
    <ModalHelp
    modalProp="segundo"
    data={newData}
    columns={columns}
    handleKeyDown={handleKeyDown}
    title={`${descripcion} - Precios`}
    alwaysSelected={false}
    classNameModal="precio-find-modal md:min-w-[20%] md:w-[35%]"
    classNameTable="precio-find-modal-table"
  />
  )
}

export default PrecioFindModal