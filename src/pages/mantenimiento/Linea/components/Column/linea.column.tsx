// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { ILineaTable } from "../../../../../models";

const useLineaColumn = (): Column<ILineaTable>[] => {
  return useMemo<Column<ILineaTable>[]>(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Descripción",
        accessor: "descripcion",
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: ILineaTable } }) => (
          <ActionBar id={row.original.id} rowData={row.original} />
        ),
      },
    ],
    []
  );
};

export default useLineaColumn;
