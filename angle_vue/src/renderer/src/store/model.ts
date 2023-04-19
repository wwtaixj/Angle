import { Language } from '@renderer/i18n/model';
import { UserParticles } from '@renderer/assets/particles';
import { UserForm } from '@renderer/views/login/model';
export interface Location {
  longitude: number;
  latitude: number;
  message?: string;
}
// 用户信息
export interface UserStore extends UserForm {
  token: string;
  phone: string;
  location: Location;
  lang: Language;
  particles: UserParticles;
}
