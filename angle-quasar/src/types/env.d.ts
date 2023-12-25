import { IpcRenderer } from 'electron';
import { Sequelize } from 'sequelize';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}

interface ImportMetaEnv {
  VITE_GLOB_SOCKET_URL: string; // socket 服务端地址
  VITE_GLOB_API_URL: string; // 接口服务端地址
}
