<template>
   <div id="my-map">
    <div>
      <bread-crumb :breadinfo="breadinfo"></bread-crumb>
    </div>
    <div class="amap-page">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap class="myamap" vid="amapdemo" :zomm="zoom" :center="center" :plugin="plugins" :map-manager="amapManager" :events="events">
        <el-amap-info-window  :position="mywindow.position" :content="mywindow.content"
                              :visible="mywindow.visible" :events="mywindow.events">
        </el-amap-info-window>
        <el-amap-marker v-for="marker in markers" :key="marker.id" :position="marker.position"
                        :events="marker.events" :visible="marker.visible" :draggable="marker.draggable">
        </el-amap-marker>
        <el-amap-circle :center="circle.center" :radius="circle.radius" :fillOpacity="circle.fillOpacity"
                        :event="circle.events" :strokeColor="circle.strokeColor"
                        :strokeStyle="circle.strokeStyle" :fillColor="circle.fillColor">
        </el-amap-circle>
      </el-amap>
      <div class="map-operate">
        <div class="toolbar">
          <span v-if="loaded">
            My Location: [ {{lng}}, {{lat}} ] - {{address}}
          </span>
        </div>
        <div class="btn-wrap">
          <el-button size="small" @click="drag">Drag</el-button>
          <el-button size="small" @click="change" type="primary">Change</el-button>
          <el-button size="small" @click="toggle" type="warning">Toggle</el-button>
          <el-button size="small" @click="add" type="success">Add Marker</el-button>
          <el-button size="small" @click="remove" type="danger">Remove Marker</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'
let amapManager = new VueAMap.AMapManager()
import BreadCrumb from '../breadcrumb'
export default {
  name: 'leeMap',
  data () {
    let that = this
    return {
      breadinfo: [{name: '扩展应用'}, {name: '我的地图', path: '/myadmin/map'}],
      amapManager,
      zoom: 15,
      center: [121.5273285, 31.21515044],
      markers: [],
      events: {
        init (map) {
          //
        },
        click (e) {
          let {lng, lat} = e.lnglat
          that.lng = lng
          that.lat = lat
          that.getLocationName(lng, lat)
        }
      },
      searchOption: {
        city: '上海',
        citylimit: false
      },
      circle: {
        clickable: true,
        center: [121.5273285, 31.21515044],
        radius: 200,
        fillOpacity: 0.3,
        strokeStyle: 'dashed',
        fillColor: '#FFFF00',
        strokeColor: '#00BFFF'
      },
      mywindow: {
        position: [121.5273285, 31.21515044],
        content: '<div class="prompt"><h4>该点数据信息</h4><p class="text item">Information A: ...</p><p class="text item">Information B: ...</p></div>',
        visible: false,
        events: {
          close: () => {
            this.mywindow.visible = false
          }
        }
      },
      loaded: true,
      lng: 0,
      lat: 0,
      address: '',
      // 比例尺插件、工具条；一个数组，可以单个字符串，也可以是一个对象
      plugins: [
        'ToolBar',
        'Scale',
        {
          pName: 'Geolocation',
          events: {
            init (o) {
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  that.lng = result.position.lng
                  that.lat = result.position.lat
                  that.center = [that.lng, that.lat]
                  that.loaded = true
                  that.getLocationName(that.lng, that.lat)
                }
              })
            }
          }
        },
        {
          pName: 'MapType',
          events: {
            init (instance) {
              console.log(instance)
            }
          }
        }]
    }
  },
  mounted () {
    this.markers = [
      // 这样地图上就添加了两个人
      {
        position: [121.5273285, 31.21515044],
        events: {
          click: (data) => {
            this.mywindow.position = [data.lnglat['M'], data.lnglat['O']]
            this.mywindow.visible = !this.mywindow.visible
          },
          dragend: (e) => {
            let {lng, lat} = e.lnglat
            this.markers[0].position = [lng, lat]
            this.getLocationName(lng, lat)
          }
        },
        visible: true,
        draggable: true
      },
      {
        position: [121.5973596, 31.21515155],
        events: {
          click: (data) => {
            this.mywindow.position = [data.lnglat['M'], data.lnglat['O']]
            this.mywindow.visible = !this.mywindow.visible
          }
        },
        visible: true,
        draggable: true
      }
    ]
    let step = 0.0001
    setInterval(() => {
      this.markers.forEach(marker => {
        marker.position = [marker.position[0] + step, marker.position[1] + step]
      })
    }, 1000)
  },
  methods: {
    change () {
      let position = this.markers[0].position
      this.markers[0].position = [position[0] + 0.002, position[1] - 0.002]
    },
    toggle () {
      let index = Math.floor(Math.random() * this.markers.length)
      this.markers[index].visible = !this.markers[index].visible
    },
    drag () {
      let draggable = this.markers[0].draggable
      this.markers[0].draggable = !draggable
    },
    add () {
      let marker = {
        position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02]
      }
      this.markers.push(marker)
    },
    remove () {
      if (!this.markers.length) {
        return
      }
      this.markers.pop()
    },
    onSearchResult (pois) {
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          let {lng, lat} = poi
          lngSum += lng
          latSum += lat
          this.markers.push({position: [poi.lng, poi.lat]})
        })
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.center = [center.lng, center.lat]
      }
    },
    getLocationName (lng, lat) {
      // 这里通过高德 SDK 完成。
      let that = this
      let geocoder = new window.AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      })
      geocoder.getAddress([lng, lat], (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.regeocode) {
            that.address = result.regeocode.formattedAddress
            that.$nextTick()
          }
        }
      })
    }
  },
  components: {
    BreadCrumb
  }
}
</script>

<style lang="less" scoped>
#my-map {
  height: 100%;
  display: flex;
  flex-direction: column;
  .amap-page, .myamap {
    height: 100%;
  }
  .amap-page {
    position: relative;
    padding-bottom: 50px;
  }
  .map-operate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 20px;
  }
  .search-box {
    position: absolute;
    top: 15px;
    left: 70px;
  }
  .toolbar {
    color: #f90;
    font-weight: 600;
    max-width: 60%;
  }
  // 下面两个对地图样式的设置不起作用
  .amap-geolocation-con {
    margin-bottom: 30px;
  }
  .prompt {
    background: #eee;
  }
}
</style>

