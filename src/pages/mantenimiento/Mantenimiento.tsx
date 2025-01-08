import { Navigate, Route } from "react-router-dom";
import { mantenimientoRoutes } from "../../common";
import { RoutesWithNotFound } from "../../util";
import { Departamento } from "./Departamento";
import { Distrito } from "./Distrito";
import { Provincia } from "./Provincia";
import { Linea } from "./Linea";
import { TipoCambio } from "./TipoCambio";
import { Marca } from "./Marca";
import { UnidadMedida } from "./UnidadMedida";
import { EntidadBancaria } from "./EntidadBancaria";
import { CuentaCorriente } from "./CuentaCorriente";
import { SubLinea } from "./SubLinea";
import { Vehiculo } from "./Vehiculo";
import { Transportista } from "./Transportista";
import { Articulo } from "./Articulo";
import { MovimientoArticulo } from "./MovimientoArticulo";
import { CuadreStock } from "./CuadreStock";
import { Cliente } from "./Cliente";
import { Proveedor } from "./Proveedor";
import { Vendedor } from "./Vendedor";
import { Personal } from "./Personal";
import { Correlativo } from "./Correlativo";
import { Usuario } from "./Usuario";
const Mantenimiento = () => {
  return (
    <RoutesWithNotFound>
      <>
        <Route path="/" element={<Navigate to={mantenimientoRoutes.LINEA} />} />
        <Route
          path={mantenimientoRoutes.CORRELATIVO}
          element={<Correlativo />}
        />

        <Route path={mantenimientoRoutes.CLIENTE} element={<Cliente />} />
        <Route path={mantenimientoRoutes.PROVEEDOR} element={<Proveedor />} />
        <Route path={mantenimientoRoutes.VENDEDOR} element={<Vendedor />} />
        <Route path={mantenimientoRoutes.PERSONAL} element={<Personal />} />
        <Route path={mantenimientoRoutes.USUARIO} element={<Usuario />} />
        <Route path={mantenimientoRoutes.LINEA} element={<Linea />} />
        <Route path={mantenimientoRoutes.SUBLINEA} element={<SubLinea />} />
        <Route path={mantenimientoRoutes.MARCA} element={<Marca />} />
        <Route
          path={mantenimientoRoutes.UNIDADESMEDIDA}
          element={<UnidadMedida />}
        />
        <Route path={mantenimientoRoutes.VEHICULOS} element={<Vehiculo />} />
        <Route
          path={mantenimientoRoutes.TRANSPORTISTA}
          element={<Transportista />}
        />
        <Route
          path={mantenimientoRoutes.DEPARTAMENTO}
          element={<Departamento />}
        />
        <Route path={mantenimientoRoutes.PROVINCIA} element={<Provincia />} />
        <Route path={mantenimientoRoutes.DISTRITO} element={<Distrito />} />
        <Route path={mantenimientoRoutes.TIPOCAMBIO} element={<TipoCambio />} />
        <Route
          path={mantenimientoRoutes.ENTIDADBANCARIA}
          element={<EntidadBancaria />}
        />
        <Route
          path={mantenimientoRoutes.CUENTASCORRIENTES}
          element={<CuentaCorriente />}
        />

        <Route path={mantenimientoRoutes.ARTICULO} element={<Articulo />} />
        <Route
          path={mantenimientoRoutes.MOVIMIENTOARTICULO}
          element={<MovimientoArticulo />}
        />
        <Route
          path={mantenimientoRoutes.CUADRESTOCK}
          element={<CuadreStock />}
        />
      </>
    </RoutesWithNotFound>
  );
};

export default Mantenimiento;
