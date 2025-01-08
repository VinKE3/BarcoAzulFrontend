// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IProvinciaTable } from "../../../../../models";

const useProvinciaColumn = (): Column<IProvinciaTable>[] => {
  return useMemo<Column<IProvinciaTable>[]>(
    () => [
      { Header: "ID", accessor: "provinciaId" },
      {
        Header: "Departamento",
        accessor: "departamentoNombre",
      },
      {
        Header: "Provincia",
        accessor: "nombre",
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IProvinciaTable } }) => {
          const { departamentoId, provinciaId } = row.original;
          return <ActionBar id={departamentoId + provinciaId} rowData={row.original} isTablas={true} />;
        },
      },
    ],
    []
  );
};

export default useProvinciaColumn;
