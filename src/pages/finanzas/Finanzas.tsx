import { Navigate, Route } from "react-router-dom";
import { finanzasRoutes } from "../../common";
import { RoutesWithNotFound } from "../../util";
import { MovimientoBancario } from "./MovimientoBancario";

const Finanzas = () => {
  return (
    <RoutesWithNotFound>
      <>
        <Route
          path="/"
          element={<Navigate to={finanzasRoutes.MOVIMIENTOCUENTABANCARIA} />}
        />
        <Route
          path={finanzasRoutes.MOVIMIENTOCUENTABANCARIA}
          element={<MovimientoBancario />}
        />
        {/* <Route
          path={finanzasRoutes.TODASLASCOMPRAS_FORMULARIO}
          element={<DocumentoCompraForm />}
        /> */}
      </>
    </RoutesWithNotFound>
  );
};

export default Finanzas;
