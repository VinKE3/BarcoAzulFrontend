// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ICajaChicaTotal } from "../../../../models";
import { handleNumber } from "../../../../util";

const useTotalFindModalColumn = (): Column<ICajaChicaTotal>[] => {
  return useMemo<Column<ICajaChicaTotal>[]>(
    () => [
      {
        Header: "Tipo Cobro",
        accessor: "tipoCobroDescripcion",
      },
      {
        Header: "Total Sistema S/.",
        accessor: "totalSistemaPEN",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-body-td-right">{handleNumber(value, false, true)}</p>;
        },
      },
      {
        Header: "Cuadre S/.",
        accessor: "totalCuadrePEN",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-body-td-right">{handleNumber(value, false, true)}</p>;
        },
      },
      {
        Header: "Diferencia S/.",
        accessor: "diferenciaPEN",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-body-td-right">{handleNumber(value, false, true)}</p>;
        },
      },
      {
        Header: "Total Sistema US$",
        accessor: "totalSistemaUSD",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-body-td-right">{handleNumber(value, false, true)}</p>;
        },
      },
      {
        Header: "Cuadre US$",
        accessor: "totalCuadreUSD",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-body-td-right">{handleNumber(value, false, true)}</p>;
        },
      },
      {
        Header: "Diferencia US$",
        accessor: "diferenciaUSD",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-body-td-right">{handleNumber(value, false, true)}</p>;
        },
      },
    ],
    []
  );
};

export default useTotalFindModalColumn;
