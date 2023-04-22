export type Gender = '0' | '1' | undefined;
export interface UserForm {
  username: string;
  password?: string;
  remember?: boolean;
  phone?: string;
  age?: string;
  gender?: Gender;
  avatarUrl?: string;
  label?: string;
  newPassword?: string;
  againNewPassword?: string;
  SMSCode?: string;
}
