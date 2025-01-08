import { ChangeEvent, useEffect, useState } from "react";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { usePedidosFindModalColumn, usePedidosFindModalSelectedColumn } from ".";
import { useDebounce, useGlobalContext } from "../../../../hooks";
import {
  IDocumentoVentaPedido,
  IDocumentoVentaPedidoFind,
  IPedido,
  IPedidoDetalle,
  IPedidoFind,
  IPedidoFindFilter,
  IPedidoFindTable,
  IPedidosFindModal,
  IPedidosFindRetorno,
  defaultPedido,
  defaultPedidoFindFilter,
} from "../../../../models";
import {
  getId,
  getListar,
  handleClearModalProp,
  handleFocus,
  handleInputType,
  handleSetErrorMensaje,
  handleSetRetorno,
  handleToast,
} from "../../../../util";
import { TableKeyHandler } from "../../../Keys";
import { ModalHelp } from "../../../Modal";
import { Table } from "../../../Table";

const PedidosFindModal: React.FC<IPedidosFindModal> = ({ pedidos, inputFocus }) => {
  //#region useState
  const menu: string = "Venta/Pedido";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { form, extra } = globalContext;
  const { retorno } = form;
  const { inputs } = extra.element;

  const [filter, setFilter] = useState<IPedidoFindFilter>(defaultPedidoFindFilter);
  const search = useDebounce(filter);

  const [data, setData] = useState<IPedidoFindTable[]>([]);
  const [table, setTable] = useState<IDocumentoVentaPedido[]>(pedidos);
  const columns = usePedidosFindModalColumn(inputFocus);
  const selectColumns = usePedidosFindModalSelectedColumn();
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleListar();
  }, [search]);

  useEffect(() => {
    retorno && retorno.origen === "pedidoFind" && handleCrudDetalles(retorno as IDocumentoVentaPedidoFind);
  }, [retorno]);
  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setFilter((x) => ({ ...x, [name]: value }));
  };

  const handleListar = async (): Promise<void> => {
    try {
      const params = new URLSearchParams({
        fechaInicio: search.fechaInicio,
        fechaFin: search.fechaFin,
        numeroDocumento: search.numeroDocumento,
        soloPendientes: "true",
      });
      const { data }: { data: IPedidoFindTable[] } = await getListar(globalContext, params, menu);
      setData(data);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "help");
    }
  };

  const handleCrudDetalles = async (detalle: IDocumentoVentaPedidoFind): Promise<void> => {
    switch (detalle.tipo) {
      case "registrar":
        handleAdd(detalle as IDocumentoVentaPedido);
        break;
      case "modificar":
        const menu = `${window.location.origin}/Venta/Pedido`;
        window.open(menu, "_blank");
        break;
      case "eliminar":
        handleDelete(detalle as IDocumentoVentaPedido);
        break;
      default:
        break;
    }
  };

  const handleAdd = (detalle: IDocumentoVentaPedido): void => {
    const { tipo, id, numeroDocumento } = detalle;

    const existe: boolean = table.some((x) => x.id === id);
    if (existe) {
      handleToast("error", "El documento ya ha sido seleccionado.", "top");
      return;
    }

    const newPedidos = [...table, { tipo, id, numeroDocumento }];
    setTable(newPedidos);
  };

  const handleDelete = (detalle: IDocumentoVentaPedido): void => {
    const { id } = detalle;
    const nuevosPedidos = table.filter((x) => x.id !== id);
    setTable(nuevosPedidos);
  };

  const handleSend = async (): Promise<void> => {
    if (table.length === 0) {
      handleToast("warning", "No se adjuntó ningún documento", "top");
      handleClearModalProp(setGlobalContext, "segundo");
      inputs[inputFocus] && handleFocus(inputs[inputFocus]);
      return;
    }

    try {
      // Mapear `table` para crear un array de promesas
      const pedidosCompletos: IPedido[] = await Promise.all(
        table.map(async (x) => {
          // Obtener el pedido completo desde el endpoint
          return await getId(globalContext, x.id, "Venta/Pedido");
        })
      );

      // Combinar y procesar los detalles
      const newDetalles: IPedidoDetalle[] = [];

      pedidosCompletos.forEach((x) => {
        x.detalles.forEach((newDetalle) => {
          const existe = newDetalles.find((d) => d.articuloId === newDetalle.articuloId);

          if (existe) {
            // Si el artículo ya existe, sumar cantidad e importe, y recalcular precio unitario
            existe.cantidad += newDetalle.cantidad;
            existe.importe += newDetalle.importe;
            existe.precioUnitario = existe.importe / existe.cantidad;
          } else {
            // Si no existe, añadir como nuevo detalle
            newDetalles.push({ ...newDetalle });
          }
        });
      });

      // Recalcular los detalleId para cada detalle unificado
      newDetalles.forEach((x, i) => {
        x.detalleId = i + 1;
      });

      handleSetRetorno(setGlobalContext, {
        pedido: pedidosCompletos[0] ?? defaultPedido,
        pedidos: table,
        detalles: newDetalles,
        origen: "pedidosFind",
      } as IPedidosFindRetorno);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "help");
    }
  };

  const tableKeyDown = (row: IPedidoFind): void => {
    const { id, numeroDocumento } = row;
    const pedido: IDocumentoVentaPedido = { tipo: "registrar", id: id, numeroDocumento };

    handleSetRetorno(setGlobalContext, { ...pedido, origen: "pedidoFind" }, "segundo", false);
  };
  //#endregion

  return (
    <TableKeyHandler selector="pedidos-find-modal">
      <ModalHelp
        data={data}
        columns={columns}
        showFooter={true}
        handleKeyDown={tableKeyDown}
        title="Buscar Pedido"
        inputFocus={inputFocus}
        classNameModal="pedidos-find-modal md:min-w-[60%]"
        classNameTable="pedido-find-modal-table"
        buttonFooter={
          <>
            <button
              id="buttonAdjuntar"
              name="buttonAdjuntar"
              title="Presione [ALT + A] para adjuntar archivos."
              accessKey="a"
              onClick={() => handleSend()}
              className="button-base-bg-border-secondary"
            >
              <HiOutlineClipboardDocumentList size={"1.3rem"} className="button-base-icon" />
              <span className="button-base-text-hidden-info">[ ALT + A ]</span>
              <span className="button-base-text-hidden">Adjuntar Documentos</span>
            </button>
          </>
        }
      >
        {table.length > 0 && (
          <div className="pedidos-find-modal-container">
            <Table
              data={table}
              columns={selectColumns}
              selectable={false}
              alwaysSelected={false}
              doubleClick={false}
              pagination={false}
              tableClassName="pedidos-find-modal-table"
            />
          </div>
        )}

        <div className="filter-base">
          <span className="filter-base-text">Filtrar por</span>
          <div className="input-base-row">
            <div className="input-base-container-33">
              <label htmlFor="numeroDocumentoFilter" className="label-base">
                Documento
              </label>
              <input
                id="numeroDocumentoFilter"
                name="numeroDocumento"
                placeholder="Documento"
                value={filter.numeroDocumento}
                onChange={handleData}
                autoComplete="off"
                autoFocus
                className="input-base"
              />
            </div>
            <div className="input-base-container-33">
              <label htmlFor="fechaInicio" className="label-base">
                Desde
              </label>
              <input
                type="date"
                id="fechaInicio"
                name="fechaInicio"
                value={filter.fechaInicio}
                onChange={handleData}
                className="input-base"
              />
            </div>
            <div className="input-base-container-33">
              <label htmlFor="fechaFin" className="label-base">
                Hasta
              </label>
              <input
                type="date"
                id="fechaFin"
                name="fechaFin"
                value={filter.fechaFin}
                onChange={handleData}
                className="input-base"
              />
            </div>
          </div>
        </div>
      </ModalHelp>
    </TableKeyHandler>
  );
};

export default PedidosFindModal;
