# 文件上传

> 图片上传

主要用于用户头像上传

## koa-multer

> 目前的逻辑是保存在本地项目的静态文件中

保存到服务器之类的地方还需要继续写逻辑

## 使用七牛

  Node.js SDK

**NOTES:**

1. 注意保管好自己的安全密钥
2. 文件返回的 `hash` 字段是上传成功后的文件名，正确显示需要加上 `QINIU_DOMAIN_PREFIX`
3. 返回得 {hash: 'xxx', key: 'yyyy'} 两个字段都可以用，只是显示的名称不一样

## 参考

[1](http://www.jb51.net/article/119967.htm)
[2](https://developer.qiniu.com/kodo/sdk/1289/nodejs)
[3](https://blog.csdn.net/ziwoods/article/details/72822730)
