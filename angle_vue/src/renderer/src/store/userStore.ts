import { defineStore } from 'pinia';
import { sStorage, lStorage } from '@renderer/assets/public/webStorage';
import { Language } from '@renderer/i18n/model';
import { UserParticles } from '@renderer/assets/particles';
import { UserStore, Location } from './model';
import { UserForm, Gender } from '@renderer/views/login/model';

export const useUserStore = defineStore('user', {
  state: (): UserStore => ({
    username: '',
    token: '',
    phone: '',
    avatarUrl: '',
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
      const avatarUrl = state.avatarUrl;
      if (avatarUrl) return avatarUrl;
      return sStorage.get('avatarUrl');
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
    setUserInfo(user: Omit<UserForm, 'password'>) {
      const { username, phone, age, gender, avatarUrl, label } = user;
      this.setUserName(username);
      this.setPhone(phone);
      this.setAge(age);
      this.setGender(gender);
      this.setAvatarUrl(avatarUrl);
      this.setLabel(label);
    },
    setUserName(name?: string) {
      if (!name) return;
      this.username = name;
      sStorage.set('username', name);
    },
    setToken(token: string) {
      if (!token) return;
      this.token = token;
      sStorage.set('token', token);
    },
    setPhone(phone?: string) {
      if (!phone) return;
      this.phone = phone;
      sStorage.set('phone', phone);
    },
    setAge(age?: string) {
      if (!age) return;
      this.age = age;
      sStorage.set('age', age);
    },
    setGender(gender?: Gender) {
      if (!gender) return;
      this.gender = gender;
      sStorage.set('gender', gender);
    },
    setAvatarUrl(url?: string) {
      if (!url) return;
      this.avatarUrl = url;
      sStorage.set('avatarUrl', url);
    },
    setLabel(label?: string) {
      if (!label) return;
      this.label = label;
      sStorage.set('label', label);
    },
    setPassword(password: string) {
      if (!password) return;
      this.password = password;
      sStorage.set('password', password);
    },
    setLocation(location: Location) {
      if (!location) return;
      this.location = location;
      sStorage.set('location', location);
    },
    setLanguage(lang: Language) {
      if (!lang) return;
      this.lang = lang;
      lStorage.set('language', lang);
    },
    setParticlesCurrent(particles: UserParticles) {
      if (!particles) return;
      this.particles = particles;
      lStorage.set('particles', particles);
    },
    setRemember(remember: boolean) {
      this.remember = remember;
      lStorage.set('remember', remember);
    }
  }
});
