class Public {
  // corsky:表示cors跨域
  corsky(req, res, next) {
    // CORS→Cross Origin Resource Sharing
    const allwo_origin = ['192.168.31.170:9310', 'localhost:9310'];
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
    if (allwo_origin.includes(req.get('host'))) {
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Content-Type,Content-Length, Authorization, Accept,X-Requested-With',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,PATCH,DELETE,OPTIONS',
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
  }
}
export default new Public();
