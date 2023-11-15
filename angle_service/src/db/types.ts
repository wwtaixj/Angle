import { RowDataPacket } from 'mysql2';

export interface SelectUserInfoRespone extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  gender: string;
  email: string;
  phone: string;
  avatar_url: string;
  tag: string;
}
export interface SelectApiPermissionsRespone extends RowDataPacket {
  api_name: string;
  api_type: string;
}

export interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  gender: string;
  email: string;
  phone: string;
  avatar_url: string;
  role_id: string;
  createTime: string;
  updateTime: string;
  status: number;
  tag: string;
}

export interface Roles extends RowDataPacket {
  id: number;
  name: string;
  remark: string;
  createTime: string;
  updateTime: string;
}

export interface ApiPermissions extends RowDataPacket {
  id: number;
  api_name: string;
  api_type: string;
  code: string;
  remark: string;
  createTime: string;
  updateTime: string;
}
export interface RolesRelationApiPermissions extends RowDataPacket {
  id: number;
  role_id: number;
  api_permission_id: number;
}

export interface Location extends RowDataPacket {
  id: number;
  longitude: number;
  latitude: number;
  login_time: string;
  user_id: number;
  username: string;
}
