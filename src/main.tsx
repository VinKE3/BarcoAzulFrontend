import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { axiosInterceptor } from "./interceptors/axios.interceptors.tsx";
axiosInterceptor();

// Utiliza `createRoot` de ReactDOM para renderizar la aplicación en el contenedor con id "root"
ReactDOM.createRoot(document.getElementById("root")!).render(
  // Engloba la aplicación en <React.StrictMode>
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
