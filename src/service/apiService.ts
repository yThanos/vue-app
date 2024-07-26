import axios, { AxiosInstance } from 'axios';
import { useUserStore } from 'src/stores/userStore';

export default function useApi() {
  const API = 'http://server:8080/'; //'http://172.27.32.177:8080/';

  const api: AxiosInstance = axios.create({ baseURL: API });

  const { user, logout } = useUserStore();

  api.interceptors.request.use((config) => {
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      logout();
      return Promise.reject(error);
    }
  );

  function isUserAutehnticated(): boolean {
    const { isLoggedIn } = useUserStore();
    return isLoggedIn;
  }

  return { api, isUserAutehnticated };
}
