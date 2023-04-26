interface SendResponseOptions<T = any> {
  type: '0' | 'Fail';
  message?: string;
  data?: T;
}

export function sendResponse<T>(options: SendResponseOptions<T>) {
  if (options.type === '0') {
    return Promise.resolve({
      message: options.message ?? null,
      data: options.data ?? null,
      status: options.type,
    });
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({
    message: options.message ?? 'Failed',
    data: options.data ?? null,
    status: options.type,
  });
}

// corsky:表示cors跨域
export const corsky = (req, res, next) => {
  // CORS→Cross Origin Resource Sharing
  const allwo_origin = ['loose.net.cn', 'localhost'];
  // 设置可以用如下三行的写法,也可以用对象去写即res.set({}).二选一即可
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  // res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE,OPTIONS");
  // req.get("host")这个方法是获取请求者的域名
  // allwo_origin.includes(req.get("host"))这段代码的意思就是如果请求的域名包含在allwo_origin数组中
  // 思路就是如果请求者的域名是我们是想给的域名那么就允许跨域,否则不允许跨域
  // console.log("请求者域名Origin:", req.get("Origin"));
  // console.log("请求者域名host:", req.get("host"));
  // console.log(allwo_origin.includes(req.get("host")));
  // req.get()这个方法,获取的是控制台Network，里面的属性名为Origin的属性值,还可以获取属性名为host的属性值
  if (allwo_origin.includes(req.get('host').split(':')[0])) {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Content-Type,Content-Length, Authorization, Accept,X-Requested-With, authorization, Content-Type, token, username',
      'Access-Control-Allow-Methods': '*',
    });
    // 跨域请求CORS中的预请求
    if (req.method === 'OPTIONS') {
      res.sendStatus(200); /*让options请求快速返回*/
    } else {
      next();
    }
  } else {
    // 401表示服务器限值你访问
    res.send({
      status: 401,
      message: '服务器限制访问!',
      data: [],
    });
  }
};

export const formatDate = () => {
  const date = new Date();
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};
