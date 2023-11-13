export type Gender = '0' | '1' | null;

export interface Response<T> {
  data: T;
  message: string | null;
  status: string;
  token?: string;
}

export declare namespace Params {
  interface Login {
    username: string;
    password: string;
    date: Date | number;
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
    emailCode?: string;
  }
  interface register {
    username: string;
    password: string;
    email: string;
  }
}

export declare namespace Result {
  interface Login {
    age: string;
    avatar_url: string;
    gender: Gender;
    tag: string;
    phone: string;
    token: string;
    email: string;
  }
}
