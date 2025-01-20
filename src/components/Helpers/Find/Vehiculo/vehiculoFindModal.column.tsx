// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { IVehiculoFindTable } from "../../../../models";
import { SelectButton } from "../../SelectButton";

const useVehiculoFindModalColumn = (): Column<IVehiculoFindTable>[] => {
  return useMemo<Column<IVehiculoFindTable>[]>(
    () => [
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IVehiculoFindTable } }) => (
          <div className="button-select-base-container">
            <SelectButton
              modalProp="tercer"
              retorno={{ ...row.original, origen: "vehiculoFind" }}
              inputFocus="numeroPlaca"
            />
          </div>
        ),
      },
      {
        Header: "Vehiculo Id",
        accessor: "id",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Numero Placa",
        accessor: "numeroPlaca",
      },
    ],
    []
  );
};
export default useVehiculoFindModalColumn;
