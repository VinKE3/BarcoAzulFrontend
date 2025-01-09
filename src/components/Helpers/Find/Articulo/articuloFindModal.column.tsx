// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { IArticuloFind, IArticuloFindTable } from "../../../../models";
import { handleNumber, handleMonedaRow } from "../../../../util";
import { SelectButton } from "../../SelectButton";

const useArticuloFindColumn = (
  inputFocus: string
): Column<IArticuloFindTable>[] => {
  return useMemo<Column<IArticuloFindTable>[]>(
    () => [
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IArticuloFindTable } }) => (
          <div className="helper-select-container">
            <SelectButton
              retorno={{ ...row.original, origen: "articuloFind" }}
              inputFocus={inputFocus}
            />
          </div>
        ),
      },
      {
        Header: "Descripción",
        accessor: "id",
        Cell: ({ row }: { row: { original: IArticuloFindTable } }) => {
          const { codigoBarras, descripcion } = row.original;
          return (
            <div className="table-base-multiple">
              <p>{codigoBarras}</p>
              <p className="table-base-multiple-sub-text">{descripcion}</p>
            </div>
          );
        },
      },
      {
        Header: "Unidad",
        accessor: "unidadMedidaAbreviatura",
        Cell: ({ value }: { value: string }) => {
          return <p className="text-center">{value}</p>;
        },
      },
      {
        Header: "M",
        accessor: "monedaId",
        Cell: ({ value }: { value: string }) => {
          return (
            <div className="flex justify-center">
              <p className="table-base-badge-gray">{handleMonedaRow(value)}</p>
            </div>
          );
        },
      },
      {
        Header: "Precios",
        accessor: "precioVenta",
        Cell: ({ row }: { row: { original: IArticuloFindTable } }) => {
          const { precioVenta, precioCompra } = row.original;
          return (
            <div className="table-base-multiple">
              <div className="table-base-multiple-container">
                <p className="table-base-multiple-text">Compra:</p>
                <p className="table-base-multiple-monto">
                  {handleNumber(precioCompra, false, true)}
                </p>
              </div>
              <div className="table-base-multiple-container">
                <p className="table-base-multiple-text">Venta:</p>
                <p className="table-base-multiple-monto">
                  {handleNumber(precioVenta, false, true)}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        Header: "Stock",
        accessor: "stock",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="text-right table-base-multiple-monto">
              {handleNumber(value, false, true)}
            </p>
          );
        },
      },
    ],
    [inputFocus]
  );
};

export default useArticuloFindColumn;
