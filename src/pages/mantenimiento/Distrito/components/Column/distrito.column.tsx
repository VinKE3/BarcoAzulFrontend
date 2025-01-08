import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IDistritoTable } from "../../../../../models";

const useDistritoColumn = (): Column<IDistritoTable>[] => {
  return useMemo<Column<IDistritoTable>[]>(
    () => [
      { Header: "Departamento", accessor: "departamentoNombre" },
      { Header: "Provincia", accessor: "provinciaNombre" },
      { Header: "Distrito", accessor: "nombre" },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IDistritoTable } }) => {
          const { departamentoId, provinciaId, distritoId } = row.original;
          const newId = departamentoId + provinciaId + distritoId;
          return <ActionBar id={newId} rowData={row.original} isTablas={true} />;
        },
      },
    ],
    []
  );
};

export default useDistritoColumn;
