// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { ISalidaArticulosTable } from "../../../../../models";
import { handleNumber } from "../../../../../util";

const useSalidaArticulosColumn = (): Column<ISalidaArticulosTable>[] => {
  return useMemo<Column<ISalidaArticulosTable>[]>(
    () => [
      {
        Header: "Documento",
        accessor: "numeroDocumento",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Responsable",
        accessor: "personalNombre",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Concepto",
        accessor: "concepto",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Observación",
        accessor: "observacion",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "M",
        accessor: "monedaId",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Cantidad",
        accessor: "total",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-base-body-td-right">
              {handleNumber(value, true, true)}
            </p>
          );
        },
      },
      {
        Header: "B",
        accessor: "isBloqueado",
        Cell: ({ value }: { value: boolean }) => {
          return (
            <div className="flex justify-center">
              <p className={`badge-base-${value ? "red" : "gray"}`}>
                {value ? "Si" : "No"}
              </p>
            </div>
          );
        },
      },
      {
        Header: "A",
        accessor: "isAnulado",
        Cell: ({ value }: { value: boolean }) => {
          return (
            <div className="flex justify-center">
              <p className={`badge-base-${value ? "red" : "gray"}`}>
                {value ? "Si" : "No"}
              </p>
            </div>
          );
        },
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: ISalidaArticulosTable } }) => (
          <ActionBar
            id={row.original.id}
            rowData={row.original}
            isTablas={true}
            isPermitido={true}
          />
        ),
      },
    ],
    []
  );
};

export default useSalidaArticulosColumn;
