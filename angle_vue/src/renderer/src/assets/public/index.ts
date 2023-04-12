import { message } from "ant-design-vue";
// import { MessageInstance } from "ant-design-vue/lib/message"
import { Response } from '@renderer/apis/model';

export default {
  resultPrompt(
    result: Response,
    content: string,
    succeedFun?: (...arg0: any) => void,
    level: "open" | "success" | "error" | "info" | "warning" | "warn" | "loading" = 'success',
    ...options
  ) {
    if (
      result.hasOwnProperty('return_code') &&
      result.return_code &&
      result.return_code.toString() === '0'
    ) {
      message[level]({
        content,
        ...options[0]
      })
      if (!succeedFun) return;
      succeedFun();
    }
  }
}
