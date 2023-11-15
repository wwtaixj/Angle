export interface Chat {
  id: number;
  name: string;
  avatar: string;
  caption: string;
  time: string;
  sent?: boolean;
  deleted?: boolean;
}
