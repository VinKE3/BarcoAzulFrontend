// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { ICuentaPorCobrarTable } from "../../../../../models";
import {
  handleFormatRowDate,
  handleMonedaRow,
  handleNumber,
} from "../../../../../util";

const useCuentaPorCobrarColumn = (): Column<ICuentaPorCobrarTable>[] => {
  return useMemo<Column<ICuentaPorCobrarTable>[]>(
    () => [
      {
        Header: "Documento",
        accessor: "numeroDocumento",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Fecha",
        accessor: "fechaEmision",
        Cell: ({ row }: { row: { original: ICuentaPorCobrarTable } }) => {
          const { fechaEmision } = row.original;

          return (
            <div className="table-base-td-multiple-center">
              <p>{handleFormatRowDate(fechaEmision)}</p>
            </div>
          );
        },
      },
      {
        Header: "Proveedor",
        accessor: "clienteNombre",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "M",
        accessor: "monedaId",
        Cell: ({ value }: { value: string }) => {
          return <p className="text-center">{handleMonedaRow(value)}</p>;
        },
      },
      {
        Header: "Total",
        accessor: "total",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-base-body-td-right">
              {handleNumber(value, false, true)}
            </p>
          );
        },
      },
      {
        Header: "Abonado",
        accessor: "abonado",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-base-body-td-right">
              {handleNumber(value, false, true)}
            </p>
          );
        },
      },
      {
        Header: "Saldo",
        accessor: "saldo",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-base-body-td-right">
              {handleNumber(value, false, true)}
            </p>
          );
        },
      },
      {
        Header: "Cancelado",
        accessor: "isCancelado",
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
        Cell: ({ row }: { row: { original: ICuentaPorCobrarTable } }) => (
          <ActionBar
            id={row.original.id}
            rowData={row.original}
            showModificar={false}
            showEliminar={false}
          />
        ),
      },
    ],
    []
  );
};

export default useCuentaPorCobrarColumn;
