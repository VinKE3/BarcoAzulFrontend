import { FaArrowUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { Customization, Header, Sidebar } from ".";
import { publicRoutes } from "..";
import { GlobalProvider } from "../../context";
import { IAppStore } from "../../redux/store";

const Layout: React.FC = () => {
  //#region useState
  // Utiliza el hook useSelector para obtener el estado del usuario desde el store de Redux.
  const { token, darkMode } = useSelector((store: IAppStore) => store.user);
  //#endregion

  return token ? (
    <GlobalProvider>
      <div className={`base ${darkMode ? "dark" : ""}`}>
        <ScrollToTop
          smooth
          component={<FaArrowUp className="dark:text-white" />}
          className="scroll-to-top"
        />
        <Customization />
        <Sidebar />

        <div className="body-base">
          <Header />
          <Outlet />
        </div>
      </div>
    </GlobalProvider>
  ) : (
    <Navigate replace to={publicRoutes.LOGIN} />
  );
};

export default Layout;
