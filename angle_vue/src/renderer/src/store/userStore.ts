import { defineStore } from 'pinia';
import { sStorage, lStorage } from '@renderer/assets/public/webStorage';
import { Language } from '@renderer/i18n/model';
import { UserParticles } from '@renderer/assets/particles';

interface Location {
  longitude: number;
  latitude: number;
  message?: string;
}
// 用户信息
interface User {
  username: string;
  token: string;
  phone: string;
  avatar_url: string;
  location: Location;
  lang: Language;
  particles: UserParticles;
}
export const useUserStore = defineStore('user', {
  state: (): User => ({
    username: '',
    token: '',
    phone: '',
    avatar_url: '',
    lang: undefined,
    location: { longitude: 0, latitude: 0 },
    particles: undefined
  }),
  getters: {
    getUserName(state) {
      const username = state.username;
      if (username) return username;
      return sStorage.get('username');
    },
    getToken(state) {
      const token = state.token;
      if (token) return token;
      return sStorage.get('token');
    },
    getPhone(state) {
      const phone = state.phone;
      if (phone) return phone;
      return sStorage.get('phone');
    },
    getAvatarUrl(state) {
      const avatar_url = state.avatar_url;
      if (avatar_url) return avatar_url;
      return sStorage.get('avatar_url');
    },
    getLocation(state) {
      const location = state.location;
      if (location.longitude !== 0) return location;
      return sStorage.get('location');
    },
    getLanguage(state) {
      const lang = state.lang;
      if (lang) return lang;
      return lStorage.get('language');
    },
    getParticlesCurrent(state) {
      const particles = state.particles;
      if (particles) return particles;
      return lStorage.get('particles') || 'fireworks';
    }
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
    setLocation(location: Location) {
      this.location = location;
      sStorage.set('location', location);
    },
    setLanguage(lang: Language) {
      this.lang = lang;
      lStorage.set('language', lang);
    },
    setParticlesCurrent(particles: UserParticles) {
      this.particles = particles;
      lStorage.set('particles', particles);
    }
  }
});
