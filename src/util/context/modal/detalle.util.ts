import { ICotizacionDetalle } from "../../../models";

/** Definición del tipo IDetalle que puede ser uno de varios tipos de detalles */
type IDetalle = ICotizacionDetalle;

/**
 * Maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los detalles de un documento específico.
 * @param data Los datos actuales del estado.
 * @param setData La función para actualizar el estado de los datos.
 * @param detalle El detalle sobre el cual se realizará la operación.
 */
export const handleCrudDetalles = (
  data: any,
  setData: React.Dispatch<React.SetStateAction<any>>,
  detalle: IDetalle
): void => {
  // Verifica el tipo de operación a realizar en el detalle y llama a la función correspondiente
  switch (detalle.tipo) {
    case "registrar":
      // Llama a la función para agregar un detalle
      handleAdd(data, setData, detalle);
      break;
    case "modificar":
      // Llama a la función para modificar un detalle existente
      handleModificarDetalle(data, setData, detalle);
      break;
    case "eliminar":
      // Llama a la función para eliminar un detalle existente
      handleDelete(data, setData, detalle);
      break;
    default:
      // No hacer nada si el tipo no coincide con ninguna operación conocida
      break;
  }
};

/**
 * Agrega un nuevo detalle a la lista de detalles en el estado.
 * @param data Los datos actuales del estado, que contienen una lista de detalles.
 * @param setData La función para actualizar el estado de los datos.
 * @param detalle El detalle a agregar.
 */
const handleAdd = (
  data: any,
  setData: React.Dispatch<React.SetStateAction<any>>,
  detalle: IDetalle
): void => {
  // Calcula el nuevo ID del detalle basándose en la longitud actual de la lista de detalles
  const nuevoDetalleId = data.detalles.length + 1;

  // Actualiza el estado agregando el nuevo detalle a la lista de detalles
  setData((x: any) => ({
    ...x,
    detalles: [...x.detalles, { ...detalle, detalleId: nuevoDetalleId }],
  }));
};

/**
 * Modifica un detalle existente en la lista de detalles en el estado.
 * @param data Los datos actuales del estado, que contienen una lista de detalles.
 * @param setData La función para actualizar el estado de los datos.
 * @param detalle El detalle con las modificaciones a aplicar.
 */
const handleModificarDetalle = (
  data: any,
  setData: React.Dispatch<React.SetStateAction<any>>,
  detalle: IDetalle
): void => {
  // Busca el detalle existente en la lista de detalles usando el ID del artículo
  const existeDetalle = data.detalles.find(
    (x: any) => x.articuloId === detalle.articuloId
  );

  // Si el detalle existe, procede con la modificación
  if (existeDetalle) {
    // Encuentra el índice del detalle a modificar
    const indiceDetalle = data.detalles.findIndex(
      (x: any) => x.articuloId === detalle.articuloId
    );

    // Crea una copia de la lista de detalles
    const nuevosDetalles = [...data.detalles];

    // Reemplaza el detalle en la copia de la lista con el detalle modificado
    nuevosDetalles[indiceDetalle] = { ...existeDetalle, ...detalle };

    // Actualiza el estado con la lista de detalles modificada
    setData((x: any) => ({ ...x, detalles: nuevosDetalles }));
  }
};

/**
 * Elimina un detalle de la lista de detalles en el estado.
 * @param data Los datos actuales del estado, que contienen una lista de detalles.
 * @param setData La función para actualizar el estado de los datos.
 * @param detalle El detalle que se va a eliminar.
 */
const handleDelete = (
  data: any,
  setData: React.Dispatch<React.SetStateAction<any>>,
  detalle: IDetalle
): void => {
  // Busca el detalle existente en la lista de detalles usando el ID del artículo
  const existeDetalle = data.detalles.find(
    (x: any) => x.articuloId === detalle.articuloId
  );

  // Si el detalle existe, procede con la eliminación
  if (existeDetalle) {
    // Filtra la lista de detalles para excluir el detalle que se va a eliminar
    const nuevosDetalles = data.detalles.filter(
      (x: any) => x.articuloId !== detalle.articuloId
    );

    // Reasigna los IDs de detalle a los detalles restantes para mantener una numeración secuencial
    const detallesActualizados = nuevosDetalles.map(
      (detalle: any, index: number) => ({
        ...detalle,
        detalleId: index + 1,
      })
    );

    // Actualiza el estado con la lista de detalles actualizada
    setData((x: any) => ({ ...x, detalles: detallesActualizados }));
  }
};
