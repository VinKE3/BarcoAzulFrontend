// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IDocumentoCompraTable } from "../../../../../models";
import { handleFormatRowDate } from "../../../../../util";
import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/20/solid";
const useDocumentoCompraColumn = (): Column<IDocumentoCompraTable>[] => {
  return useMemo<Column<IDocumentoCompraTable>[]>(
    () => [
      {
        Header: "Código",
        accessor: "id",
      },
      {
        Header: "Fecha",
        accessor: "fechaContable",
        Cell: ({ value }: { value: string }) => {
          return (
            <p className="table-body-td-center">{handleFormatRowDate(value)}</p>
          );
        },
      },
      {
        Header: "Emisión",
        accessor: "fechaEmision",
        Cell: ({ value }: { value: string }) => {
          return (
            <p className="table-body-td-center">{handleFormatRowDate(value)}</p>
          );
        },
      },
      {
        Header: "Documento N°",
        accessor: "numeroDocumento",
      },
      {
        Header: "Proveedor",
        accessor: "proveedorNombre",
      },
      {
        Header: "R.U.C N°",
        accessor: "proveedorNumero",
      },
      {
        Header: "M",
        accessor: "monedaId",
        Cell: ({ value }: { value: string }) => (
          <p className="table-body-td-center">{value}</p>
        ),
      },
      {
        Header: "Total",
        accessor: "total",
        Cell: ({ value }: { value: number }) => (
          <p className="table-body-td-center">
            {parseFloat(value.toString()).toFixed(2)}
          </p>
        ),
      },
      {
        Header: "C",
        accessor: "isCancelado",
        Cell: ({ value }: { value: boolean }) => (
          <p className="">{value ? "Sí" : "No"}</p>
        ),
      },
      {
        Header: "B",
        accessor: "isBloqueado",
        Cell: ({ value }: { value: boolean }) => (
          <p className="">{value ? <CheckIcon /> : <CheckBadgeIcon />}</p>
        ),
      },
      {
        Header: "A",
        accessor: "afectarStock",
        Cell: ({ value }: { value: boolean }) => (
          <p className="">{value ? "Sí" : "No"}</p>
        ),
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IDocumentoCompraTable } }) => (
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

export default useDocumentoCompraColumn;
