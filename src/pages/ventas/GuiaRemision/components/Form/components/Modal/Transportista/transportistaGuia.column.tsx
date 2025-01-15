// columnsConfig.ts

import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../../../../components";
import {
  IGuiaRemisionTransportista,
  ModalCrudType,
} from "../../../../../../../../models";

const useTransportistaGuiaColumn = (
  tipo: ModalCrudType
): Column<IGuiaRemisionTransportista>[] => {
  return useMemo<Column<IGuiaRemisionTransportista>[]>(
    () => [
      {
        Header: "Item",
        accessor: "item",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "RUC/DNI",
        accessor: "numeroDocumentoIdentidad",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Licencia",
        accessor: "licenciaConducir",
        Cell: ({ value }: { value: string | null }) => {
          return <p className="table-base-body-td-center">{value ?? ""}</p>;
        },
      },
      {
        Header: "Registro MTC",
        accessor: "numeroRegistroMTC",
        Cell: ({ value }: { value: string | null }) => {
          return <p className="table-base-body-td-center">{value ?? ""}</p>;
        },
      },
      {
        Header: "-",
        Cell: ({ row }: { row: { original: IGuiaRemisionTransportista } }) => (
          <ActionBar
            id=""
            isAdminPermisos={true}
            returnRetorno={true}
            rowData={{ ...row.original, origen: "transportistaDetalle" }}
            showConsultar={false}
            showModificar={false}
            showEliminar={tipo !== "consultar"}
            tipoModalProp="tipoModal"
          />
        ),
      },
    ],
    []
  );
};

export default useTransportistaGuiaColumn;
