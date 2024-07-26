import { useUserStore } from 'src/stores/userStore';
import useApi from './apiService';
import { User } from 'src/model/interfaces';

const store = useUserStore();

export async function login(username: string, password: string): Promise<boolean> {
  const { api } = useApi();
  try {
    const response = await api.post('/auth/login', { username, password });
    const { token, name, id } = response.data;
    console.log(token);
    if (token) {
      store.setUser({
        id: id,
        username: username,
        token,
        name: name,
        password: '',
        permissions: []
      });
      store.setLogged(true);
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
  return api.post('/auth/create', user);
}

export function logout() {
  store.logout();
}
