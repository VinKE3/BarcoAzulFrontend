// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { ISubLineaTable } from "../../../../../models";

const useSubLineaColumn = (): Column<ISubLineaTable>[] => {
  return useMemo<Column<ISubLineaTable>[]>(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Nombre",
        accessor: "descripcion",
      },
      {
        Header: "Línea",
        accessor: "lineaDescripcion",
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: ISubLineaTable } }) => (
          <ActionBar
            id={row.original.id}
            rowData={row.original}
            isTablas={true}
          />
        ),
      },
    ],
    []
  );
};

export default useSubLineaColumn;
