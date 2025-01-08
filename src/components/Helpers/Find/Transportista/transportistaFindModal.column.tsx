// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ITransportistaFindTable } from "../../../../models";
import { SelectButton } from "../../SelectButton";

const useTransportistaFindmodalColumn = (): Column<ITransportistaFindTable>[] => {
  return useMemo<Column<ITransportistaFindTable>[]>(
    () => [
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: ITransportistaFindTable } }) => (
          <div className="button-select-base-container">
            <SelectButton
              modalProp="tercer"
              retorno={{ ...row.original, origen: "transportistaFind" }}
              inputFocus="numeroRegistroMTC"
            />
          </div>
        ),
      },
      {
        Header: "RUC/DNI",
        accessor: "numeroDocumentoIdentidad",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
    ],
    []
  );
};
export default useTransportistaFindmodalColumn;
