import { ModalHelp } from "../../..";
import { ITotalFindModal } from "../../../../models";
import useTotalFindModalColumn from "./totalFindModal.column";

const TotalFindModal: React.FC<ITotalFindModal> = ({ title, data }) => {
  //#region useState
  const columns = useTotalFindModalColumn();
  //#endregion

  return (
    <ModalHelp
      modalProp="segundo"
      data={data}
      columns={columns}
      selectable={false}
      alwaysSelected={false}
      clearRetorno={true}
      showFooter={false}
      title={`${title} - Totales`}
      classNameModal="total-find-modal md:min-w-[35%]"
      classNameTable="total-find-modal-table"
    />
  );
};

export default TotalFindModal;
