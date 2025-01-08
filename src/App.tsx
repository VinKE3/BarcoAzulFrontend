import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { Layout, privateRoutes, publicRoutes } from "./common";
import "./common/styles/styles.scss";
import store from "./redux/store";
import { RoutesWithNotFound, SnackbarConfigurator } from "./util";
import Home from "./pages/home/Home";
import { Login } from "./pages/login";
import { Mantenimiento } from "./pages/mantenimiento";
import Compras from "./pages/compra/Compras";
import { Empresa } from "./pages/empresa";
import Finanzas from "./pages/finanzas/Finanzas";
import Ventas from "./pages/ventas/Ventas";
function App() {
  return (
    <>
      {/*
          Proveedor de Redux: Se utiliza el componente Provider de react-redux para envolver la aplicación y proporcionar acceso al store de Redux a todos los componentes.
      */}
      <Provider store={store}>
        {/*
            SnackbarProvider: Proveedor de notificaciones para utilizar con la librería "notistack". 
            Este componente envuelve la aplicación para que los componentes puedan mostrar notificaciones.
          */}
        <SnackbarProvider preventDuplicate dense maxSnack={1}>
          {/*
              SnackbarConfigurator: Configurador de utilidades para notificaciones.
              Este componente se utiliza para configurar la referencia de las utilidades de Snackbar, 
              permitiendo el acceso a las funciones de notificación desde cualquier parte de la aplicación.
            */}
          <SnackbarConfigurator />

          {/*
              Rutas con React Router: Se utiliza el componente BrowserRouter para configurar el enrutamiento de la aplicación. 
              Se definen rutas públicas (LOGIN) y rutas privadas, y se utiliza AuthGuard como guard de rutas para gestionar el acceso basado en autenticación.
            */}
          <BrowserRouter>
            {/* Para manejar rutas no encontradas y redirigir a una página de error o realizar alguna acción específica. */}
            <RoutesWithNotFound>
              {/* La primera página a la que se redirigirá cuando "/" esté vacío. Ejm:  http://localhost:5173/ */}
              <Route path="/" element={<Navigate to={privateRoutes.HOME} />} />
              <Route path={publicRoutes.LOGIN} element={<Login />} />

              <Route element={<Layout />}>
                <Route path={`${privateRoutes.HOME}/*`} element={<Home />} />
                <Route
                  path={`${privateRoutes.EMPRESA}/*`}
                  element={<Empresa />}
                />
                <Route
                  path={`${privateRoutes.MANTENIMIENTO}/*`}
                  element={<Mantenimiento />}
                />
                <Route
                  path={`${privateRoutes.COMPRAS}/*`}
                  element={<Compras />}
                />
                <Route
                  path={`${privateRoutes.FINANZAS}/*`}
                  element={<Finanzas />}
                />
                <Route
                  path={`${privateRoutes.VENTAS}/*`}
                  element={<Ventas />}
                />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
        </SnackbarProvider>
      </Provider>
    </>
  );
}

export default App;
