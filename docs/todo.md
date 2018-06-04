# TODO

> 该项目需要完善的地方

## LIST

TODO:

1. ✅authcheck 似乎还存在问题，setting.vue 中有个接口明显有个 401 但是 http 没有捕获到
2. ✅在前端页面中添加一个进度条加载（效果不是很好）
3. ❎增加一个点击的 wave 效果

解决：
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


