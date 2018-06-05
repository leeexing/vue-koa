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

下面的查询，userID 的数据是包括所有的 user 信息
```js
let todoDetail = await Todolist.findOne({_id: id}).populate({path: 'userID'})

// 或者这样
let todoDetail2 = await Todolist.findOne({_id: query.id}).populate('userID') // 这样也行

// 结果
{ _id: 5b15e58ce4e9b96fccd4e056,
  userID:
   { _id: 5b15e53ae4e9b96fccd4e055,
     username: 'koba',
     password: '$2a$10$H0aDj5W6qwU3w94dazGky.JCmsw1A23svP/CdFEJpWnqI3tRBtGQa',
     __v: 0,
     signature: '一想起你，我的丑脸就泛起微笑',
     todos: [],
     follows: [],
     permissions: 1,
     email: 'lixingyah@163.com',
     tags: [],
     isAdmin: false,
     avatar: 'http://localhost:8081/upload/1528161654915.jpg' },
  title: '一想起尼亚',
  __v: 0,
  updated_at: 2018-06-05T01:21:16.052Z,
  created_at: 2018-06-05T01:21:16.052Z,
  finished: false,
  remindTime: '' }
```

1. 如果我不想获取敏感信息。只返回用户的局部信息。在 populate 中使用 `select` 关键字

```js
let todoDetail = await Todolist.findOne({_id: query.id}).populate({path: 'userID', select: 'email'})
console.log(todoDetail)

// 注意到，userID 里面的信息只有我们 select 的 email
{ _id: 5b15e58ce4e9b96fccd4e056,
  userID: { _id: 5b15e53ae4e9b96fccd4e055, email: 'lixingyah@163.com' },
  title: '一想起尼亚',
  __v: 0,
  updated_at: 2018-06-05T01:21:16.052Z,
  created_at: 2018-06-05T01:21:16.052Z,
  finished: false,
  remindTime: '' }
```

2. 如果想要多个数据，select 传入一个数组

```js
let todoDetail = await Todolist.findOne({_id: query.id}).populate({path: 'userID', select: ['email', 'avatar']})
console.log(todoDetail)

{ _id: 5b15e58ce4e9b96fccd4e056,
  userID:
   { _id: 5b15e53ae4e9b96fccd4e055,
     email: 'lixingyah@163.com',
     avatar: 'http://localhost:8081/upload/1528161654915.jpg' },
  title: '一想起尼亚',
  __v: 0,
  updated_at: 2018-06-05T01:21:16.052Z,
  created_at: 2018-06-05T01:21:16.052Z,
  finished: false,
  remindTime: '' }
```

### 一对多的关系

```js
// User Schema

const UserSchema = new Schema({
  username: String, // 用户名
  password: String, // 密码
  ...
  todos: [{  // 一对多的关系
    type: Schema.Types.ObjectId,
    ref: 'Todolist'
  }]
})
```

这种一对多的关系处理，在添加新的 todo 的时候，第一需要给 Todolist Schema 里面的 serID 传入 添加用户的ID号
其次，如果想要通过 User 里面的 todos 获取到与之相关的 todolist 的信息，那么需要做的就是，将这个 Todolist 的 _id 
传给 user 用户的 todos 数组中（push）。
这样整个下来，效率似乎是有一点低下的了。没有很大的必要说我就要通过 user 来获取到和他相关的 todos。而是可以直接
通过 userID 在 todolist 这个文档中进行筛选。这样反而显得更加的灵活

**小结**
mongodb 本身就是 NoSQL 类型的数据库，不要太带有关联的思想去做查询！

## 参考

1. [官方文档](http://mongoosejs.com/docs/guide.html)
1. [关联查询](http://mongoosejs.com/docs/populate.html)