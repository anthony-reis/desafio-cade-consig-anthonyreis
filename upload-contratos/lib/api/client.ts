import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes("/auth/login");

      if (!isLoginRequest && !window.location.pathname.includes("/sign-in")) {
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  }
);
