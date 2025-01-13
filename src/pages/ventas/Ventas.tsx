import { Navigate, Route } from "react-router-dom";
import { ventasRoute } from "../../common";
import { RoutesWithNotFound } from "../../util";
import { CuentaPorCobrar, CuentaPorCobrarForm } from "./CuentaPorCobrar";
import { SalidaArticulos, SalidaArticulosForm } from "./SalidaArticulos";
import { NotaPedido, NotaPedidoForm } from "./NotaPedido";
import { GuiaRemision, GuiaRemisionForm } from "./GuiaRemision";
import { DocumentoVenta, DocumentoVentaForm } from "./DocumentoVenta";

const Ventas = () => {
  return (
    <RoutesWithNotFound>
      <>
        <Route
          path="/"
          element={<Navigate to={ventasRoute.CUENTASPORCOBRAR} />}
        />
        <Route path={ventasRoute.NOTAPEDIDO} element={<NotaPedido />} />
        <Route
          path={ventasRoute.NOTAPEDIDO_FORMULARIO}
          element={<NotaPedidoForm />}
        />
        <Route path={ventasRoute.DOCUMENTOVENTA} element={<DocumentoVenta />} />
        <Route
          path={ventasRoute.DOCUMENTOVENTA_FORMULARIO}
          element={<DocumentoVentaForm />}
        />
        <Route path={ventasRoute.GUIASREMISION} element={<GuiaRemision />} />
        <Route
          path={ventasRoute.GUIASREMISION_FORMULARIO}
          element={<GuiaRemisionForm />}
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
