// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { INotaPedidoTable } from "../../../../../models";
import { handleNumber, handleFormatRowDate } from "../../../../../util";

const useNotaPedidoColumn = (): Column<INotaPedidoTable>[] => {
  return useMemo<Column<INotaPedidoTable>[]>(
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
        Header: "Factura Nº",
        accessor: "documentoReferencia",
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
        Header: "Responsable",
        accessor: "personalNombre",
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
        Header: "Total",
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
        Header: "F",
        accessor: "isFacturado",
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
        Cell: ({ row }: { row: { original: INotaPedidoTable } }) => (
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

export default useNotaPedidoColumn;
