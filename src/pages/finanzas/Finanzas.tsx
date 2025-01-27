import { Navigate, Route } from "react-router-dom";
import { finanzasRoutes } from "../../common";
import { RoutesWithNotFound } from "../../util";
import { MovientoBancarioForm, MovimientoBancario } from "./MovimientoBancario";
import { BloquearMovimientoBancario } from "./BloquearMovimientoBancario";

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
        <Route
          path={finanzasRoutes.BLOQUEARMOVIMIENTOBANCARIO}
          element={<BloquearMovimientoBancario />}
        />
      </>
    </RoutesWithNotFound>
  );
};

export default Finanzas;
