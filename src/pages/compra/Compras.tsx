import { Navigate, Route } from "react-router-dom";
import { comprasRoutes } from "../../common";
import { RoutesWithNotFound } from "../../util";
import { DocumentoCompra } from "./DocumentoCompra";
import DocumentoCompraForm from "./DocumentoCompra/components/Form/DocumentoCompra.form";
import { CuentaPorPagar, CuentaPorPagarForm } from "./CuentaPorPagar";
import { EntradaArticulos, EntradaArticulosForm } from "./EntradaArticulos";
const Compras = () => {
  return (
    <RoutesWithNotFound>
      <>
        <Route
          path="/"
          element={<Navigate to={comprasRoutes.TODASLASCOMPRAS} />}
        />
        <Route
          path={comprasRoutes.TODASLASCOMPRAS}
          element={<DocumentoCompra />}
        />
        <Route
          path={comprasRoutes.TODASLASCOMPRAS_FORMULARIO}
          element={<DocumentoCompraForm />}
        />
        <Route
          path={comprasRoutes.CUENTASPORPAGAR}
          element={<CuentaPorPagar />}
        />
        <Route
          path={comprasRoutes.CUENTASPORPAGAR_FORMULARIO}
          element={<CuentaPorPagarForm />}
        />
        <Route
          path={comprasRoutes.ENTRADAARTICULOS}
          element={<EntradaArticulos />}
        />
        <Route
          path={comprasRoutes.ENTRADAARTICULOS_FORMULARIO}
          element={<EntradaArticulosForm />}
        />
      </>
    </RoutesWithNotFound>
  );
};

export default Compras;
