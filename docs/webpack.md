This is docs for webpack

## proxyTable

> 为什么要使用proxyTable
> 到底什么时候使用 `proxy`

很简单，两个字，跨域。
在平时项目的开发环境中，经常会遇到跨域的问题，尤其是使用vue-cli这种脚手架工具开发时，由于项目本身启动本地服务是需要占用一个端口的，所以必然会产生跨域的问题

```js
  ...
  build: {
    //
  },
  dev: {
    env: require('./dev.env'),
    port: 7012,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/api': {
      //   target: 'http://localhost:8081',
      //   changeOrigin: true
      // },
      // '/one': {
      //   target: 'http://211.152.49.184:7001',
      //   changeOrigin: true
      // },
      // '/music': {
      //   target: 'http://ws.stream.qqmusic.qq.com',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/music': '/music'
      //   }
      // }
    },
    cssSourceMap: false
  }
```

问题？ 到底这里需不需要配置 代理

1. 刚开始设置了 `/api`，以为是为了解决后台获取数据时的跨域问题，但是这两天看了一下，发现，前端和后台都是在本地起的服务，都是 localhost，似乎也没有什么跨域的问题
  所以，尝试注释掉后发现，也没有报错呀。
  什么情况？
  才发现，其实自己对于跨域的了解还是不够的
2. 还是自己想得太简单的。跨域时肯定会有的，这辈子都会有的
  我在 client 端，注释掉 `api` 这里的跨域配置，也可以实现没有错误不报错。**其实是我在后台有配置了**

```js
// app.js

const cors = require('koa2-cors') // 跨域
const {JWT_SECRET_KEY, CORS_CONFIG} = require('./server/config')

app.use(cors(CORS_CONFIG))

const CORS_CONFIG = {
  origin (ctx) {
    if (ctx.url === '/api/proxy/') {
      return '*'
    }
    return 'http://localhost:7012'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5000,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-requested-with', 'origin']
}
```

3. 继续挖掘，如果后台注释掉跨域的配置，而是通过配置 `proxyTable` ，结果却是不理想的

```js
// 浏览器
xhr.js?21f6:178 OPTIONS http://localhost:8081/api/auth/logout 404 (Not Found)

Failed to load http://localhost:8081/api/auth/logout: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:7012' is therefore not allowed access. The response had HTTP status code 404.

// koa 控制天

  <-- OPTIONS /api/auth/login
  --> OPTIONS /api/auth/login 404 1ms -
```

可以看到，在发起真正的请求之前都会发起 `options` 请求。但这个的时候就报错了。后台没有通过这个请求的验证

原因在于，`vue` 使用 `axios`，跨域请求之前都会首先发送一个 `options`请求，询问服务器是否有权限访问，如果可以，则再进行下一步

  如果不希望 `options` 请求
  1. 保证请求的接口在同域即可
  2. 直接让后端遇到 `options` 请求直接返回就行了
      对于这一点，还不知道怎么处理，才能使得程序继续发起下一个 get / post 请求 ❓❓❓

```js
// 1. 自己做的一点尝试

app.use(async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    console.log(ctx.request)
    ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin)
    ctx.set("Access-Control-Allow-Credentials", true)
    ctx.set("Access-Control-Max-Age", 86400000);
    ctx.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
    // ctx.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    ctx.status = 200
    // return next()
    await next()
  } else {
    console.log(2)
    return next()
  }
})
// 2. 提示的错误是：

`Failed to load http://localhost:8081/api/auth/login: 
No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:7012' is therefore not allowed access.`

// 3. 修改部分代码之后
 ctx.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// 4. 一个错误解决了。另一个问题又来了。错误提示变成这样了

`Cross-Origin Read Blocking (CORB) blocked cross-origin response http://localhost:8081/api/auth/login with MIME type application/json. See https://www.chromestatus.com/feature/5629709824032768 for more details.`

`Refused to set unsafe header "Access-Control-Request-Headers"`

`Failed to load http://localhost:8081/api/auth/login: 
No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:7012' is therefore not allowed access.`

不知所以啊！！！！
没完没了啊！！！！
```

国外友人的解释
*The browser sends a preflight request (with method type OPTIONS) to check if the service hosted on the server is allowed to be accessed from the browser on a different domain. In response to the preflight request if you inject above headers the browser understands that it is ok to make further calls and i will get a valid response to my actual GET/POST call. you can constraint the domain to which access is granted by using Access-Control-Allow-Origin", "localhost, xvz.com" instead of * . ( * will grant access to all domains)*

```js
// 最新进展
app.use(async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    console.log(1)
    // ctx.set("Access-Control-Request-Headers", 'Authorization')
    ctx.set("Access-Control-Allow-Origin", '*')
    ctx.set("Access-Control-Allow-Credentials", true)
    ctx.set("Access-Control-Max-Age", 86400000);
    ctx.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    ctx.set("Access-Control-Allow-Headers", "Authorization, X-Requested-With, Content-Type");
    // ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
    ctx.status = 200
    // return ctx.body = null
    // return next()
    await next()
  } else {
    console.log(2)
    ctx.set("Access-Control-Allow-Origin", '*')
    ctx.set("Access-Control-Allow-Credentials", true)
    ctx.set("Access-Control-Max-Age", 86400000);
    ctx.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    ctx.set("Access-Control-Allow-Headers", "Authorization, X-Requested-With, Content-Type");
    await next()
  }
})
```

options 请求和 其他的get post 请求都设置相应的 headers
这样就可以让服务端接收到后台返回的数据了

```js
1
  <-- OPTIONS /api/blog/article/5b06a9b18bb08970482ca753?id=5b06a9b18bb08970482ca753
  --> OPTIONS /api/blog/article/5b06a9b18bb08970482ca753?id=5b06a9b18bb08970482ca753 200 1ms -
2
  <-- GET /api/blog/article/5b06a9b18bb08970482ca753?id=5b06a9b18bb08970482ca753
  --> GET /api/blog/article/5b06a9b18bb08970482ca753?id=5b06a9b18bb08970482ca753 200 140ms 8.09kb

// 但是还是存在一个没有解决的问题

Error： `Refused to set unsafe header "Access-Control-Request-Headers"`

每一个请求都会提示这个错误。
但是不影响后面请求的继续发起和接收
```

```js
// 八家黑
// 原来是自己给自己挖了一个坑

// http.js

const service = axios.create({
  baseURL: 'http://localhost:8081', // 即使是localhost也需要 `http` 开头的
  headers: {
    'Access-Control-Request-Headers': 'X-Custom-Header'
  },
  timeout: 5000
})

原来我在这里设置了。真的是很无语啊。而且还是一个不知道什么意思的 `X-Custom-Header` -- 用户自定义头部？？？？？

将上面的 headers 去掉就没事了.

给自己点个赞。虽然花了将近一天的时间稻谷这个问题
```

```js
// 题外话

途中还出现的权限验证的问题，主要就是发生在 'OPTIONS' 请求时。在相应的地方加上一些判断就可以了

// checkTokenValid.js
if (ctx.request.url.startsWith('/api/auth') || ctx.method === 'OPTIONS') { // login、register、logout
    await next()
  } else {
```

【完结】

`所以啊`
自己写 bug 的能力还是挺厉害的


**总结：**
1. 后台的配置是必不可少的，光靠前端通过简单的配置而没有后台的协调是不行的。
2. webpack 的 proxy 跨域代理 还需要多了解。目前也没有很理解
3. http 内容很丰富
4. 后台同时很给力。指点我在 非 OPTIONS 请求时也设置headers 这样才可以拿到数据
5. 自己写 bug 实力提升😜


## 参考

1. [为什么会有跨域的产生](https://blog.csdn.net/qq_27868533/article/details/79127172)
2. [阮一峰 跨域](http://www.ruanyifeng.com/blog/2016/04/cors.html)
3. [StackOverflow haowenti](https://stackoverflow.com/questions/32500073/request-header-field-access-control-allow-headers-is-not-allowed-by-itself-in-pr)