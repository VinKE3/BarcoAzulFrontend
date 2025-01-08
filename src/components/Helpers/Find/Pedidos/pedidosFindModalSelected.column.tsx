// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { IDocumentoVentaPedido } from "../../../../models";
import { ActionBar } from "../../../ActionBar";

const usePedidosFindModalSelectedColumn = (): Column<IDocumentoVentaPedido>[] => {
  return useMemo<Column<IDocumentoVentaPedido>[]>(
    () => [
      {
        Header: "Pedidos Seleccionados",
        accessor: "numeroDocumento",
      },
      {
        Header: "-",
        Cell: ({ row }: { row: { original: IDocumentoVentaPedido } }) => (
          <ActionBar
            id={row.original.id}
            isAdminPermisos={true}
            returnRetorno={true}
            rowData={{ ...row.original, origen: "pedidoFind" }}
            showConsultar={false}
          />
        ),
      },
    ],
    []
  );
};

export default usePedidosFindModalSelectedColumn;
