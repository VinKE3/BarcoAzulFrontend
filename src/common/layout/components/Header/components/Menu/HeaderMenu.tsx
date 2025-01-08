import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React from "react";
import { BiBuildings } from "react-icons/bi";
import { FaDoorOpen, FaSortNumericDown } from "react-icons/fa";
import { PiPasswordBold } from "react-icons/pi";
import { TiUser } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  empresaRoutes,
  mantenimientoRoutes,
  privateRoutes,
  publicRoutes,
} from "../../../../..";
import { PasswordHelpModal } from "../../../../../../components";
import { useGlobalContext } from "../../../../../../hooks";
import { resetUser, userKey } from "../../../../../../redux/states/user.state";
import { clearLocalStorage, handleHelpModal } from "../../../../../../util";
import user from "../../../../.././../assets/images/user.png";

const HeaderMenu: React.FC = () => {
  //#region useState
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal } = globalContext;
  //#endregion

  //#region Funciones
  const handleLogout = (): void => {
    // Limpia el almacenamiento local eliminando la clave de usuario
    clearLocalStorage(userKey);
    // Despacha la acción para reiniciar el estado del usuario en Redux
    dispatch(resetUser());
    // Navega a la ruta de inicio de sesión pública y reemplaza la ubicación actual
    navigate(publicRoutes.LOGIN, { replace: true });
  };
  //#endregion

  return (
    <>
      <Menu as="div" className="menu-base">
        <MenuButton className="menu-base-button">
          <img src={user} className="menu-base-button-img" />
        </MenuButton>

        <MenuItems as="div" className="menu-base-items">
          <MenuItem>
            <Link
              to={`${privateRoutes.EMPRESA}/${empresaRoutes.PUNTOVENTA}`}
              className="menu-base-items-item"
            >
              <BiBuildings size={"3rem"} className="menu-base-items-icon" />
              <span className="menu-base-items-text">Empresa</span>
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              to={`${privateRoutes.MANTENIMIENTO}/${mantenimientoRoutes.USUARIO}`}
              className="menu-base-items-item"
            >
              <TiUser size={"3rem"} className="menu-base-items-icon" />
              <span className="menu-base-items-text">Usuario</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to={`${privateRoutes.MANTENIMIENTO}/${mantenimientoRoutes.CORRELATIVO}`}
              className="menu-base-items-item"
            >
              <FaSortNumericDown
                size={"3rem"}
                className="menu-base-items-icon"
              />
              <span className="menu-base-items-text">Correlativo</span>
            </Link>
          </MenuItem>

          <MenuItem>
            <button
              onClick={() =>
                handleHelpModal(setGlobalContext, "clave", "tercer")
              }
              className="menu-base-items-item"
            >
              <PiPasswordBold size={"3rem"} className="menu-base-items-icon" />
              <span className="menu-base-items-text">Cambiar contraseña</span>
            </button>
          </MenuItem>

          <MenuItem>
            <button onClick={handleLogout} className="menu-base-items-item">
              <FaDoorOpen size={"3rem"} className="menu-base-items-icon" />
              <span className="menu-base-items-text">Salir</span>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>

      {modal.tercer.id === "clave" && <PasswordHelpModal />}
    </>
  );
};
export default HeaderMenu;
