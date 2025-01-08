// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { ICuadreStockTable } from "../../../../../models";

const useCuadreStockColumn = (): Column<ICuadreStockTable>[] => {
  return useMemo<Column<ICuadreStockTable>[]>(
    () => [
      {
        Header: "Estado",
        accessor: "estado",
        Cell: ({ value }: { value: boolean }) => (
          <p className="">{value ? "Cerrado" : "Abierto"}</p>
        ),
      },
      {
        Header: "Pendiente",
        accessor: "pendiente",
        Cell: ({ value }: { value: boolean }) => (
          <p className="">{value ? "Listo" : "Falta"}</p>
        ),
      },
      {
        Header: "Fecha Registro",
        accessor: "fechaRegistro",
      },
      {
        Header: "Número",
        accessor: "numero",
      },
      {
        Header: "Responsable",
        accessor: "responsableNombreCompleto",
      },
      {
        Header: "Moneda",
        accessor: "monedaId",

        Cell: ({ value }: { value: string }) => (
          <p className="table-body-td-center">{value}</p>
        ),
      },
      {
        Header: "Sobra",
        accessor: "totalSobra",
        Cell: ({ value }: { value: number }) => (
          <p className="table-body-td-center">{value}</p>
        ),
      },
      {
        Header: "Falta",
        accessor: "totalFalta",
        Cell: ({ value }: { value: number }) => (
          <p className="table-body-td-center">{value}</p>
        ),
      },
      {
        Header: "Total",
        accessor: "saldoTotal",
        Cell: ({ value }: { value: number }) => (
          <p className="table-body-td-center">{value}</p>
        ),
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: ICuadreStockTable } }) => (
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

export default useCuadreStockColumn;
