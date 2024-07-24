import { defineStore } from 'pinia';
import { User } from 'src/model/interfaces';

const defaultUser: User = {
  name: '',
  email: '',
  password: '',
  token: '',
};

const getUser: () => User = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : defaultUser;
};

export const useUserStore = defineStore('user', {
  state: () => ({
    user: getUser(),
  }),
  getters: {
    isLoggedIn: (state) => !!state.user.token,
  },
  actions: {
    setUser(user: User) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout() {
      this.user = defaultUser;
      localStorage.removeItem('user');
    },
  },
});
