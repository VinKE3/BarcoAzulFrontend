import { WrenchScrewdriverIcon } from "@heroicons/react/20/solid";
import { FaUsers, FaCoins } from "react-icons/fa6";
import { MdArticle } from "react-icons/md";
import { BiSolidCoin } from "react-icons/bi";
import { GiSellCard, GiBuyCard } from "react-icons/gi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdBarcode } from "react-icons/io";
import { mantenimientoRoutes } from "../../common/routes/mantenimiento.routes";
import { privateRoutes } from "../../common/routes/routes";
import { IMenuElement, ISubMenuElement } from "../../models";
import { tesoreriaRoutes } from "../../common/routes/tesoreria.routes";
import { comprasRoutes } from "../../common/routes/compras.routes";
import { ventasRoute } from "../../common/routes/ventas.routes";
import { finanzasRoutes } from "../../common/routes/finanzas.routes";

//#region Variables
const { MANTENIMIENTO, TESORERIA, COMPRAS, VENTAS, FINANZAS } = privateRoutes;
const {
  CLIENTE,
  PROVEEDOR,
  PERSONAL,
  TRANSPORTISTA,
  VEHICULOS,
  LINEA,
  SUBLINEA,
  MARCA,
  UNIDADESMEDIDA,
  CUENTASCORRIENTES,
  ENTIDADBANCARIA,
  DEPARTAMENTO,
  PROVINCIA,
  DISTRITO,
  ARTICULO,
  MOVIMIENTOARTICULO,
  CUADRESTOCK,
  TIPOCAMBIO,
} = mantenimientoRoutes;
const { MOVIMIENTOCUENTABANCARIA, REPORTECUENTABANCARIA } = tesoreriaRoutes;
const { TODASLASCOMPRAS, CUENTASPORPAGAR, ENTRADAARTICULOS } = comprasRoutes;
const {
  DOCUMENTOVENTA,
  GUIASREMISION,
  CUENTASPORCOBRAR,
  NOTAPEDIDO,
  SALIDAPRODUCCION,
} = ventasRoute;
const { MOVIMIENTOBANCARIO } = finanzasRoutes;
const createSubMenu = (items: ISubMenuElement[]) => items;
//#endregion

export function navbarMenu(): IMenuElement[] {
  return [
    {
      id: "entidades",
      text: "Entidades",
      icon: <FaUsers className="size-full" />,
      subMenus: createSubMenu([
        { text: "Cliente", path: `${MANTENIMIENTO}/${CLIENTE}` },
        { text: "Proveedor", path: `${MANTENIMIENTO}/${PROVEEDOR}` },
        { text: "Personal", path: `${MANTENIMIENTO}/${PERSONAL}` },
        {
          text: "Vehículos",
          path: `${MANTENIMIENTO}/${VEHICULOS}`,
        },
        {
          text: "Conductor / Transportista",
          path: `${MANTENIMIENTO}/${TRANSPORTISTA}`,
        },
      ]),
    },
    {
      id: "mantenimiento",
      text: "Mantenimiento",
      icon: <WrenchScrewdriverIcon className="w-full h-full" />,
      subMenus: createSubMenu([
        { text: "Tipo de Cambio", path: `${MANTENIMIENTO}/${TIPOCAMBIO}` },
        { text: "Línea", path: `${MANTENIMIENTO}/${LINEA}` },
        { text: "SubLínea", path: `${MANTENIMIENTO}/${SUBLINEA}` },
        { text: "Marca", path: `${MANTENIMIENTO}/${MARCA}` },
        {
          text: "Unidades de Medida",
          path: `${MANTENIMIENTO}/${UNIDADESMEDIDA}`,
        },
        {
          text: "Entidad Bancaria",
          path: `${MANTENIMIENTO}/${ENTIDADBANCARIA}`,
        },
        {
          text: "Cuenta Corriente",
          path: `${MANTENIMIENTO}/${CUENTASCORRIENTES}`,
        },
        { text: "Departamento", path: `${MANTENIMIENTO}/${DEPARTAMENTO}` },
        { text: "Provincia", path: `${MANTENIMIENTO}/${PROVINCIA}` },
        { text: "Distrito", path: `${MANTENIMIENTO}/${DISTRITO}` },
      ]),
    },
    {
      id: "articulos",
      text: "Artículos",
      icon: <MdArticle className="w-full h-full" />,
      subMenus: createSubMenu([
        {
          text: "Artículo",
          path: `${MANTENIMIENTO}/${ARTICULO}`,
          icon: <IoMdBarcode className="size-full" />,
        },
        {
          text: "Movimiento Artículo",
          path: `${MANTENIMIENTO}/${MOVIMIENTOARTICULO}`,
          icon: <IoMdBarcode className="size-full" />,
        },
        {
          text: "Cuadre Stock",
          path: `${MANTENIMIENTO}/${CUADRESTOCK}`,
          icon: <IoMdBarcode className="size-full" />,
        },
      ]),
    },
    {
      id: "tesoreria",
      text: "Tesorería",
      icon: <FaCoins className="w-full h-full" />,
      subMenus: createSubMenu([
        {
          text: "Movimiento Cuenta Bancaria",
          path: `${TESORERIA}/${MOVIMIENTOCUENTABANCARIA}`,
        },
        {
          text: "Reporte Cuenta Bancaria",
          path: `${TESORERIA}/${REPORTECUENTABANCARIA}`,
        },
      ]), // Sin submenús definidos
    },
    {
      id: "finanzas",
      text: "Finanzas",
      icon: <BiSolidCoin className="w-full h-full" />,
      subMenus: createSubMenu([
        {
          text: "Finanzas",
          path: `${FINANZAS}/${MOVIMIENTOBANCARIO}`,
        },
      ]),
    },
    {
      id: "compras",
      text: "Compras",
      icon: <GiBuyCard className="w-full h-full" />,
      subMenus: createSubMenu([
        {
          text: "Todas las compras",
          path: `${COMPRAS}/${TODASLASCOMPRAS}`,
        },
        {
          text: "Entrada Artículos",
          path: `${COMPRAS}/${ENTRADAARTICULOS}`,
        },
        {
          text: "Cuentas por pagar",
          path: `${COMPRAS}/${CUENTASPORPAGAR}`,
        },
      ]),
    },
    {
      id: "ventas",
      text: "Ventas",
      icon: <GiSellCard className="w-full h-full" />,
      subMenus: createSubMenu([
        {
          text: "Notas de Pedido",
          path: `${VENTAS}/${NOTAPEDIDO}`,
        },
        {
          text: "Todas las Ventas",
          path: `${VENTAS}/${DOCUMENTOVENTA}`,
        },
        {
          text: "Guías de remisión",
          path: `${VENTAS}/${GUIASREMISION}`,
        },
        {
          text: "Salida a producción",
          path: `${VENTAS}/${SALIDAPRODUCCION}`,
        },
        {
          text: "Cuentas por cobrar",
          path: `${VENTAS}/${CUENTASPORCOBRAR}`,
        },
      ]), // Sin submenús definidos
    },
    {
      id: "informe",
      text: "Informes",
      icon: <HiOutlineDocumentReport size={"2rem"} className="w-full h-full" />,
      subMenus: createSubMenu([]), // Sin submenús definidos
    },
  ] as IMenuElement[];
}
