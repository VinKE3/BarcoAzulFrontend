// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IArticuloTable } from "../../../../../models";

const useArticuloColumn = (): Column<IArticuloTable>[] => {
  return useMemo<Column<IArticuloTable>[]>(
    () => [
      {
        Header: "Estado",
        accessor: "estadoStock",
      },
      {
        Header: "Código Barras",
        accessor: "codigoBarras",
      },
      {
        Header: "Descripción",
        accessor: "descripcion",
      },
      {
        Header: "Medida",
        accessor: "unidadMedidaAbreviatura",
        Cell: ({ value }: { value: string }) => (
          <p className="table-body-td-center">{value}</p>
        ),
      },
      {
        Header: "Stock",
        accessor: "stock",
        Cell: ({ value }: { value: number }) => (
          <p className="table-body-td-center">{value}</p>
        ),
      },
      {
        Header: "Moneda",
        accessor: "monedaId",

        Cell: ({ value }: { value: string }) => (
          <p className="table-body-td-center">{value}</p>
        ),
      },
      {
        Header: "Precio Compra",
        accessor: "precioCompra",
        Cell: ({ value }: { value: number }) => (
          <p className="table-body-td-center">{value}</p>
        ),
      },
      {
        Header: "Precio Venta",
        accessor: "precioVenta",
        Cell: ({ value }: { value: number }) => (
          <p className="table-body-td-center">{value}</p>
        ),
      },

      {
        Header: "A",
        accessor: "isActivo",
        Cell: ({ value }: { value: boolean }) => (
          <p className="">{value ? "Sí" : "No"}</p>
        ),
      },
      {
        Header: "C",
        accessor: "controlarStock",
        Cell: ({ value }: { value: boolean }) => (
          <p className="">{value ? "Sí" : "No"}</p>
        ),
      },
      {
        Header: "AP",
        accessor: "actualizaPrecio",
        Cell: ({ value }: { value: boolean }) => (
          <p className="">{value ? "Sí" : "No"}</p>
        ),
      },
      {
        Header: "D",
        accessor: "detraccion",
        Cell: ({ value }: { value: boolean }) => (
          <p className="">{value ? "Sí" : "No"}</p>
        ),
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IArticuloTable } }) => (
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

export default useArticuloColumn;
