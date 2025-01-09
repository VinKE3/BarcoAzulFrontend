// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { IPrecioFindTable } from "../../../../models";
import { handleNumber } from "../../../../util";
import { SelectButton } from "../../SelectButton";

const usePrecioFindModalColumn = (inputFocus: string): Column<IPrecioFindTable>[] => {
    return useMemo<Column<IPrecioFindTable>[]>(
      () => [
        {
          Header: "Acciones",
          Cell: ({ row }: { row: { original: IPrecioFindTable } }) => (
            <div className="button-select-base-container">
              <SelectButton retorno={{ origen: "precioFind", ...row.original }} inputFocus={inputFocus} />
            </div>
          ),
        },
        {
          Header: "Precio",
          accessor: "precio",
          Cell: ({ value }: { value: number }) => {
            return <p className="text-right">{handleNumber(value, false, true, 4)}</p>;
          },
        },
      ],
      []
    );
  };
  
  export default usePrecioFindModalColumn;
