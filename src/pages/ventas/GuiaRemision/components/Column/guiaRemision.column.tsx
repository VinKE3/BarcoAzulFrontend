// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IGuiaRemisionTable } from "../../../../../models";
import { handleNumber, handleFormatRowDate } from "../../../../../util";

const useGuiaRemisionColumn = (): Column<IGuiaRemisionTable>[] => {
  return useMemo<Column<IGuiaRemisionTable>[]>(
    () => [
      {
        Header: "Fecha",
        accessor: "fechaEmision",
        Cell: ({ value }: { value: string }) => {
          return (
            <p className="table-body-td-center">{handleFormatRowDate(value)}</p>
          );
        },
      },
      {
        Header: "Documento",
        accessor: "numeroDocumento",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Razón Social",
        accessor: "clienteNombre",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "RUC/DNI",
        accessor: "clienteNumero",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Placa",
        accessor: "placa",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "S",
        accessor: "afectarStock",
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
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IGuiaRemisionTable } }) => (
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

export default useGuiaRemisionColumn;
