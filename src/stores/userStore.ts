import { defineStore } from 'pinia';
import { User } from 'src/model/interfaces';
import { useRouter } from 'vue-router';

const defaultUser: User = {
  id: 0,
  name: '',
  username: '',
  password: '',
  token: '',
  permissions: [],
};

const getUser: () => User = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : defaultUser;
};

export const useUserStore = defineStore('user', {
  state: () => ({
    user: getUser(),
    isLogged: false,
  }),
  getters: {
    isLoggedIn: (state) => state.isLogged,
  },
  actions: {
    setUser(user: User) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout() {
      const router = useRouter();
      this.user = defaultUser;
      this.isLogged = false;
      localStorage.removeItem('user');
      router.push('/');
    },
    setLogged(isLogged: boolean) {
      this.isLogged = isLogged;
    }
  },
});
