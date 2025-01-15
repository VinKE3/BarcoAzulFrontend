// columnsConfig.ts

import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../../../../components";
import {
  IGuiaRemisionVehiculo,
  ModalCrudType,
} from "../../../../../../../../models";

const useVehiculoGuiaColumn = (
  tipo: ModalCrudType
): Column<IGuiaRemisionVehiculo>[] => {
  return useMemo<Column<IGuiaRemisionVehiculo>[]>(
    () => [
      {
        Header: "Item",
        accessor: "item",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Placa",
        accessor: "placa",
      },
      {
        Header: "Marca",
        accessor: "vehiculoCodigo",
      },
      {
        Header: "-",
        Cell: ({ row }: { row: { original: IGuiaRemisionVehiculo } }) => (
          <ActionBar
            id=""
            isAdminPermisos={true}
            returnRetorno={true}
            rowData={{ ...row.original, origen: "vehiculoDetalle" }}
            showConsultar={false}
            showModificar={false}
            showEliminar={tipo !== "consultar"}
          />
        ),
      },
    ],
    []
  );
};

export default useVehiculoGuiaColumn;
