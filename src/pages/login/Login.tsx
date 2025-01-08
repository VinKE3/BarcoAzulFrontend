import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Error, Logo } from ".";
import { privateRoutes, publicRoutes } from "../../common";
import { BasicKeyHandler } from "../../components/index.ts";
import useFetchAndLoad from "../../hooks/useFetchandLoad";
import { ILogin, IMensajes, defaultLogin, defaultMensajes } from "../../models";
import {
  createUser,
  resetUser,
  userKey,
} from "../../redux/states/user.state.ts";
import { clearLocalStorage, handleInputType, postSesion } from "../../util";
import Loading from "../../components/Loading/Loading.tsx";
const Login = () => {
  //#region useState
  const { loading, callEndpoint } = useFetchAndLoad();
  // Obtiene la función `dispatch` del store de Redux
  const dispatch = useDispatch();
  // Obtiene la función de navegación de React Router
  const navigate = useNavigate();
  const nombreCompleto: string = import.meta.env.VITE_NOMBRE_COMPLETO_EMPRESA;
  const frase: string = import.meta.env.VITE_FRASE_EMPRESA;
  const rubro: string = import.meta.env.VITE_RUBRO_EMPRESA;
  const [data, setData] = useState<ILogin>(defaultLogin);
  const [mensajes, setMensajes] = useState<IMensajes[]>([defaultMensajes]);
  const mensaje = mensajes.filter((x) => x.tipo >= 0);
  //#endregion

  //#region useEffect
  useEffect(() => {
    // Limpia la información de usuario almacenada en el almacenamiento local
    clearLocalStorage(userKey);
    // Despacha la acción para reiniciar el estado del usuario en Redux
    dispatch(resetUser());
    // Navega a la ruta de inicio de sesión pública y reemplaza la ubicación actual en el historial de navegación
    navigate(`/${publicRoutes.LOGIN}`, { replace: true });
  }, []);
  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setData((x) => ({ ...x, [name]: value }));
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      setMensajes([defaultMensajes]);
      const { token, refreshToken } = await postSesion(callEndpoint, data);
      // Almacena el usuario en localStorage
      dispatch(createUser({ token, refreshToken }));
      // Navega a la ruta privada después del inicio de sesión
      navigate(`/${privateRoutes.HOME}`, { replace: true });
    } catch (error) {
      setMensajes(error as IMensajes[]);
    }
  };
  const handleKey = async (e: React.KeyboardEvent): Promise<void> => {
    if (e.key === "Enter") await handleSubmit();
  };
  //#endregion
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-logo-container">
          <Logo />
          <div className="login-logo-text">
            <p className="login-logo-text-masy">{nombreCompleto}</p>
            <p className="login-logo-text-frase">{frase}</p>
          </div>
        </div>

        <div className="login-form">
          <div className="login-form-container">
            <div className="login-form-title">
              <span className="login-form-title-text">sistema</span>
              <span className="login-form-title-rubro">{rubro}</span>
              <p className="login-form-p">Ingresa a tu cuenta</p>
            </div>

            <BasicKeyHandler selector="login-form-input-container">
              <div className="login-form-input-container">
                {mensaje.length > 0 && (
                  <Error messages={mensajes} visible={true} />
                )}

                <div className="login-form-input-group">
                  <label htmlFor="usuario" className="login-form-label">
                    Usuario
                  </label>
                  <input
                    id="usuario"
                    name="usuario"
                    placeholder="Ingrese su usuario"
                    value={data.usuario}
                    onChange={handleData}
                    autoFocus
                    className="login-form-input"
                  />
                </div>

                <div className="login-form-input-group">
                  <label htmlFor="clave" className="login-form-label">
                    Contraseña
                  </label>
                  <input
                    id="clave"
                    name="clave"
                    placeholder="Ingrese su clave"
                    value={data.clave}
                    onChange={handleData}
                    className="login-form-input"
                    type="password"
                  />
                </div>

                <div className="login-form-input-group">
                  <button
                    onClick={handleSubmit}
                    onKeyDown={handleKey}
                    className=" login-form-button"
                  >
                    INICIAR SESIÓN
                  </button>
                </div>
              </div>
            </BasicKeyHandler>
            <span className="login-form-copy">{`Copyright © Masy Data Service ${new Date().getFullYear()}.`}</span>
          </div>
        </div>
      </div>

      {loading && (
        <div className="container-absolute">
          <Loading logo={true} absolute={true} />
        </div>
      )}
    </div>
  );
};

export default Login;
