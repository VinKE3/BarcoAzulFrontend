// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../../../components";
import { ICombo, IProveedorCuentaCorriente } from "../../../../../../../models";
import { handleMonedaRow, handleTextDescripcion } from "../../../../../../../util";

const useProveedorCuentaCorrienteColumn = (entidades: ICombo[]): Column<IProveedorCuentaCorriente>[] => {
  return useMemo<Column<IProveedorCuentaCorriente>[]>(
    () => [
      {
        Header: "Entidad Bancaria",
        accessor: "entidadBancariaId",
        Cell: ({ value }: { value: number }) => {
          return <p>{handleTextDescripcion(entidades, value, "nombre")}</p>;
        },
      },
      {
        Header: "Moneda",
        accessor: "monedaId",
        Cell: ({ value }: { value: string }) => {
          return (
            <div className="flex justify-center">
              <p className="main-table-badge-gray">{handleMonedaRow(value)}</p>
            </div>
          );
        },
      },
      {
        Header: "Número",
        accessor: "numero",
        Cell: ({ value }: { value: string }) => {
          return <p className="text-center">{value}</p>;
        },
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IProveedorCuentaCorriente } }) => (
          <ActionBar
            modalProp="segundo"
            rowData={{ ...row.original, origen: "proveedorCuentaCorriente" }}
            id={row.original.id.toString()}
            isAdminPermisos={true}
          />
        ),
      },
    ],
    [entidades]
  );
};

export default useProveedorCuentaCorrienteColumn;
