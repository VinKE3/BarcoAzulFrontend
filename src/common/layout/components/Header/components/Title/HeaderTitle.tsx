import { ArrowRightCircleIcon, Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useSelector } from "react-redux";
import { useGlobalContext } from "../../../../../../hooks";
import { IAppStore } from "../../../../../../redux/store";
import { decodeUserToken } from "../../../../../../util";

const HeaderTitle: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { element } = extra;
  const { showSidebar, responsive } = element;
  const { token, refreshToken } = useSelector((x: IAppStore) => x.user);
  const { nickname } = decodeUserToken(token, refreshToken);
  //#endregion

  //#region Funciones
  const handleClick = (): void => {
    setGlobalContext((x) => ({
      ...x,
      extra: { ...x.extra, element: { ...x.extra.element, showSidebar: !showSidebar } },
    }));
  };
  //#endregion

  return (
    <div className="header-title">
      {responsive === "full" ? (
        <ArrowRightCircleIcon onClick={handleClick} className={`header-title-button ${!showSidebar && "rotate-180"}`} />
      ) : (
        <div onClick={handleClick} className="header-title-button-mobile">
          {showSidebar ? (
            <Bars3BottomLeftIcon className="header-title-button-mobile-icon" />
          ) : (
            <XMarkIcon className="header-title-button-mobile-icon" />
          )}
        </div>
      )}

      <div className="header-title-container">
        <span className="header-title-text">Usuario - </span>
        <span className="header-title-username">{nickname}</span>
      </div>
    </div>
  );
};

export default HeaderTitle;
