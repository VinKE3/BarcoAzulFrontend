import React from "react";
import { HeaderMenu, HeaderTitle } from ".";

const Header: React.FC = () => {
  return (
    <div className="header-base">
      <HeaderTitle />
      <HeaderMenu />
    </div>
  );
};
export default Header;
