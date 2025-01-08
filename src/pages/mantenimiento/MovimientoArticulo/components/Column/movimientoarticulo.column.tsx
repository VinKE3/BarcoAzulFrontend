// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IMovimientoArticuloTable } from "../../../../../models";

const useMovimientoArticuloColumn = (): Column<IMovimientoArticuloTable>[] => {
  return useMemo<Column<IMovimientoArticuloTable>[]>(
    () => [
      {
        Header: "Estado Stock",
        accessor: "estadoStock",
      },
      {
        Header: "Código	",
        accessor: "codigoBarras",
      },
      {
        Header: "SubLínea",
        accessor: "subLineaDescripcion",
      },
      {
        Header: "Descripción",
        accessor: "articuloDescripcion",
      },
      {
        Header: "Unidad Medida",
        accessor: "unidadMedidaAbreviatura",
      },
      {
        Header: "Stock Inicial",
        accessor: "stockInicial",
      },
      {
        Header: "Entradas",
        accessor: "cantidadEntrada",
      },
      {
        Header: "Salidas",
        accessor: "cantidadSalida",
      },
      {
        Header: "Stock Final",
        accessor: "saldoFinal",
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IMovimientoArticuloTable } }) => {
          const codigo = row.original.codigoBarras ?? "Sin código";

          return (
            <ActionBar
              id={codigo}
              rowData={row.original}
              isTablas={true}
              showModificar={false}
              showEliminar={false}
            />
          );
        },
      },
    ],
    []
  );
};

export default useMovimientoArticuloColumn;
