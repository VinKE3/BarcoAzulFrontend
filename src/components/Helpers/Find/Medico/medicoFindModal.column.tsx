// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { IMedicoFindTable } from "../../../../models";
import { SelectButton } from "../../SelectButton";

const useMedicoFindModalColumn = (inputFocus: string): Column<IMedicoFindTable>[] => {
  return useMemo<Column<IMedicoFindTable>[]>(
    () => [
      {
        Header: "CMP",
        accessor: "cmp",
      },
      {
        Header: "Nombres",
        accessor: "nombres",
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IMedicoFindTable } }) => (
          <div className="button-select-base-container">
            <SelectButton retorno={{ ...row.original, origen: "medicoFind" }} inputFocus={inputFocus} />
          </div>
        ),
      },
    ],
    []
  );
};

export default useMedicoFindModalColumn;
