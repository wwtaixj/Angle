export interface Chat {
  id: number;
  username: string;
  avatarUrl: string;
  caption: string;
  time: string;
  sent?: boolean;
  deleted?: boolean;
}

export interface Message {
  id: number;
  username: string;
  avatarUrl: string;
  time: string;
  text: string;
}
