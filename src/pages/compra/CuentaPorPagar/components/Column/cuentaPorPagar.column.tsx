// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { ICuentaPorPagarTable } from "../../../../../models";
import {
  handleFormatRowDate,
  handleMonedaRow,
  handleNumber,
} from "../../../../../util";

const useCuentaPorPagarColumn = (): Column<ICuentaPorPagarTable>[] => {
  return useMemo<Column<ICuentaPorPagarTable>[]>(
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
        accessor: "fechaContable",
        Cell: ({ row }: { row: { original: ICuentaPorPagarTable } }) => {
          const { fechaContable } = row.original;

          return (
            <div className="table-base-td-multiple-center">
              <p>{handleFormatRowDate(fechaContable)}</p>
            </div>
          );
        },
      },
      {
        Header: "Proveedor",
        accessor: "proveedorNombre",
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
        Cell: ({ row }: { row: { original: ICuentaPorPagarTable } }) => (
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

export default useCuentaPorPagarColumn;
