import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGlobalContext } from "../hooks";
import { IPermisos, adminPermisos, defaultPermisos } from "../models";
import { IAppStore } from "../redux/store";
import { decodeUserToken, get } from "../util";

/**
 * Hook personalizado que se utiliza para obtener y manejar los permisos de usuario para un menú específico
 * en una aplicación React. Este hook permite determinar si el usuario tiene los permisos necesarios
 * para interactuar con las funciones de un menú determinado, y ajusta la visibilidad de las opciones
 * basadas en esos permisos.
 *
 * El hook realiza una solicitud para obtener los permisos basados en el `menuId` proporcionado,
 * y actualiza el estado de los permisos en función del tipo de usuario (administrador o no).
 *
 * @param menuId El identificador del menú para el cual se desean obtener los permisos.
 *
 * @returns Un objeto con:
 *  - `visible`: Booleano que indica si hay algún permiso habilitado para el menú.
 *  - `permisos`: Un objeto con los permisos asociados al usuario para el menú.
 *
 * @example
 * const { visible, permisos } = usePermisos("Mantenimiento/UsuarioPermiso");
 *
 * Este hook obtiene los permisos asociados al usuario para el menú `Mantenimiento/UsuarioPermiso`,
 * y permite controlar la visibilidad de las opciones de ese menú.
 */
const usePermisos = (menuId: string) => {
  //#region IProps
  const menu: string = "Mantenimiento/UsuarioPermiso/GetPorUsuarioYMenu";
  const { token, refreshToken } = useSelector((x: IAppStore) => x.user);
  const { tipoUsuario, id } = decodeUserToken(token, refreshToken);
  const { globalContext } = useGlobalContext();
  const [permisos, setPermisos] = useState<IPermisos>(defaultPermisos);

  // Determinar si algún permiso es visible
  const visible = Object.keys(permisos)
    .filter((key) => key !== "usuarioId" && key !== "menuId") // Excluir 'usuarioId' y 'menuId' de la verificación
    .some((key) => permisos[key as keyof IPermisos]); // Verificar si algún permiso está habilitado

  // Menús específicos donde el permiso 'anular' puede ser habilitado
  const anularCase: string[] = [
    "DocumentoVenta",
    "Pedido",
    "NotaCredito",
    "GuiaRemision",
    "NotaCreditoCompra",
    "GuiaRemisionIngreso",
    "IngresoArticulos",
    "SalidaArticulos",
  ];
  //#endregion

  //#region useEffect
  useEffect(() => {
    // Efecto secundario para obtener los permisos del usuario
    const fetchData = async () => {
      if (tipoUsuario !== "AD") {
        // Si el usuario no es administrador
        const urlParams = new URLSearchParams({
          usuarioId: id,
          menuId: menuId,
        });
        const data: IPermisos = await get({globalContext, menu, urlParams});
        // Actualizar los permisos del estado
        setPermisos(!anularCase.includes(menuId) ? { ...data, anular: false } : data);
        return;
      }

      // Si el usuario es administrador, establecer permisos de administrador
      setPermisos({
        ...adminPermisos,
        usuarioId: id,
        menuId: menuId,
        anular: anularCase.includes(menuId) ? true : false, // Habilitar 'anular' si el menú está en la lista de casos de anulación
      });
    };

    fetchData(); // Llamar a la función fetchData para obtener los permisos
  }, [menuId]);
  //#endregion

  return {
    visible,
    permisos,
  };
};

export default usePermisos;
