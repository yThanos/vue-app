import { useUserStore } from 'src/stores/userStore';
import useApi from './apiService';
import { User } from 'src/model/interfaces';

const store = useUserStore();

export async function login(login: string, senha: string): Promise<boolean> {
  const { api } = useApi();
  try {
    const response = await api.post('/auth/login', { login, senha });
    const { token } = response.data;
    console.log(token);
    if (token) {
      store.setUser({
        email: login,
        token,
        name: '',
        password: '',
      });
      return true;
    } else {
      throw new Error('Token not received');
    }
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
}

export function createAcc(user: User) {
  const { api } = useApi();
  return api.post('/users', user);
}

export function logout() {
  store.logout();
}
