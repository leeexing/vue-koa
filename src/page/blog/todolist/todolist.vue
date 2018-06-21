<template>
  <div class="m-todo">
    <header>
      <h1>
        <i class="iconfont icon-home" title="home" @click="$router.push('/leeing')"></i>
        欢迎：{{username}} !
      </h1>
    </header>
    <main class="content">
      <el-row>
        <el-col>
          <el-input placeholder="请输入待办事项" v-model="todoTitle" @keyup.enter.native="addTodos"></el-input>
          <!-- <div class="block">
            <span class="demonstration">提醒时间</span>
            <el-date-picker
              v-model="date"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div> -->
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane name="first" class="todo-tab">
              <span slot="label"><i class="el-icon-date"></i>待办事项</span>
              <el-col :xs="24">
                <template v-if="hasUnfinished"> <!--v-if和v-for不能同时在一个元素内使用，因为Vue总会先执行v-for-->
                  <template v-for="(item, index) in todolist">
                    <div class="todo-list" v-if="item.finished == false" :key="item.id">
                      <div class="select">
                        <el-checkbox></el-checkbox>
                      </div>
                      <span class="title">
                        {{item.title}}
                      </span>
                      <span class="pull-right">
                        <el-button @click="finished(index, item)" size="small" type="success" icon="el-icon-check" circle></el-button>
                        <el-button size="small" type="primary" @click="showEditDialog(index, item)" icon="el-icon-edit" circle></el-button>
                        <el-button size="small" :plain="true" type="danger" @click="remove(index, item)" icon="el-icon-delete" circle></el-button>
                      </span>
                    </div>
                  </template>
                </template>
                <div v-else>
                  暂无待办事项
                </div>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="已完成事项" name="second">
              <template v-if="hasFinished">
                <template v-for="(item, index) in todolist">
                  <div class="todo-list" v-if="item.finished == true" :key="item.id">
                    <div class="select">
                        <el-checkbox></el-checkbox>
                      </div>
                      <span class="title finished">
                        {{item.title}}
                      </span>
                    <span class="pull-right">
                      <el-button size="small" type="primary" @click="restore(index, item)" icon="el-icon-refresh" circle></el-button>
                      <el-button size="small" :plain="true" type="danger" @click="remove(index, item)" icon="el-icon-delete" circle></el-button>
                    </span>
                  </div>
                </template>
              </template>
              <div v-else>
                暂无已完成事项
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div style="margin-top: 15px;">
            <el-input @keyup.enter.native="searchTodo" v-model="todoSearch" class="input-with-select" placeholder="请输入查询内容">
              <el-select v-model="selectType" slot="prepend" placeholder="请选择">
                <el-option label="ID" value="1"></el-option>
                <el-option label="标题" value="2"></el-option>
              </el-select>
              <el-button @click="searchTodo" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <div class="search-result">
        <el-card class="todo-card" shadow="hover" v-for="item in searchRet" :key="item.id">
          {{item.title}}
        </el-card>
      </div>
    </main>
    <el-dialog title="待办事项修改" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="待办标题">
          <el-input v-model="editTodoInfo.title" auto-complete="off" :placeholder="editTodoP"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api'
  export default {
    name: 'todolist',
    data () {
      return {
        username: '',
        todoTitle: '',
        date: '',
        activeName: 'first',
        todoSearch: '',
        selectType: '2',
        searchRet: [],
        dialogFormVisible: false,
        formLabelWidth: '120px',
        editTodoInfo: {
          title: ''
        },
        editTodoP: '',
        todolist: []
      }
    },
    mounted () {
      document.querySelector('.m-todo header').appendChild('<a>渐渐消失</a>')
      this.username = this.$store.state.username || 'Stranger'
      this.userID = this.$store.state.userID
      api.getTodos({userID: this.userID}).then(res => {
        console.log(res)
        this.todolist = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    computed: {
      hasUnfinished () {
        return this.todolist.filter(item => !item.finished).length > 0
      },
      hasFinished () {
        return this.todolist.filter(item => item.finished).length > 0
      }
    },
    methods: {
      searchTodo (data) {
        let query = {
          id: null,
          title: null
        }
        if (this.selectType === '1') {
          query.id = this.todoSearch
        } else {
          query.title = this.todoSearch
        }
        api.getTodo(query).then(res => {
          console.log(res)
          this.searchRet = res.data.todo
        }).catch(err => {
          console.log(err)
        })
      },
      addTodos () {
        if (this.todoTitle === '') {
          return
        }
        let obj = {
          userID: this.userID,
          title: this.todoTitle
        }
        api.addTodo(obj).then(res => {
          console.log(res)
          this.$message.success(res.message)
          this.todolist.push(res.data)
          this.todoTitle = ''
        }).catch(err => {
          console.log(err)
        })
      },
      finished (index, data) {
        let id = data._id
        data.finished = true
        api.putTodo(id, data).then(res => {
          console.log(res)
          this.$set(this.todolist[index], 'status', true)
          this.$message({
            type: 'success',
            message: '任务完成'
          })
        }).catch(err => {
          console.log(err)
        })
      },
      showEditDialog (index, data) {
        this.dialogFormVisible = true
        this.editIndex = index
        this.editTodoInfo = data
        this.editTodoP = data.title
      },
      edit () {
        if (this.editTodoInfo.title === this.editTodoP) {
          this.$message.info('没有任务修改!')
          this.dialogFormVisible = false
          return
        }
        api.putTodo(this.editTodoInfo._id, this.editTodoInfo).then(res => {
          console.log(res)
          this.dialogFormVisible = false
        }).catch(err => {
          this.dialogFormVisible = false
          console.log(err)
        })
      },
      remove (index, data) {
        let id = data._id
        api.deleteTodo(id).then(res => {
          console.log(res)
          this.todolist.splice(index, 1)
          this.$message({
            type: 'info',
            message: '任务删除'
          })
        }).catch(err => {
          console.log(err)
        })
      },
      restore (index, data) {
        let id = data._id
        data.finished = false
        api.putTodo(id, data).then(res => {
          console.log(res)
          this.$set(this.todolist[index], 'finished', false)
          this.$message({
            type: 'info',
            message: '任务还原~~'
          })
        }).catch(err => {
          console.log(err)
        })
      },
      getUserInfo () {
        let token = JSON.parse(sessionStorage.getItem('vue-koa-token'))
        console.log(token)
        if (token !== null && token !== 'null') {
          return token
        } else {
          return null
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.m-todo {
  header {
    padding: 20px;
    background-color: #333;
    color: #fff;
    font-size: 18px;
    i {
      cursor: pointer;
      font-size: 20px;
      color: #fffad0;
    }
  }
  .content {
    width: 70%;
    margin: 0 auto;
    .todo-tab {
      max-height: 400px;
      overflow-y: auto;
    }
  }
  .el-input {
    margin: 20px auto;
  }
  .todo-list {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    .select {
      width: 25px;
    }
    .title {
      padding: 0 5px;
      flex: 1;
      text-align: center;
      font-size: 20px;
      &.finished {
        text-decoration: line-through;
        color: #606266;
      }
    }
  }
  .pull-right {
    float: right;
  }
  .search-result {
    margin-bottom: 20px;
    .todo-card {
      margin-bottom: 5px;
    }
  }
}
</style>
