import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import {  privateRoutes } from "../../..";
import masydase from "../../../../assets/images/masydase.jpg";
import { useGlobalContext } from "../../../../hooks";
import { handleSidebar } from "../../../../util";
import { Navbar } from ".";

const Sidebar: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { element } = extra;
  const { showSidebar } = element;
  const empresa = import.meta.env.VITE_NOMBRE_EMPRESA;
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
    <aside className={`sidebar sidebar-dark ${showSidebar ? "sidebar-visible" : "sidebar-hidden"}`}>
      <div className="flex items-center w-full">
        <Link
          key="home"
          to={privateRoutes.HOME}
          onClick={() => handleSidebar(globalContext, setGlobalContext)}
          className="w-full sidebar-logo-container"
        >
          <img src={masydase} alt="Logo Masydase" className="sidebar-logo-img" />
          <span className={`sidebar-logo-text ${showSidebar ? "m:hidden" : ""}`}>{empresa}</span>
        </Link>
        <IoClose className="mr-5 size-10 m:hidden" onClick={handleClick} />
      </div>

      <Navbar />
    </aside>
  );
};
export default Sidebar;
