# *crypt

> 加密 & 解密

前后端都用了不同的加密和解密包

koa：bcryptjs
vue：jsencrypt

## bcryptjs

> 主要还是在加密部分。暂时没有提供解密的api

```js
import bcrypt from 'bcryptjs' // vue
const bcrypt = require('bcryptjs') // koa

// register
let salt = bcrypt.genSaltSync(10)
let hash = bcrypt.hashSync('sessionData 我会牢牢记住你的脸', salt)
console.log(hash)

// login
if (!bcrypt.compareSync(data.password, userInfo.password)) { // 第一个参数必须是用户输入的数据
  ctx.body = ResponseHelper.returnFalseData({message:'密码错误！'})
}
```

## jsencrypt

> 加密和解密都可以，需要设置公钥和私钥

**生成公钥和私钥（服务端生成）**

```js
import JsEncrypt from 'jsencrypt'

let jss = new JsEncrypt()
jss.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8ygMKjJLSUpnfXqt8lRSAdDxA
HWKi9GbTFkCbAjkRCR6VUakxxXLXHQUtPCizKcvNpuYqZ5bO8LEgpY7SL3JEdEI9
OuMnZ6ToeHPfcHeS+EgN0oYmdQ49RB5wZkcBEFk80OBEAM6VhnE0IuHGkU5ko9oP
Hq3boEQ3Ej6r3T+UhQIDAQAB
-----END PUBLIC KEY-----`)
let encode = jss.encrypt('sessionData 我会牢牢记住你的脸')
console.log(encode)
jss.setPrivateKey(`-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQC8ygMKjJLSUpnfXqt8lRSAdDxAHWKi9GbTFkCbAjkRCR6VUakx
xXLXHQUtPCizKcvNpuYqZ5bO8LEgpY7SL3JEdEI9OuMnZ6ToeHPfcHeS+EgN0oYm
dQ49RB5wZkcBEFk80OBEAM6VhnE0IuHGkU5ko9oPHq3boEQ3Ej6r3T+UhQIDAQAB
AoGBAIO8JwEedHlE4FBovBsT4Bl+gmhu2NxC1NlpBq3jkDSd+3RQZlLvp6IJgwo8
l13lxWv8kVF3tVkzxTW1sQJjz0RYShH8vXLl94gf6mFkJbeOPP6uA0mGDG81yINw
KUpE0RM6ZM9yKEeVdK3u67TkEBcC6Td5KBl8Yof3q7qxiOWhAkEA4BXEtpnfhgm3
7s1VjDxdIHTtWL1PihMT+SCOqp+Vv27ABVrxtDW/w2R3ZzR5ezROI2v1DVhj5wvs
xPGXx6OpSQJBANetVvazS/5SQNvb+Cmjw9Rt5NilyxfX5IsSswaIojbwhZY2FVZy
AlFH9K/YS2FYFyU7iIqN6IIkOxXpOcj/bV0CQQCRYM4MgWuotClmfkSgBJGOew14
4uj1dUch+2NTgtFOLvXZA5WICs7sXwOwKzUdH2QKSwHitJOr0+q6ItsLpDwxAkBX
zvDK+/CCmIZjfMkqWsxN3nf/ZHCtQm5/2Jsem94/M+mPYHGLgltDMGKEfTEjbrPt
qrFKh8ATzCBqKUwncybZAkEAmVNW1dftWWoriZZXXMvfFkTDgYvRmytoVEThhnd0
J/AOhZiUAs9+kHfGKivlTE209AY6Bw8aRzuTCziSwQhhBQ==
-----END RSA PRIVATE KEY-----`)
console.log(jss.decrypt(encode))
```

加密之后是这样的

```js
rD7uAKlQyhwYn2VUecdORJlkmIS56Qsgc3YMl/ugjdDNz+C2RboEVDfESV5w1fRYI9gFvGE5oXNCz0ab5MMyhjQ6zX5ZSx97DeZ3+K4vX0luf4ckMK3FpMP3e6Rj/moM/DRUz8PkGr1K/Ka9wiFxgAmuvKYrHkihvE8Fdudg1lw=
```

## 参考

[jsencrypt](https://www.cnblogs.com/veritas-sj/p/9082650.html)
