import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Cog8ToothIcon, MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useSelector } from "react-redux";
import { updateUser } from "../../../../redux/states/user.state.ts";
import store, { IAppStore } from "../../../../redux/store.ts";

const Customization: React.FC = () => {
  //#region useState
  const { darkMode } = useSelector((store: IAppStore) => store.user);
  //#endregion

  //#region Funciones
  const handleTheme = (mode: boolean): void => {
    store.dispatch(updateUser({ darkMode: mode }));
  };
  //#endregion

  return (
    <Menu as="div" className="customization-container">
      <MenuButton as="div" className="customization-menu">
        <Cog8ToothIcon className="customization-menu-icon" />
      </MenuButton>

      <MenuItems as="div" className="customization-items">
        <MenuItem as="div" className="customization-items-item">
          <p className="customization-items-item-text">Tema</p>

          <div className="customization-items-item-theme-group">
            <SunIcon
              onClick={() => handleTheme(false)}
              className={`customization-items-item-theme-group-icon ${
                !darkMode && "customization-items-item-theme-group-sun-icon"
              }`}
            />

            <MoonIcon
              onClick={() => handleTheme(true)}
              className={`customization-items-item-theme-group-icon ${
                darkMode && "customization-items-item-theme-group-moon-icon"
              }`}
            />
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};
export default Customization;
