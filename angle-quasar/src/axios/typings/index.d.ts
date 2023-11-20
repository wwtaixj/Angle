export type Gender = 0 | 1 | null;

export interface Response<T> {
  data: T;
  message: string | null;
  status: string;
  token?: string;
}

export declare namespace Params {
  interface User {
    id: number;
    username: string;
    gender: string;
    email: string;
    phone: string;
    avatarUrl: string;
    role_id: string;
    status: number;
    tag: string;
  }
  interface Login {
    username: string;
    password: string;
    longitude: number;
    latitude: number;
  }
  interface LoginOut {
    token: string;
    username: string;
  }
  interface UpdateUser {
    age: string;
    avatarUrl: string;
    gender: Gender;
    label: string;
    phone: string;
    username: string;
    email: string;
  }
  interface updatePssword {
    newPassword: string;
    password?: string;
    username: string;
    verCode?: string;
  }
  interface register {
    username: string;
    password: string;
    email: string;
    verCode: string;
  }
  interface verCode {
    email: string;
  }
}

export declare namespace Result {
  interface Login {
    id: number;
    age: number;
    avatarUrl: string;
    gender: Gender;
    tag: string;
    phone: string;
    token: string;
    email: string;
  }
  interface User {
    id: number;
    username: string;
    password: string;
    gender: string;
    email: string;
    phone: string;
    avatarUrl: string;
    role_id: string;
    createTime: string;
    updateTime: string;
    status: number;
    tag: string;
  }
}
