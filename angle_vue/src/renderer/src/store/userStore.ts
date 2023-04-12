import { defineStore } from 'pinia'
import { sStorage } from "@renderer/assets/public/webStorage";

interface User {
  username: string,
  token: string,
  phone: string,
  avatar_url: string
}
export const useUserStore = defineStore('user', {
  state: (): User => ({
    username: '' ,
    token: '',
    phone: '',
    avatar_url: ''
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
    getPhone (state) {
      const phone = state.phone;
      if (phone) return phone;
      return sStorage.get('phone');
    },
    getAvatarUrl (state) {
      const avatar_url = state.avatar_url;
      if (avatar_url) return avatar_url;
      return sStorage.get('avatar_url');
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
    setPhone(phone: string) {
      this.phone = phone;
      sStorage.set('phone', phone);
    },
    setAvatarUrl(url: string) {
      this.avatar_url = url;
      sStorage.set('avatar_url', url);
    },

  },
})
