import { Language } from '@renderer/i18n/model';
import { UserParticles } from '@renderer/assets/particles';
import { UserForm } from '@renderer/views/login/model';

export enum LoginStateEnum {
	LOGIN,
	REGISTER,
	RESET_PASSWORD,
	MOBILE,
	QR_CODE
}
export interface Location {
	longitude: number;
	latitude: number;
	message?: string;
}
// 用户信息
export interface UserStore extends UserForm {
	phone: string;
	location: Location;
	lang: Language;
	particles: UserParticles;
	SMSCode: string;
	loginState: LoginStateEnum; // 登录显示什么
}
