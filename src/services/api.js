import axios from "axios";

import { createAuthRefresh } from "axios-auth-refresh";

// import { createAuthRefreshInterceptor } from "axios-auth-refresh";


const api = axios.create({
  baseURL: "https://shop.preparateaqui.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// creamos un interceptor para agregar el token de autenticación a cada solicitud

api.interceptors.request.use((configuracion) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    configuracion.headers["Authorization"] = "Bearer " + token;
  }

  return configuracion;
});

const refreshLogic = (solicitudFallida) => api
    .post("/auth/refresh", { refresh_token: localStorage.getItem("refreshToken") })
    .then((respuesta) => {
      const nuevoToken = respuesta.data.access_token.token;
      localStorage.setItem("accessToken", nuevoToken);
      solicitudFallida.response.config.headers["Authorization"] = "Bearer " + nuevoToken;
      return  Promise.resolve();
    })
    .catch((error) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("usuario");
      return Promise.reject(solicitudFallida);
    });

createAuthRefresh(api, refreshLogic)

export default api;
