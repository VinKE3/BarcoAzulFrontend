// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IVehiculoTable } from "../../../../../models";

const useVehiculoColumn = (): Column<IVehiculoTable>[] => {
  return useMemo<Column<IVehiculoTable>[]>(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "N° Placa",
        accessor: "numeroPlaca",
      },
      {
        Header: "Marca",
        accessor: "marca",
      },
      {
        Header: "Empresa de transporte",
        accessor: "empresaTransporteNombre",
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IVehiculoTable } }) => (
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

export default useVehiculoColumn;
