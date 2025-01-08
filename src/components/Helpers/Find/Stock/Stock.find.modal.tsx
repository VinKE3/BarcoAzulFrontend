import { IStockFindModal } from "../../../../models";
import { ModalHelp } from "../../../Modal";
import useStockFindModalColumn from "./stockFindModal.column";

const StockFindModal: React.FC<IStockFindModal> = ({ title, data }) => {
  //#region useState
  const columns = useStockFindModalColumn();
  //#endregion

  return (
    <>
      {title && (
        <ModalHelp
          modalProp="tercer"
          data={data}
          columns={columns}
          selectable={false}
          alwaysSelected={false}
          title={`${title} - Stock por almacén`}
          classNameModal="stock-find-modal md:min-w-[35%]"
          classNameTable="stock-find-modal-table"
        />
      )}
    </>
  );
};

export default StockFindModal;
