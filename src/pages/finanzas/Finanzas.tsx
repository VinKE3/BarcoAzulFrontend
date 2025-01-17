import { Navigate, Route } from "react-router-dom";
import { finanzasRoutes } from "../../common";
import { RoutesWithNotFound } from "../../util";
import { MovientoBancarioForm, MovimientoBancario } from "./MovimientoBancario";

const Finanzas = () => {
  return (
    <RoutesWithNotFound>
      <>
        <Route
          path="/"
          element={<Navigate to={finanzasRoutes.MOVIMIENTOBANCARIO} />}
        />
        <Route
          path={finanzasRoutes.MOVIMIENTOBANCARIO}
          element={<MovimientoBancario />}
        />
        <Route
          path={finanzasRoutes.MOVIMIENTOBANCARIO_FORMULARIO}
          element={<MovientoBancarioForm />}
        />
      </>
    </RoutesWithNotFound>
  );
};

export default Finanzas;
