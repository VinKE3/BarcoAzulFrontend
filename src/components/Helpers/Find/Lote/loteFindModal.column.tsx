// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ILoteFindTable } from "../../../../models";
import { handleFormatRowDate, handleNumber } from "../../../../util";
import { SelectButton } from "../../SelectButton";

const useLoteFindModalColumn = (inputFocus: string): Column<ILoteFindTable>[] => {
  return useMemo<Column<ILoteFindTable>[]>(
    () => [
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: ILoteFindTable } }) => (
          <div className="button-select-base-container">
            <SelectButton retorno={{ ...row.original, origen: "loteFind" }} inputFocus={inputFocus} />
          </div>
        ),
      },
      {
        Header: "Lote",
        accessor: "numero",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Vencimiento",
        accessor: "fechaVencimiento",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-body-td-center">{handleFormatRowDate(value)}</p>;
        },
      },
      {
        Header: "Cajas",
        accessor: "stockCajas",
        Cell: ({ value }: { value: number }) => {
          return <p className="text-center">{handleNumber(value, true, true, 1)}</p>;
        },
      },
      {
        Header: "Unidades",
        accessor: "stockUnidades",
        Cell: ({ value }: { value: number }) => {
          return <p className="text-center">{handleNumber(value, true, true, 1)}</p>;
        },
      },
    ],
    []
  );
};

export default useLoteFindModalColumn;
