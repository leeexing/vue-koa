# node

> 学习一些基本的模块

## koa

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

## 参考

[1](https://juejin.im/post/5b029603f265da0b722b6df5)