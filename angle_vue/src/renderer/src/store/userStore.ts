import { defineStore } from 'pinia'
import { sStorage } from "@renderer/assets/public/webStorage";

interface User {
  username: string,
  token: string
}
export const useUserStore = defineStore('user', {
  state: (): User => ({
    username: '' ,
    token: ''
  }),
  getters: {
    getUserName (state) {
      const username = state.username;
      if (username) return username;
      return sStorage.get('username');
    },
    getToken (state) {
      const token = state.token;
      if (token) return token;
      return sStorage.get('token');
    },
  },
  actions: {
    setUserName(name: string) {
     this.username = name;
      sStorage.set('username', name);
    },
    setToken(token: string) {
      this.token = token;
      sStorage.set('token', token);
    },
  },
})
