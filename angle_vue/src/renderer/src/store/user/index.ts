import { defineStore } from 'pinia';
import { sStorage, lStorage } from '@renderer/utils/webStorage';
import { Language } from '@renderer/i18n/model';
import { UserParticles } from '@renderer/assets/particles';
import { UserStore, Location, LoginStateEnum } from '../model';
import { UserForm, Gender } from '@renderer/views/login/model';
import { resultPrompt } from '@renderer/utils/custom';
import { useI18n } from '@renderer/i18n';
import router from '@renderer/router';
import { login } from '@renderer/api';
import { useAuthStore } from '@renderer/store';

export const useUserStore = defineStore('user', {
	state: (): UserStore => ({
		loginState: LoginStateEnum.LOGIN,
		SMSCode: '',
		username: '',
		phone: '',
		avatarUrl: '',
		lang: 'zh-cn',
		location: { longitude: 0, latitude: 0 },
		particles: undefined,
		age: '',
		gender: undefined,
		label: '',
		password: '',
		remember: false,
		description: ''
	}),
	getters: {
		getUserName(state) {
			const username = state.username;
			if (username) return username;
			return sStorage.get('username');
		},
		getDescription(state) {
			const description = state.description;
			if (description) return description;
			return sStorage.get('description');
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
		updateUserInfo(userInfo: UserForm) {
			this.setUserInfo(userInfo);
		},

		// 设置登录界面显示
		setLoginState(state: LoginStateEnum) {
			this.loginState = state;
		},
		async loginOut() {
			const { t } = useI18n();
			const result = await login({
				token: useAuthStore().getToken
			});
			resultPrompt(result, t('Sign out successfully'));
			sStorage.clear();
			await router.push('/login');
			location.reload();
		},
		setUserInfo(user: Omit<UserForm, 'password'>) {
			const { username, phone, age, gender, avatarUrl, label } = user;
			this.setUserName(username);
			this.setPhone(phone);
			this.setAge(age);
			this.setGender(gender);
			this.setAvatarUrl(avatarUrl);
			this.setLabel(label);
		},
		setDescription(description?: string) {
			if (!description) return;
			this.description = description;
			sStorage.set('description', description);
		},
		setUserName(name?: string) {
			if (!name) return;
			this.username = name;
			sStorage.set('username', name);
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
		setPassword(password?: string) {
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
