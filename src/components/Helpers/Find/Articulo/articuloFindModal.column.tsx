// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { IArticuloFind, IArticuloFindTable } from "../../../../models";
import { handleNumber } from "../../../../util";
import { SelectButton } from "../../SelectButton";

const useArticuloFindColumn = (inputFocus: string): Column<IArticuloFindTable>[] => {
  return useMemo<Column<IArticuloFindTable>[]>(
    () => [
      {
        Header: "Sel",
        Cell: ({ row }: { row: { original: IArticuloFindTable } }) => (
          <div className="button-base-container-center">
            <SelectButton
              retorno={
                {
                  ...row.original,
                  origen: "articuloFind",
                } as IArticuloFind
              }
              inputFocus={inputFocus}
            />
          </div>
        ),
      },
      {
        Header: "Código",
        accessor: "id",
        Cell: ({ value }: { value: string }) => {
          return <p className="text-center">{value}</p>;
        },
      },
      {
        Header: "Descripción",
        accessor: "descripcion",
      },
      {
        Header: "Unidad",
        accessor: "unidadMedidaId",
        Cell: ({ value }: { value: string }) => {
          return <p className="text-center">{value}</p>;
        },
      },
      {
        Header: "Cantidad Und",
        accessor: "stockUnidades",
        Cell: ({ value }: { value: number }) => {
          return (
            <p title="Cantidad Unidades" className="text-right">
              {handleNumber(value, false, true)}
            </p>
          );
        },
      },
      {
        Header: "Precio Und",
        accessor: "precioUnitario",
        Cell: ({ value }: { value: number }) => {
          return (
            <p title="Precio Unitario" className="text-right">
              {handleNumber(value, false, true)}
            </p>
          );
        },
      },
      {
        Header: "Unidad Alt.",
        accessor: "unidadMedidaAlternaId",
        Cell: ({ value }: { value: string }) => {
          return <p className="text-center">{value}</p>;
        },
      },
      {
        Header: "Cantidad Caja",
        accessor: "stockCajas",
        Cell: ({ value }: { value: number }) => {
          return (
            <p title="Cantidad Cajas" className="text-right">
              {handleNumber(value, false, true)}
            </p>
          );
        },
      },
      {
        Header: "Precio Caja",
        accessor: "precioCaja",
        Cell: ({ value }: { value: number }) => {
          return (
            <p title="Precio Cajas" className="text-right">
              {handleNumber(value, false, true)}
            </p>
          );
        },
      },
    ],
    []
  );
};

export default useArticuloFindColumn;
