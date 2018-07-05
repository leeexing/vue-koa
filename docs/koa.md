# node

> 学习一些基本的模块

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