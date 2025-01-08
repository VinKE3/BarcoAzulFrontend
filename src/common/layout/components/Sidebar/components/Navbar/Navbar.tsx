/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../../../../hooks";
import { IMenuElement, ISubMenuElement } from "../../../../../../models";
import { navbarMenu } from "../../../../../../util";

const Navbar: React.FC = () => {
  //#region useStae
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { element } = extra;
  const { showSidebar, responsive } = element;
  const [expanded, setExpanded] = useState<string>("");
  const menuList = navbarMenu();
  //#endregion

  //#region Funciones
  const handleMenu = (): void => {
    setExpanded("");
    responsive === "mobile" &&
      setGlobalContext((x) => ({
        ...x,
        extra: { ...x.extra, element: { ...x.extra.element, showSidebar: !showSidebar } },
      }));
  };

  const handleArrow = (id: string): void => {
    setExpanded((x) => (x === id ? "" : id));
  };
  //#endregion

  return (
    <nav className={`navbar ${showSidebar ? "" : "overflow-y-auto"}`}>
      {menuList.map((menu: IMenuElement) =>
        menu.subMenus.length <= 0 ? (
          <Link key={menu.id} to={menu.id} onClick={handleMenu} className="navbar-menu">
            <div
              className={`navbar-menu-button ${showSidebar ? "navbar-menu-button-compact" : "navbar-menu-button-full"}`}
            >
              <span className="navbar-menu-icon">{menu.icon}</span>
              <span
                className={`navbar-menu-text ${showSidebar ? "navbar-menu-text-compact" : "navbar-menu-text-full"}`}
              >
                {menu.text}
              </span>
            </div>
          </Link>
        ) : (
          <Menu as="div" key={menu.id} className="navbar-menu">
            <MenuButton
              as="div"
              id={menu.id}
              onClick={() => handleArrow(menu.id)}
              className={`navbar-menu-button ${showSidebar ? "navbar-menu-button-compact" : "navbar-menu-button-full"}`}
            >
              <span className="navbar-menu-icon"> {menu.icon}</span>
              <span
                className={`navbar-menu-text ${showSidebar ? "navbar-menu-text-compact" : "navbar-menu-text-full"}`}
              >
                {menu.text}
              </span>

              {/* Muestra la flecha */}
              {!showSidebar && menu.subMenus.length > 0 && (
                <div className="navbar-menu-arrow-container">
                  <ChevronDownIcon className={`navbar-menu-arrow-icon ${expanded === menu.id ? "rotate-180" : ""}`} />
                </div>
              )}
            </MenuButton>

            <MenuItems
              as="div"
              onClick={handleMenu}
              className={`navbar-sub-menu-container ${
                showSidebar ? "navbar-sub-menu-compact" : "navbar-sub-menu-full"
              }`}
            >
              {menu.subMenus.map((submenu: ISubMenuElement) => (
                <MenuItem
                  as={Link}
                  key={submenu.text}
                  to={submenu.path}
                  onClick={handleMenu}
                  className="navbar-sub-menu-button"
                >
                  {/* <span className="navbar-sub-menu-icon">{submenu.icon ?? menu.icon}</span> */}
                  <span className="navbar-sub-menu-separator" />
                  <span className="navbar-sub-menu-text">{submenu.text}</span>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        )
      )}
    </nav>
  );
};
export default Navbar;
