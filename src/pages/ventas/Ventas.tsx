import { Navigate, Route } from "react-router-dom";
import { ventasRoute } from "../../common";
import { RoutesWithNotFound } from "../../util";
import { CuentaPorCobrar, CuentaPorCobrarForm } from "./CuentaPorCobrar";
import { SalidaArticulos, SalidaArticulosForm } from "./SalidaArticulos";

const Ventas = () => {
  return (
    <RoutesWithNotFound>
      <>
        <Route
          path="/"
          element={<Navigate to={ventasRoute.CUENTASPORCOBRAR} />}
        />
        <Route
          path={ventasRoute.CUENTASPORCOBRAR}
          element={<CuentaPorCobrar />}
        />
        <Route
          path={ventasRoute.CUENTASPORCOBRAR_FORMULARIO}
          element={<CuentaPorCobrarForm />}
        />
        <Route
          path={ventasRoute.SALIDAPRODUCCION}
          element={<SalidaArticulos />}
        />
        <Route
          path={ventasRoute.SALIDAPRODUCCION_FORMULARIO}
          element={<SalidaArticulosForm />}
        />
      </>
    </RoutesWithNotFound>
  );
};

export default Ventas;
