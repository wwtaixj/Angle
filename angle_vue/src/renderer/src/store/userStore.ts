import { defineStore } from 'pinia';
import { sStorage, lStorage } from '@renderer/assets/public/webStorage';
import { Language } from '@renderer/i18n/model';
import { UserParticles } from '@renderer/assets/particles';

interface Location {
  longitude: number;
  latitude: number;
  message?: string;
}
type Gender = '0' | '1' | undefined;
// 用户信息
interface User {
  username: string;
  token: string;
  phone: string;
  avatar_url: string;
  location: Location;
  lang: Language;
  particles: UserParticles;
  age: string;
  gender: Gender;
  label: string;
  password: string;
  remember: boolean;
}
export const useUserStore = defineStore('user', {
  state: (): User => ({
    username: '',
    token: '',
    phone: '',
    avatar_url: '',
    lang: undefined,
    location: { longitude: 0, latitude: 0 },
    particles: undefined,
    age: '',
    gender: undefined,
    label: '',
    password: '',
    remember: false
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
    getAge(state) {
      const age = state.age;
      if (age) return age;
      return sStorage.get('age');
    },
    getGender(state) {
      const gender = state.gender;
      if (gender) return gender;
      return sStorage.get('gender');
    },
    getAvatarUrl(state) {
      const avatar_url = state.avatar_url;
      if (avatar_url) return avatar_url;
      return sStorage.get('avatar_url');
    },
    getLabel(state) {
      const label = state.label;
      if (label) return label;
      return sStorage.get('label');
    },
    getPassword(state) {
      const password = state.password;
      if (password) return password;
      return sStorage.get('password');
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
    },
    getRemember(state) {
      const remember = state.remember;
      if (remember) return remember;
      return lStorage.get('remember');
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
    setAge(age: string) {
      this.age = age;
      sStorage.set('age', age);
    },
    setGender(gender: Gender) {
      this.gender = gender;
      sStorage.set('gender', gender);
    },
    setAvatarUrl(url: string) {
      this.avatar_url = url;
      sStorage.set('avatar_url', url);
    },
    setLabel(label: string) {
      this.label = label;
      sStorage.set('label', label);
    },
    setPassword(password: string) {
      this.password = password;
      sStorage.set('password', password);
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
    },
    setRemember(remember: boolean) {
      this.remember = remember;
      lStorage.set('remember', remember);
    }
  }
});
