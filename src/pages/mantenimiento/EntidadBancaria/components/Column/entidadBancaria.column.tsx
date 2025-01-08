// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IEntidadBancariaTable } from "../../../../../models";

const useEntidadBancariaColumn = (): Column<IEntidadBancariaTable>[] => {
  return useMemo<Column<IEntidadBancariaTable>[]>(
    () => [
      { Header: "Tipo", accessor: "tipo" },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IEntidadBancariaTable } }) => (
          <ActionBar id={row.original.id} rowData={row.original} isTablas={true} />
        ),
      },
    ],
    []
  );
};

export default useEntidadBancariaColumn;
