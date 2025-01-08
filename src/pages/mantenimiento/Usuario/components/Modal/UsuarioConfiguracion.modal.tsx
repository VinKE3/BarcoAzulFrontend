import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ButtonFooter, Messages, ModalForm } from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  ICombo,
  IMensajes,
  IMenuList,
  IPermisoCrud,
  IPermisos,
  IUsuarioMenu,
  IUsuarioPermisoTablas,
  IUsuarioPermisos,
  IUsuarioTable,
  defaultPermisoCrud,
  defaultUsuarioPermisoTablas,
  defaultUsuarioPermisos,
} from "../../../../../models";
import {
  get,
  getListar,
  getTablas,
  handleInputType,
  handleSetErrorMensaje,
  handleSetInputs,
} from "../../../../../util";

const UsuarioConfiguracionModal: React.FC = () => {
  //#region useState
  const menu = "Mantenimiento/UsuarioPermiso";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, form } = globalContext;
  const dataGeneral = form.data as IUsuarioTable;
  const [data, setData] = useState<IUsuarioPermisos>({
    ...defaultUsuarioPermisos,
    tipoUsuarioId: dataGeneral.tipoUsuarioDescripcion,
    usuarioId: dataGeneral.id,
  });
  const [tablas, setTablas] = useState<IUsuarioPermisoTablas>(
    defaultUsuarioPermisoTablas
  );
  const { tiposUsuario } = tablas;
  const [menus, setMenus] = useState<IMenuList[]>([]);
  const [permisos, setPermisos] = useState<IPermisoCrud>(defaultPermisoCrud);

  const mensaje: IMensajes = {
    tipo: 5,
    textos: [
      "NO CONFIGURADO: No contiene ningún permiso (no configurable).",
      "ADMINISTRADOR: Se le concede todos los permisos (no configurable).",
      "MANTENIMIENTO: Se le concede todos los permisos, excepto el Anular (no configurable).",
      "CONSULTA: Se le concede los permisos de Consultar y Refrescar (no configurable).",
      "PERSONALIZADO: Se le concede los permisos asignados de la parte inferior (configurable).",
    ],
    origen: "",
  };
  const inputs = useFocus("contenedor", "tipoUsuarioId");
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
    handleTablas();
    handleMenu();
  }, [inputs]);

  useEffect(() => {
    handleMenu();
  }, []);

  useEffect(() => {
    menus.length > 0 && handleLoadPermisos();
  }, [menus]);
  //#endregion

  //#region Funciones
  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);

    const permisos = handleDefaultPermisos(value as string);
    setData((x) => ({ ...x, [name]: value, permisos: permisos }));
  };

  const handleTablas = async (): Promise<void> => {
    const result: IUsuarioPermisoTablas = await getTablas(globalContext, menu);
    setTablas(result);
  };

  const handleMenu = async (): Promise<void> => {
    const urlParams = new URLSearchParams({ usuarioId: "" });
    const menus: IUsuarioMenu[] = await get({
      globalContext,
      menu: "Menu/Listar",
      urlParams,
    });
    const filteredMenu = Object.values(
      menus.reduce((acc, menu) => {
        const { sistemaAreaId, sistemaAreaNombre } = menu;

        if (!acc[sistemaAreaId]) {
          acc[sistemaAreaId] = { nombre: sistemaAreaNombre, items: [] };
        }
        acc[sistemaAreaId].items.push(menu);
        return acc;
      }, {} as Record<number, IMenuList>)
    );
    setMenus(filteredMenu);
  };

  const handleDefaultPermisos = (tipoUsuarioId: string = "NO"): IPermisos[] => {
    const permisosPorTipoUsuario: Record<string, Partial<IPermisos>> = {
      CO: { consultar: true },
      MA: { registrar: true, modificar: true, eliminar: true, consultar: true },
      AD: {
        registrar: true,
        modificar: true,
        eliminar: true,
        consultar: true,
        anular: true,
      },
      NO: {
        registrar: false,
        modificar: false,
        eliminar: false,
        consultar: false,
        anular: false,
      },
      PE: {
        registrar: false,
        modificar: false,
        eliminar: false,
        consultar: false,
        anular: false,
      },
    };

    const permisos = permisosPorTipoUsuario[tipoUsuarioId];

    const initialPermisos = menus.reduce(
      (acc: IPermisos[], menu: IMenuList) => {
        const categoryPermisos = menu.items.map((item: IUsuarioMenu) => ({
          menuId: item.id,
          usuarioId: data.usuarioId,
          registrar: permisos.registrar ?? false,
          modificar: permisos.modificar ?? false,
          eliminar: permisos.eliminar ?? false,
          consultar: permisos.consultar ?? false,
          anular: permisos.anular ?? false,
        }));

        return [...acc, ...categoryPermisos];
      },
      [] as IPermisos[]
    );

    if (data.menuId !== "") {
      setPermisos({
        registrar: permisos.registrar ?? false,
        modificar: permisos.modificar ?? false,
        eliminar: permisos.eliminar ?? false,
        consultar: permisos.consultar ?? false,
        anular: permisos.anular ?? false,
      });
    }

    return initialPermisos;
  };

  const handleLoadPermisos = async (): Promise<void> => {
    try {
      const params = new URLSearchParams({ usuarioId: data.usuarioId });
      const { permisos }: { permisos: IPermisos[] } = await getListar(
        globalContext,
        params,
        menu
      );
      const initialPermisos = handleDefaultPermisos();

      if (permisos.length > 0) {
        const updatedPermisos = [...initialPermisos];

        // Actualizar permisos predeterminados con los permisos del resultado
        permisos.forEach((permiso: IPermisos) => {
          const index = updatedPermisos.findIndex(
            (p) => p.menuId === permiso.menuId
          );
          if (index !== -1) {
            updatedPermisos[index] = permiso;
          }
        });

        // Actualizar el estado con los permisos actualizados
        setData((x) => ({ ...x, permisos: updatedPermisos }));
      } else {
        // Si no hay permisos en el resultado, simplemente actualizar con los permisos predeterminados
        setData((x) => ({ ...x, permisos: initialPermisos }));
      }
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, api.origen);
    }
  };

  const handleMenuId = (usuarioMenu: IUsuarioMenu): void => {
    const permisosDelMenu = data.permisos.find(
      (x) => x.menuId === usuarioMenu.id
    );

    if (permisosDelMenu) {
      const { registrar, modificar, consultar, eliminar, anular } =
        permisosDelMenu;
      setPermisos({ registrar, modificar, consultar, eliminar, anular });

      setData((x) => ({
        ...x,
        menuId: usuarioMenu.id,
        menuNombre: usuarioMenu.nombre,
      }));
      inputs["contenedor"].current.scrollTo(0, 0);
    }
  };

  const handleTogglePermiso = (permiso: string, estado: boolean): void => {
    // Actualizar el estado local de permisos (en el componente)
    setPermisos((x) => ({ ...x, [permiso]: !estado }));

    setData((x) => {
      const updatedPermisos = x.permisos.map((perm) => {
        if (perm.menuId === data.menuId) {
          return { ...perm, [permiso]: !estado };
        }
        return perm;
      });
      return { ...x, permisos: updatedPermisos };
    });
  };
  //#endregion

  return (
    <>
      {tiposUsuario.length > 0 && (
        <ModalForm
          title={`configurar usuario - ${dataGeneral.nick}`}
          className="justify-between"
        >
          <Messages showClose={false} mensajes={[mensaje]} />

          <div ref={inputs["contenedor"]} className="modal-base-content">
            <div className="input-base-row">
              <div className="input-base-container-100">
                <label htmlFor="tipoUsuarioId" className="label-base">
                  Tipo Usuario
                </label>
                <select
                  ref={inputs["tipoUsuarioId"]}
                  id="tipoUsuarioId"
                  name="tipoUsuarioId"
                  value={data.tipoUsuarioId ?? ""}
                  onChange={handleData}
                  autoFocus
                  className="input-base"
                >
                  {tiposUsuario.map((x: ICombo) => (
                    <option key={x.id} value={x.id}>
                      {x.descripcion}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filter-base">
              <span className="filter-base-text">Asignación de permisos</span>

              <div className="py-2.5">
                <p className="text-sm font-semibold uppercase">
                  <span>Menu seleccionado -</span>
                  <span className="configuracion-modal-menu-text">
                    {data.menuNombre}
                  </span>
                </p>
              </div>

              <div className="configuracion-modal-button-group">
                {Object.entries(permisos).map(([permiso, estado]) => (
                  <button
                    key={permiso}
                    onClick={() => handleTogglePermiso(permiso, estado)}
                    className={`configuracion-modal-button${
                      estado ? "-activo" : ""
                    }`}
                    disabled={
                      data.menuNombre === "" || data.tipoUsuarioId !== "PE"
                    }
                  >
                    {permiso.charAt(0).toUpperCase() + permiso.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="configuracion-modal-menu-container">
              {Object.entries(menus).map(
                ([sistemaAreaId, { nombre, items }]) => (
                  <Disclosure key={sistemaAreaId}>
                    {({ open }) => (
                      <>
                        <DisclosureButton
                          className={`configuracion-modal-menu ${
                            open
                              ? "configuracion-modal-menu-open"
                              : "configuracion-modal-menu-close"
                          }`}
                        >
                          <span>{nombre}</span>
                          <ChevronUpIcon
                            className={`configuracion-modal-menu-icon ${
                              open ? "rotate-180" : ""
                            }`}
                          />
                        </DisclosureButton>

                        <DisclosurePanel>
                          <ul>
                            {items.map((item: IUsuarioMenu) => (
                              <li
                                key={item.id}
                                onClick={() => handleMenuId(item)}
                                className="configuracion-modal-menu-item"
                              >
                                <p
                                  className={`${
                                    data.menuId === item.id
                                      ? "configuracion-modal-menu-item-selected"
                                      : "px-3 py-1.5"
                                  }`}
                                >
                                  {item.nombre}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                )
              )}
            </div>
          </div>

          <ButtonFooter menu={menu} data={data} inputFocus="tipoUsuarioId" />
        </ModalForm>
      )}
    </>
  );
};

export default UsuarioConfiguracionModal;
