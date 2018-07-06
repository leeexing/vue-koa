<template>
  <subpage :customStyle="{background: 'transparent'}" :hasBack="true">
    <div class="m-album-detail">
      <h1 class="title">{{albumInfo.albumName}}</h1>
      <p class="desc">相册描述：{{albumInfo.albumDescription}}</p>
      <section class="photos">
        <div class="photo-list" v-for="item in photoList" :key="item.id">
          <img :src="item.photoUrl" alt="">
        </div>
        <p v-show="!photoList.length" class="no-photo">该相册暂无皂片，点击下方按钮进行添加~</p>
      </section>
      <el-upload
        class="avatar-uploader"
        ref="upload"
        multiple
        :headers="headers"
        :action="actionUrl"
        :file-list="fileList"
        list-type="picture"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :auto-upload="false"
        :limit="10"
        :on-exceed="handleExceed"
        >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb。单次最大上传量为5个</div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </subpage>
</template>

<script>
import api from '@/api'
import {getToken} from '@/util/auth'
import {baseURL} from '@/util/config'
import Subpage from '@/components/subpage/Subpage'
export default {
  name: 'album',
  data () {
    return {
      albumInfo: {
        albumName: '',
        albumDescription: ''
      },
      headers: {
        authorization: 'Bearer ' + getToken()
      },
      actionUrl: baseURL + `/api/blog/${this.$route.query.id}/photos`,
      fileList: [],
      photoList: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.fetchAlbumDetail()
    this.fetchAlbumPhotos()
  },
  methods: {
    fetchAlbumDetail () {
      api.fetchAlbums({id: this.id}).then(res => {
        console.log(res)
        this.albumInfo = res.data[0]
      }).catch(err => console.log(err))
    },
    fetchAlbumPhotos () {
      api.fetchAlbumPhotos(this.id).then(res => {
        console.log(res)
        this.photoList = res.data
      }).catch(err => console.log(err))
    },
    submitUpload () {
      this.$confirm('你确定要上传这批皂片嘛？', '温馨提示').then(() => {
        this.$refs.upload.submit()
      }).catch(() => {
        this.$message.info('已取消上传')
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleExceed (files, fileList) {
      console.log(files)
    }
  },
  components: {
    Subpage
  }
}
</script>

<style lang="scss">
.m-album-detail {
  padding: 0 30px;
  h1 {
    margin: 20px 0;
    padding: 5px 20px;
    border-left: 3px solid silver;
  }
  .desc {
    margin-bottom: 10px;
    color: #666;
    font-size: 14px;
  }
  .photos {
    display: flex;
    margin: 20px 0;
    padding: 20px;
    box-shadow: 0 0 2px 2px silver;
    .no-photo {
      padding: 20px;
      text-align: center;
    }
    .photo-list {
      width: 25%;
      margin-right: 10px;
      margin-bottom: 10px;
      img {
        max-width: 100%;
      }
    }
  }
}
</style>
