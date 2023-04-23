import { message, MessageArgsProps } from 'ant-design-vue';
import { Response } from '@renderer/api/model';

type MessageLevel = 'open' | 'success' | 'error' | 'info' | 'warning' | 'warn' | 'loading';
type MessageConfig = Omit<MessageArgsProps, 'content'>;

export const resultPrompt = (
  result: Response,
  content: string,
  succeedFun?: (...arg0: any) => void,
  level: MessageLevel = 'success',
  ...options: MessageConfig[]
) => {
  if (
    result.hasOwnProperty('return_code') &&
    result.return_code &&
    result.return_code.toString() === '0'
  ) {
    XMessage[level]({
      content,
      ...options[0]
    });
    if (!succeedFun) return;
    succeedFun();
  }
};

// TODO: 统一message配置
class XMessageClass {
  open(...options: MessageArgsProps[]) {
    return message['open'](options[0]);
  }
  success(...options: MessageArgsProps[] | string[]) {
    return message['success'](options[0]);
  }
  error(...options: MessageArgsProps[] | string[]) {
    message['error'](options[0]);
  }
  info(...options: MessageArgsProps[] | string[]) {
    message['info'](options[0]);
  }
  warning(...options: MessageArgsProps[] | string[]) {
    message['warning'](options[0]);
  }
  warn(...options: MessageArgsProps[] | string[]) {
    message['warn'](options[0]);
  }
  loading(...options: MessageArgsProps[] | string[]) {
    message['loading'](options[0]);
  }
}
export const XMessage = new XMessageClass();

export default {
  resultPrompt,
  XMessage
};
