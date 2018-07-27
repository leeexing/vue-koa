# node

> 学习一些基本的模块

## session

> koa 中的ctx 没有 session 属性

需要使用单独的模块 `koa-session`

## cookies ❗❗❗

> Cookie具有不可跨域名性。

  很重要啊。困扰了很久

### BB

之前通过 `ctx.cookies.set('access_token', value, {})` ，但是前端的cookies一直看不到自己设置的值
可是通过查看login api 中的 `response headers` `Set-Cookies` 却可以看到自己设置的值。好奇怪
上网查找了很多的文章，都没有解决自己的这个疑惑

昨天自己有花了一个多小时想要彻底解决这个问题，知道快下班也没有攻克

知道今天早上 2018-07-27

才通过一天文章，发现之前实现失败的原因
还是一个http配置的问题

### 两点

```js
// 带cookie请求
axios.defaults.withCredentials = true

// 创建axios实例
const service = axios.create({
  baseURL,
  withCredentials: true,  <--- 🅰
  timeout: 5000
})

// 解释
// `withCredentials` indicates whether or not cross-site Access-Control requests
// should be made using credentials
withCredentials: true, // default

把默认配置withCredentials改为true，就可以允许跨域携带cookie信息了
```

axios默认是发送请求的时候不会带上cookie的，需要通过设置withCredentials: true来解决。 这个时候需要注意需要后端配合设置：

* header信息 Access-Control-Allow-Credentials:true
* Access-Control-Allow-Origin不可以为 '*'，因为 '*' 会和 Access-Control-Allow-Credentials:true 冲突，需配置指定的地址

```js
const CORS_CONFIG = {
  origin (ctx) {
    if (ctx.url === '/api/proxy/') {
      return '*'
    }
    return 'http://localhost:7012'  <---- 🆑 这里也是很重要。恰好没有设置为 '*'，不然又以为那里出错了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5000,
  credentials: true,  <--- 🅱
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-requested-with', 'origin']
}
```

```js 🆎
// ctx.response.headers['Set-Cookie'] = 'foo=bar; Path=/; HttpOnly' // --- 之前尝试的，仿照express去实现，没有成功。记录一下
// ctx.set("Access-Control-Allow-Credentials", true) // axios 和 cors 配置好了后，可以不用在这里设置了

ctx.cookies.set('access_token', access_token, {path: '/', expires: new Date('2018-08-16')}) // ❌❌❌保存用户登录信息.好像没有起作用

// 问题是
cookies里面多了一个属性 access_token.sig

🅾🅾🅾
因为，ctx.cookies.set 默认会生成一个签名的cookie -- ctx.cookies.set(key, value, {signed: true})
如果不想在浏览器中看到 key.sig 的cookie 字段，那么就要设置 signed: false
```

**参考**

* [看了这一篇文章才算解决](https://segmentfault.com/q/1010000013254647)
* [还有这一篇](https://segmentfault.com/a/1190000011811117)

### 使用

```js
ctx.cookies.set(name, value, [options])

ctx.cookies.get('name', [option]);

 * signed: true/false  <-- 🈸获取的时候，可选参数只有一个是否签名。如果设置的时候没有签名，获取的时候又需要签名，那么拿到的值就是 undefined
```

options 名称 options 值
signed              cookie 签名值 true/false  <-- 不需要再具体设置了。因为在 keys 那里已经设置了！！！❗❗❗❗
maxAge              一个数字表示从 Date.now() 得到的毫秒数
expires cookie      过期的 Date
path cookie         路径, 默认是'/'
domain cookie       域名
secure             安全 cookie   默认false，设置成true表示只有 https可以访问
httpOnly           是否只是服务器可访问 cookie, 默认是 true
overwrite          一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。


**有一点很重要的**

如果需要使用 signed 这个签名属性，app 一定要使用 app.keys = ['xxx', 'yyy']
不然就会报一个错

```js
app.keys = ['skr', 'diss', 'punchline']
```

```js
Error: .keys required for signed cookies
    at Cookies.set (E:\Leeing\vue\vue-koa\node_modules\_cookies@0.7.1@cookies\index.js:108:27)
    at login (E:\Leeing\vue\vue-koa\server\controllers\auth.js:64:25)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)
```

**补充**

设置了签名的 cookie 删除的时候添加一个参数  set.(key, null, {signed: true})
否则不能将带有签名的 key.sig 删除掉
虽然删除不掉，但是下一次重新登陆的时候，他会将原来的签名cookie覆盖掉
koa 内部会对这个签名进行验证，会将cookie和带签名的cookie进行匹配验证

### 又遇到一个问题

💔
通过 `nginx` 进跨域设置，这里设置 'cookies' 是不行的

```js
Failed to load http://localhost:7013/api/auth/login: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. Origin 'http://localhost:7012' is therefore not allowed access. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
```

之前的 nginx 是这样配置的

```js
server {
    listen       7013;
    server_name  localhost;

    location /api {
        proxy_pass http://localhost:8081/api;
        # 添加响应头
        add_header Access-control-Allow-Origin *;
        # add_header Access-control-Allow-Origin $http_origin;
        add_header Access-Control-Allow-Credentials 'true';
        add_header Access-Control-Allow-Methods 'OPTIONS, POST, GET, PUT, DELETE';
        # add_header Access-Control-Allow-Headers $http_access_control_request_headers;
        add_header Access-Control-Allow-Headers 'Authorization, X-Requested-With, Content-Type';
        if ($request_method = OPTIONS) {
            return 200;
        }
    }
}
```

需要做的更改是

```js
# add_header Access-control-Allow-Origin *;
add_header Access-control-Allow-Origin $http_origin;
```

完美解决✅

💚
可算将这个疑惑解决了

## multer

```js
var muilter = require('./multerUtil');
        //multer有single()中的名称必须是表单上传字段的 `name` 名称。 ❗❗❗❗
 var upload=muilter.single('file'); 
```

```html
<input type="file" name="file" /> 
```

🛑
默认情况下，element-ui 的上传组件都会将对应的 `input` 的 name 字段默认命名为 `file`

参考

[1](https://cnodejs.org/topic/564f32631986c7df7e92b0db)

## koa

### 删除Mongod返回数据的字段问题

> delete 操作对 mongodb 对象不起作用

```js
let user = await User.findOne({username}, {password: 0})
let obj = {
  name: 'leeing',
  age: 23
}
delete obj.age
console.log(obj)
console.log('>>>', user)
delete user.motto
console.log(motto)
ctx.body = ResponseHelper.returnTrueData({data: user})
```

**小结**
1. delete 操作对js 的对象还是有用的
2. 对于 mongodb 返回的对象，可能是 user 不是 object 数据类型，执行 delete 不起作用

### 静态文件

> koa-static

```js
const server = require('koa-server')
app.use(server(__dirname + '/server/static/'))
```

**注意事项**

1. 访问静态资源的时候，不需要带上 `/server/static` 这个路径。直接就是static里面的文件路径即可

`http://localhost:8081/logo.png`  这样就可以了
`http://localhost:8081/server/static/logo.png` 就是route了，会进行权限验证

2. 路径相对于 app 的路径。`__dirname` 就是 app.js 的路径（一般就是根目录）

### 中间件

备注一个之前写的，现在不用了

```js
app.use(async (ctx, next) => {
  ctx.userInfo = {}
  console.log(ctx.cookies.get('leeing_token'))
  if (ctx.cookies.get('userInfo')) {
    ctx.userInfo = JSON.parse(ctx.cookies.get('userInfo'))
    ctx.userInfo.username = unescape(ctx.userInfo.username)
    let userInfo = await User.findById(ctx.userInfo.id)
    ctx.userInfo.isAdmin = !!userInfo.isAdmin
    await next()
  } else {
    await next()
  }
})
```

### next 该怎么用

> 一个坑

之前是这么写的

```js
} else {
  ctx.userID = decoded.id
  next()
}
```

没有return，结果get请求的时候没有问题，但是 post 和 put请求的时候，控制台一直是这样的状态

```js state
$ node app.js
koa is listening in 8081
{ username: 'admin',
  isAdmin: false,
  id: '5b03694a5995505e806949dd',
  iat: 1527147916,
  exp: 1527151516,
  iss: 'http://localhost:7012' }
  <-- POST /api/blog/article
```

这就是一直没有响应。然后客户端一直告诉我
**POST http://localhost:8081/api/blog/article 404 (Not Found)**
尝试修改成get也不行。
还怀疑是 `cors` 的问题。...
结果，就是这个中间件的 next 没有加 return
服了

正常应该是

```js normal
$ node app.js
koa is listening in 8081
  <-- POST /api/blog/article
  --> POST /api/blog/article 200 3ms 32b

    <-- GET /api/blog/articles
  --> GET /api/blog/articles 200 50ms 220.96kb
```

```js
async function validToken (ctx, next) {
  // console.log(ctx.request)
  // console.log(ctx.request.url)
  if (ctx.request.url === '/api/auth/login') {
    await next()
  } else {
    if (ctx.request.header['authorization']) {
      let token = ctx.request.header['authorization'].split(' ')[1]
      // let decoded = jwt.decode(token, JWT_SECRET_KEY)
      await verify(token, JWT_SECRET_KEY).then(decoded => {
        // console.log(decoded)
        if (token && decoded.exp <= new Date() / 1000) {
          ctx.status = 401
          console.log('token 过期了')
          Logger.logResponse('token 过期了' + ' ⚠ ' + token)
          ctx.body = ResponseHelper.returnFalseData({message: 'token 过期了😂'})
        } else {
          ctx.userID = decoded.id
          return next()
        }
      }).catch(err => {
        console.log('Token Error:', err.message)
        Logger.logError(err.name + ' : ' + err.message)
        ctx.status = 401
        ctx.body = ResponseHelper.returnFalseData({message: '无效token❌'})
      })
    } else {
      ctx.status = 401
      ctx.body = ResponseHelper.returnFalseData({message: '没有token🈚'})
    }
  }
}
```

### koa中获取get参数

> 两种方法

```js
let query = ctx.req._parsedUrl.query
console.log(query, '或者>>>', ctx.query)

```

控制台是这么打印的

```js
<-- GET /api/blog/articles?pageSize=5&currentPage=1
pageSize=5&currentPage=1 或者>>> { pageSize: '5', currentPage: '1' }
  --> GET /api/blog/articles?pageSize=5&currentPage=1 200 146ms 3.01mb

```

**小结：**
一个拿到的是类似url问号后面的 search 字段
一个拿到的是经过koa封装好的对象数据

### koa中获取 post | put 提交的值

```js
router.post('/c', async (ctx, next) => {
  let postData = ctx.request.body
})
```

### 路由里面的参数

```js
let params = ctx.params
```

## Middleware 中间件

### CORS


参考
[koa2跨域请求](https://www.jianshu.com/p/5b3acded5182)

## base64

> 必要的时候需要将 SECRET_KEY 先进行一下base64 加密。避免别人通过代码看出加密的密钥

```js
const SECRET_KEY = 'amFtZXNuaXViaQ=='
// 是通过 new Buffer('jamesniubi').toString('base64') 编码得来

// 使用的时候需要先进行解码

const key = new Buffer(SECRET_KEY, 'base64').toString() // 'jamesniubi'

```

**注意：**
`crypto` 是node的内置模块，在vue的项目中可以直接使用。因为 vue 本身就是基于 node 进行开发的。

为什么 node 的内置模块可以通过 import 进行直接引用呢？

因为我们有 babel 啊

```js
import crypto from 'crypto'
import {SECRET_KEY_MD5} from './config'

class Md5 {
    static genMd5 () {
        let md5 = crypto.createHash('md5')
        let timeStamp = Md5.genTimeStamp()
        let randomCode = Md5.genRandomSelect(6)
        let key = new Buffer(SECRET_KEY_MD5, 'base64').toString()
        let str = `${timeStamp}|${randomCode}|${key}`
        md5.update(str)
        let salt = md5.digest('hex')
        return `${salt}${randomCode}${timeStamp}`
    }
    static genRandomSelect (n) {
        let STRING_SELECT = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'
        let str = ''
        for (let i = 0, len = STRING_SELECT.length; i < n; i++) {
            str += STRING_SELECT[Math.floor(Math.random() * len)]
        }
        return str
    }
    static genTimeStamp () {
        return Math.floor(new Date().getTime() / 1000)
        // return Math.floor(new Date(new Date().toUTCString().replace(' GMT', '')).getTime() / 1000)
    }
}
export default Md5
```


## util

> 工具函数

### 风格转换

callabck 转换 promise

node中的回调函数都是这种风格：error-first 作为第一个参数
使用 `promisify(original)` 方法将这种类型的函数转换成 返回 promise 的形式

```js demo
// fs 模块
const fs = require('fs')
fs.readFile('./h.js', (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(data.toString())
})

const fs = require('fs')
const util = require('util')
const readFilePromise = util.promisify(fs.readFile)

readFilePromise('./h.js')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.error(err)
  })

```

第二个例子在项目中
```js second_demo
const fs = require('fs')
const util = require('util')
const fsExists = require(fs.exists) // 不是传字符串

let exists = await fsExists(path)
if (exists) {
  fs.unlink(path) // 删除文件
}
```

## 参考

[1](https://juejin.im/post/5b029603f265da0b722b6df5)