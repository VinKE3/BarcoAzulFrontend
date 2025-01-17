// columnsConfig.ts

import { useMemo } from "react";
import { Column } from "react-table";
import { IDocumentoVentaCuota } from "../../../../models";
import { handleFormatRowDate, handleNumber } from "../../../../util";

const useCuotaHelpColumn = (): Column<IDocumentoVentaCuota>[] => {
  return useMemo<Column<IDocumentoVentaCuota>[]>(
    () => [
      {
        Header: "Item",
        accessor: "cuotaId",
        Cell: ({ value }: { value: number }) => {
          return <p className="text-center">{value}</p>;
        },
      },
      {
        Header: "F. Pago",
        accessor: "fechaPago",
        Cell: ({ value }: { value: string }) => {
          return <p className="text-center">{handleFormatRowDate(value)}</p>;
        },
      },
      {
        Header: "Monto",
        accessor: "monto",
        Cell: ({ value }: { value: number }) => {
          return <p className="text-right">{handleNumber(value, false, true)}</p>;
        },
      },
    ],
    []
  );
};

export default useCuotaHelpColumn;
