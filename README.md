# vue-koa

> just for learn

## vue2

> 个人学习心得可以查看文档中的 `vue.md` 

1. 搭建一个类似博客的应用
2. 提供后台管理页面
3. 一些测试的学习

## koa2

> 个人学习体会可以查看文档中的 `koa.md` 

1. 使用mongoose作为数据库存储
2. 为vue前端提供api接口
3. 尝试理解实现前后端分离的思想
4. 学习koa2

## todo

> 具体可以查看文档目录里面的 `todo.md` 进行查看

- [ ] 前端博客页面需要更加完善。增加文章评论板块
- [ ] 增加一个实时聊天窗口
- [ ] 项目结构需要进一步优化

- [x] 掌握 `directive` 语法，并实验简单的一个demo


## 项目结构

|__docs/              # 相关文档
|__server/            # 后台
    |__conf/          # 基本/敏感信息配置(需自建❗)
        |__instance
    |__controllers/   # 后台具体业务相关
    |__dbHelper/      # 数据库操作封装
    |__log/           # 日志输出(被忽略❗) / 需要自己创建
        |__error/
        |__response/
    |__middlewares/   # koa中间件
    |__models/        # 数据库模型
    |__shemas/        # 数据库表结构
    |__static/        # 静态文件 / 存放用户上传的文件或者头像
    |__routes/        # 路由。不要和前台路由冲突
    |__config.js      # 配置文件
    |__db.js          # 数据库
    |__ws.js
|__src/               # 前台
    |__asset/         # Webpacked 资源
    |__api/           # 接口调用封装
    |__components/    # 通用组件
    |__directive/     # 自定义指令
    |__filter/        # 过滤器
    |__page/
        |__Blog.vue   # 博客根模板
        |__Admin.vue  # 管理界面根模板
        |__...
    |__router/
    |__store/
    |__styles/        # 项目样式
    |__util/          # 工具函数
    |__App.vue        # 根组件
    |__main.js        # 前台入口文件
|__static/            # "真实的" 静态资源
    |__images/
|__app.js             # 后台入口文件
|__index.html
|__.gitignore
|__README.md

## 启动

1. npm run dev
2. 启动mongodb
    * 进入mongodb 安装目录 cd bin  （我的安装目录为 E:/mongodb）
    * ./mongod --dbpath=E:/mongodb/db | cmd 可能是这样 --dbpath=E:\mongodb\db
    * 启动 Robo 3T 连接 mongodb 127.0.0.1
    * 可能需要建立一个对应的集合和文档 -> myblog
3. node app.js

## 说明

1. server 文件夹中有一部分敏感的配置文件信息被屏蔽了。比如：

```js
// ~/server/conf/instance.js

QINIU_DOMAIN_PREFIX = 'XXXXXXX'       // python 存储空间
QINIU_ACCESS_KEY = 'YYYYYYY'          // qiniu 安全密钥
QINIU_SECRET_KEY = 'ZZZZZZZ'
QINIU_BUCKET_NAME = 'PPPPPPP'         // qiniu 上传空间名
```

使用的时候可能会报不存在相关的文件的错误，请及时添加该文件 -- 默认情况下不使用这个接口 -- 并到七牛上进行注册

2. about组件部分内容涉及个人信息，做了一部分处理，请勿做使用
3. 具体参考 github 上面的信息

## 参考

[mongoose文档](http://mongoosejs.com/docs/connections.html)
[vue2-koa2-mongodb demo](https://juejin.im/post/58f99b3cac502e006395e6e7)
