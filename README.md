# vue-koa

> just for learn

## vue2

1. 搭建一个类似博客的应用
2. 提供后台管理页面
3. 一些测试的学习

## koa2

1. 使用mongoose作为数据库存储
2. 为vue前端提供api接口
3. 尝试理解实现前后端分离的思想
4. 学习koa2

## todo

1. 前端博客页面需要更加完善。增加文章评论板块
2. 增加一个实时聊天窗口
3. 项目结构需要进一步优化

## 项目结构

|__server/            # 后台
    |__controllers/   # 后台具体业务相关
    |__dbHelper/      # 数据库操作封装
    |__middlewares/   # koa中间件
    |__models/        # 数据库模型
    |__shemas/        # 数据库表结构
    |__routes/        # 路由。不要和前台路由冲突
    |__config.js      # 配置文件
    |__db.js          # 数据库
    |__ws.js
|__src/               # 前台
    |__asset/         # Webpacked 资源
    |__api/           # 接口调用封装
    |__components/
    |__views/
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
    |__vendor/
|__app.js             # 后台入口文件
|__index.html
|__.gitignore
|__README.md

## 启动

1. npm run dev
2. node app.js
3. 启动mongodb

## 参考

[mongoose文档](http://mongoosejs.com/docs/connections.html)
[vue2-koa2-mongodb demo](https://juejin.im/post/58f99b3cac502e006395e6e7)
