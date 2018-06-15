# TODO

> 该项目需要完善的地方

## LIST

TODO:

1. ✅authcheck 似乎还存在问题，setting.vue 中有个接口明显有个 401 但是 http 没有捕获到
2. ✅在前端页面中添加一个进度条加载（效果不是很好）
3. ✅增加一个点击的 wave 效果
4. ✅用户权限控制的逻辑需要修改。isAdmin 这个字段应该是由 `user` 的 permissions 这个字段进行判断。如果为 1 或者 4 则为 true。4：超级管理员，1：普通管理员
5. ✅再增加一个 v-directive 自定义指令的应用。做到进一步的熟练
6. ✅在项目中找一个地方对 vue 的 mixin （混入）进行实际应用
7. ❎增加后台文章添加的页面。这个其实挺重要的
8. ✅博客添加菜单，将爱好放到用户设置里面
9. ✅首页的header 应该随着滚动条显示隐藏
10. ❎增加相册页面功能
11. ✅增加修改密码的功能
12. ❎增加一个消息盒子
13. ❎

样式问题可能还需要进一步修改。关键是如何调整
后台的如何组织？
 

### 💹解决一

问题出现在，这个请求时  `element-ui` 自己发起的。虽然后台报了 401，但是却不是我的 http.js 代码获取到这个响应
因此不能实现我代码中 401 跳转到登陆页的逻辑

```js
// 控制台输出
POST http://localhost:8081/api/blog/user/avatar 401 (Unauthorized)
```

```js
// api 后台日志
koa is listening in 8081
Token Error: jwt expired
Token Error: jwt expired
Token Error: jwt expired
```

```html
<!-- setting.vue 代码 -->
<el-upload
  class="avatar-uploader"
  action="http://localhost:8081/api/blog/user/avatar"
  :headers="headers"
  method="post"
  :on-change="onChange"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
```

**修改如下：**
很简单，拿到这个错误的控制权🔨
然后再根据错误的类型做出判断

```js
html 代码中添加一个错误的回掉函数

:on-success="handleAvatarSuccess"
:on-error="handleAvatarFailure"

handleAvatarFailure (err) {
  console.log(err)
},

// 控制台输出
Error: {"success":false,"message":"无效token❌","status":401,"data":null}
    at getError (element-ui.common.js?1b95:25646)
    at XMLHttpRequest.onload (element-ui.common.js?1b95:25699)

// 震惊：这个错误输出居然还带 Error
```

### 💹解决二

> directive

