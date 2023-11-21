import { RowDataPacket } from 'mysql2';

export interface UserId extends RowDataPacket {
  id: number;
}
export interface SelectUserInfoRespone extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  gender: string;
  email: string;
  phone: string;
  avatarUrl: string;
  tag: string;
}
export interface SelectApiPermissionsRespone extends RowDataPacket {
  apiName: string;
  apiType: string;
}
export interface d extends User {}

export interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  gender: string;
  email: string;
  phone: string;
  avatarUrl: string;
  roleId: string;
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
  apiName: string;
  apiType: string;
  code: string;
  remark: string;
  createTime: string;
  updateTime: string;
}
export interface RolesRelationApiPermissions extends RowDataPacket {
  id: number;
  roleId: number;
  apiPermissionId: number;
}

export interface Location extends RowDataPacket {
  id: number;
  longitude: number;
  latitude: number;
  loginTime: string;
  userId: number;
  username: string;
}
