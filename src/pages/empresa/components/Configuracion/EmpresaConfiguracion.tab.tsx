import { ButtonFooter } from "../../../../components";
import { IConfiguracionDetalle, IConfiguracion } from "../../../../models";
import { Detraccion, Igv, Percepcion, Retencion } from "./components/Bloques";

interface IProps {
  dataGeneral: IConfiguracion;
  setDataGeneral: React.Dispatch<React.SetStateAction<IConfiguracion>>;
}

const EmpresaConfiguracion: React.FC<IProps> = ({
  dataGeneral,
  setDataGeneral,
}) => {
  //#region Funciones
  const handleUpdate = (
    field: keyof IConfiguracion,
    value: IConfiguracionDetalle[]
  ): void => {
    setDataGeneral((prev) => ({ ...prev, [field]: value }));
  };
  //#endregion

  return (
    <div className="empresa-configuracion">
      <div className="empresa-configuracion-bloques">
        <Igv
          dataIGV={dataGeneral.porcentajesIGV}
          handleIGV={(x) => handleUpdate("porcentajesIGV", x)}
        />
        <Detraccion
          dataDetraccion={dataGeneral.porcentajesDetraccion}
          handleDetraccion={(x) => handleUpdate("porcentajesDetraccion", x)}
        />
        <Percepcion
          dataPercepcion={dataGeneral.porcentajesPercepcion}
          handlePercepcion={(x) => handleUpdate("porcentajesPercepcion", x)}
        />
        <Retencion
          dataRetencion={dataGeneral.porcentajesRetencion}
          handleRetencion={(x) => handleUpdate("porcentajesRetencion", x)}
        />
      </div>
      <ButtonFooter
        data={dataGeneral}
        clearForm={false}
        showClose={false}
        inputFocus=""
      />
    </div>
  );
};

export default EmpresaConfiguracion;
