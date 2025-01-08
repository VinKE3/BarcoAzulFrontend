// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { ICorrelativoTable } from "../../../../../models";

const useCorrelativoColumn = (): Column<ICorrelativoTable>[] => {
  return useMemo<Column<ICorrelativoTable>[]>(
    () => [
      {
        Header: "Tipo Documento",
        accessor: "tipoDocumentoId",
      },
      {
        Header: "Descripción",
        accessor: "tipoDocumentoDescripcion",
      },
      {
        Header: "Serie",
        accessor: "serie",
        Cell: ({ value }: { value: string }) => {
          return (
            <div className="flex justify-center">
              <p className={"main-table-badge-gray"}>{value}</p>
            </div>
          );
        },
      },
      {
        Header: "Número",
        accessor: "numero",
        Cell: ({ value }: { value: number }) => {
          return <p className="text-center">{value}</p>;
        },
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: ICorrelativoTable } }) => {
          const { tipoDocumentoId, serie } = row.original;
          return (
            <ActionBar id={`${tipoDocumentoId}/${serie}`} rowData={row.original} isTablas={true} showEliminar={false} />
          );
        },
      },
    ],
    []
  );
};

export default useCorrelativoColumn;
