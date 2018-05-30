# 文件上传

> 图片上传

主要用于用户头像上传

## koa-multer

> 目前的逻辑是保存在本地项目的静态文件中

保存到服务器之类的地方还需要继续写逻辑

## 使用七牛

  Node.js SDK

## Griddfs

> 文件分块保存

这个其实不是很懂
1. node直接操作 gridfs 并且可以很好的文件控制（输出一个直接可用的 gfs 变量），好像灭有找到很好的办法
2. 就算可以很好的拿到 gfs 对象，获取道的数据也只是一个二进制的数据流，首先还是要先写入磁盘，再将该文件在磁盘中的路径返给前端进行显示。无法做到直接查找数据的结果就是一个前端可访问的文件地址
3. 综上，这个文件上传保存的方案不是很好。还不如直接写道磁盘中（static）

`没有实现好的代码片段`

```js
...
static async uploadAvatarLocal (ctx) {
  // 🎈用户头像上传（保存到本地）
  try {
    let gfs = GridFs.create_gfs()
    console.log(gfs)
    let file = ctx.req.file
    console.log(file)
    let gfs_options = {
      filename: file.filename,
      mode: 'w',
      metadata: {
        client: ctx.username,
        user: ctx.userID
      }
    }
    let writeStream = gfs.createWriteStream({
      filename: file.path
    })
    fs.createReadStream('./source.txt').pipe(writeStream)
    writeStream.on('close', file => {
      console.log(file)
    })
    ctx.body = ResponseHelper.returnTrueData({message: '头像上传🤵'})
    
  } catch (error) {
    console.log(error)
  }
}
```

**NOTES:**

1. 注意保管好自己的安全密钥
2. 文件返回的 `hash` 字段是上传成功后的文件名，正确显示需要加上 `QINIU_DOMAIN_PREFIX`
3. 返回得 {hash: 'xxx', key: 'yyyy'} 两个字段都可以用，只是显示的名称不一样

## 参考

[1](http://www.jb51.net/article/119967.htm)
[2](https://developer.qiniu.com/kodo/sdk/1289/nodejs)
[3](https://blog.csdn.net/ziwoods/article/details/72822730)
