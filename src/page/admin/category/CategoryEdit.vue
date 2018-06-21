<template>
  <subpage>
    <bread-crumb :breads="breads"></bread-crumb>
    <div style="margin-top: 100px">
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <el-form label-position="top" label-width="100px">
            <el-form-item label="文章分类/标签">
              <el-input v-model="category" placeholder="请输入文章分类/标签"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center">
              <el-button type="success" @click="certain">确认</el-button>
              <el-button @click="$router.go(-1)">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </subpage>
</template>

<script>
import api from '@/api'
import Subpage from '@/components/subpage/Subpage'
import BreadCrumb from '@/components/common/TheBreadCrumb'
export default {
  name: '',
  data () {
    return {
      breads: [{name: '分类列表', path: '/admin/category'}, {name: '分类编辑'}],
      category: ''
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.fetchCategory()
  },
  methods: {
    fetchCategory () {
      api.getCategory(this.id).then(res => {
        this.category = res.data.name
      }).catch(err => console.log(err))
    },
    certain () {
      if (!this.category.trim()) {
        this.$message.warning('分类名称不能为空！')
        return
      }
      let data = {
        name: this.category
      }
      api.editCategory(this.id, data).then(res => {
        this.$message.success('分类名称修改成功！')
        setTimeout(_ => {
          this.$router.go(-1)
        }, 3000)
      }).catch(err => console.log(err))
    }
  },
  components: {
    Subpage,
    BreadCrumb
  }
}
</script>

<style lang="scss" scoped>

</style>
