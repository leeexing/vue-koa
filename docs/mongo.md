# mongoDB

## 删除

> remove() 不行的话，尝试使用下面的方法

```js
  static async deleteTodo (ctx, next) {
    /**
     * ✅删除具体待办事项
    */
    try {
      let id = ctx.params.id
      console.log(id)
      await Todolist.remove({_id: id})
      ctx.body = ResponseHelper.returnTrueData()
    } catch (err) {
      LogHelper.logError('删除todolist', err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError()
    }
  }
```

**官方推荐**

1. deleteOne({})
2. deleteMany({})

## 关联查询

> population

```js
const TodolistSchema = new Schema({
  // 用户的id。建立表关联
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  ...
})
```

```js
let user = await Todolist.findOne({_id: id}).populate({path: 'userID'})
```

## 参考

1. [官方文档](http://mongoosejs.com/docs/guide.html)
1. [关联查询](http://mongoosejs.com/docs/populate.html)