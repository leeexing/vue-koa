# mongoDB

## 跟新 update

> 如果需要多条记录一次性更新的时候，ODK

1. 更新一条

```js
db.getCollection('articles').update({category: {$in: ['Node']}}, {$addToSet: {category: 'demo'}})
```

2. 更新多条

```js
db.getCollection('articles').update({category: {$in: ['Node']}}, {$addToSet: {category: 'demo'}}, false, true)

db.articles.update({category: {$in: ['Node']}}, {$pull: {category: 'demo'}}, false, true)
```

### update 参数 ![3]

* 参数1：筛选条件

* 参数2：更新哪些字段

* 参数3：如果没有筛选到符合条件的记录，是否需要将参数2插入到集合中，默认false，不插入

* 参数4：默认false，一次更新一条；true一次更新多条，此时参数2需要使用$set操作


或者

```js
db.getCollection('articles').update({category: {$in: ['Node']}}, {$addToSet: {category: 'demo'}}, {multi: true})

db.articles.update({category: {$in: ['Node']}}, {$pull: {category: 'demo'}}, {multi: true})
```

**语法很重要**

db.collection.update(query, update, [options])

options:
  * upsert: 如果不存在update的记录，是否插入 objNew， 默认 false
  * multi
  * writeConcern


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

## Schema

设置数组的默认时

```js
const MenuSchema = new Schema({
  name: String,
  userType: [{
    type: Number,
    default: 4
  }],
  order: {
    type: Number,
    default: 1
  },
  url: String,
})
```

上面的 `userType` 定义为数组，且想要设置一个默认值 为 4
但是，这样做是不行的。这样的意思是，表示数组里面一个对象，

正确的写法很直接

```js
const MenuSchema = new Schema({
  name: String,
  userType: {
    type: Array,
    default: [4]
  }
})
```

## 参考

1. [官方文档](http://mongoosejs.com/docs/guide.html)
2. [关联查询](http://mongoosejs.com/docs/populate.html)
3. [update 参数](https://blog.csdn.net/mlz_2/article/details/46545081)
4. [Mongodb 基本使用](https://www.jianshu.com/p/2f54b90efe15)