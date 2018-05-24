# jwt

> json web token

```js
const jwt = require('jsonwebtoken')
const util = require('util') // node 工具包
const verify = util.promisify(jwt.verify)
```

## 生成token

```js
let token = jwt.sign(userToken, JWT_SECRET_KEY, {expiresIn: JWT_TOKEN_VALID_DATE, issuer: JWT_ISSUER}) // 签发 token
```

## 解码

```js
let decoded = jwt.decode(token, JWT_SECRET_KEY) // 同步
```

## 验证

```js
// 方式一
let tokenVerify = await verify(token, JWT_SECRET_KEY) // 异步

// 方式二
// 这种方法需要注意配合使用 next 的时候，需要前面加 await
await verify(token, JWT_SECRET_KEY).then(decoded => {
  console.log(decoded)
  next()
}).catch(err => {
  console.log(err)
})

// 方式三
jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
  if (err) {
    ctx.status = 401
    console.log(err, 'token 无效')
  } else {
    console.log(decoded)
  }
})

```

## 参考

[1](http://www.jb51.net/article/130555.htm)
[2](https://github.com/auth0/node-jsonwebtoken)
[3-比较好](https://www.cnblogs.com/pingfan1990/p/4905065.html)
[4](https://www.jianshu.com/p/176198fbdb35)