import { IMensajes } from "../../../../models";

interface IProps {
  messages: IMensajes[];
  visible: boolean;
}

const Error: React.FC<IProps> = ({ messages, visible }) => {
  return (
    // Condicionalmente renderiza el componente Error basándote en la propiedad visible
    <>
      {visible &&
        messages.map((mensaje, index) => (
          <div key={index} className="error-container">
            <div className="error-header">
              <p className="error-header-title">Solucione lo siguiente para continuar:</p>
            </div>
            <div className="error-textos-container">
              {mensaje.textos.map((texto, index) => (
                <p key={index} className="error-textos-texto">
                  {`• ${texto}`}
                </p>
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default Error;
