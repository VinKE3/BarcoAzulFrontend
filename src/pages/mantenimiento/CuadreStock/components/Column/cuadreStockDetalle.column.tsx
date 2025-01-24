// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ICuadreStockDetalle } from "../../../../../models";
import { handleNumber } from "../../../../../util";

const cuadreStockDetalleColumn = (
  handleData: (x: any) => Promise<void> | void
): Column<ICuadreStockDetalle>[] => {
  return useMemo<Column<ICuadreStockDetalle>[]>(
    () => [
      {
        Header: "N°",
        accessor: "detalleId",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Código Barras",
        accessor: "codigoBarras",
      },
      {
        Header: "SubLínea",
        accessor: "subLineaDescripcion",
      },
      {
        Header: "Descripción",
        accessor: "descripcion",
      },
      {
        Header: "Unidad",
        accessor: "unidadMedidaDescripcion",
        Cell: ({ value }: { value: string | null }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Stock Final",
        accessor: "stockFinal",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-base-body-td-right">
              {handleNumber(value, true, true)}
            </p>
          );
        },
      },
      {
        Header: "Inventario",
        accessor: "inventario",
        Cell: ({
          row,
        }: {
          row: { original: ICuadreStockDetalle; index: number };
        }) => (
          <input
            type="number"
            name="inventario"
            value={row.original.inventario}
            onChange={(e) =>
              handleData({
                target: {
                  name: `totales[${row.index}].inventario`,
                  value: e.target.value,
                },
              })
            }
            min={0}
            step={1}
            className="input-base md:w-[100px]"
          />
        ),
      },
      {
        Header: "Precio",
        accessor: "precioUnitario",
        Cell: ({
          row,
        }: {
          row: { original: ICuadreStockDetalle; index: number };
        }) => (
          <input
            type="number"
            name="precioUnitario"
            value={row.original.precioUnitario}
            onChange={(e) =>
              handleData({
                target: {
                  name: `totales[${row.index}].precioUnitario`,
                  value: e.target.value,
                },
              })
            }
            min={0}
            step={1}
            className="input-base md:w-[100px]"
          />
        ),
      },
      {
        Header: "Cant. Falta",
        accessor: "cantidadFalta",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-base-body-td-right">
              {handleNumber(value, true, true)}
            </p>
          );
        },
      },
      {
        Header: "Total Falta",
        accessor: "totalFalta",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-base-body-td-right">
              {handleNumber(value, true, true)}
            </p>
          );
        },
      },
      {
        Header: "Cant. Sobra",
        accessor: "cantidadSobra",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-base-body-td-right">
              {handleNumber(value, true, true)}
            </p>
          );
        },
      },
      {
        Header: "Total Sobra",
        accessor: "totalSobra",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-base-body-td-right">
              {handleNumber(value, true, true)}
            </p>
          );
        },
      },
    ],
    []
  );
};

export default cuadreStockDetalleColumn;
