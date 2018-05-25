/**
 * <nsts>图像读取相关函数
 */
let reader = new FileReader()
let xhr = new XMLHttpRequest()

xhr.open('get', url, true)
xhr.responseType = 'blob'
xhr.onload = () => {
  if (this.status === 200) {
    // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
    reader.readAsDataURL(this.response)
    // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个字符串以表示所读取的文件内容。
    reader.readerAsText()
    // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含所读取文件的原始二进制数据。
    reader.readAsBinaryString()
  }
}
xhr.send()

reader.onabort = function(evnet) {
  // 该事件在读取操作被中断时触发。
  console.log('阻止触发')
}
reader.onerror = e => {
  console.log('哎呦，文件读取发生错误')
}
reader.onload = e => {
  console.log('文件下载完成')
}
reader.onloadend = e => {
  console.log('最后的最后一定执行')
}
reader.onloadstart = e => {
  console.log('文件读取开始')
}
reader.onprogress = e => {
  // 该事件在读取Blob时触发。
  console.log('可以实时控制显示进度')
}

function readDataUrl(url) {
  return new Promise((resolve, reject) => {

      let reader = new FileReader()
      let xhr = new XMLHttpRequest()

      xhr.open('get', url, true)
      // xhr.open('get', 'images/ct_img/E_IED_0008_1/E_IED_0008_1_1.0_CT.png', true)
      xhr.responseType = 'blob'
      xhr.onload = function() {
        if (this.status === 200) {
          reader.readAsDataURL(this.response)
        }
      }
      xhr.send()

      reader.onerror = e => {
        console.log('哎呦，文件读取发生错误')
        reject(e)
      }
      reader.onload = e => {
        console.log('文件下载完成')
        resolve(e.target.result)
      }
  })
}
function readDataTxt(url) {
  return new Promise((resolve, reject) => {

      let reader = new FileReader()
      let xhr = new XMLHttpRequest()

      xhr.open('get', url, true)
      // xhr.open('get', 'images/ct_img/E_IED_0008_1/E_IED_0008_1_1.0_CT.png', true)
      xhr.responseType = 'blob'
      xhr.onload = function() {
        if (this.status === 200) {
          reader.readAsText(this.response)
        }
      }
      xhr.send()

      reader.onerror = e => {
        console.log('哎呦，文件读取发生错误')
        reject(e)
      }
      reader.onload = e => {
        console.log('文件下载完成')
        resolve(e.target.result)
      }
  })
}

Promise.all([readDataUrl('../../images/ct_img/E_IED_0008_1/E_IED_0008_1_1.0_CT.png'),
  readDataTxt('../../images/ct_img/E_IED_0008_1/E_IED_0008_1_1.0_CT.png.txt'),
  readDataTxt('../../images/ct_img/E_IED_0008_2/suspect_cubes_information_E_IED_0008_2_1.0_CT.png.txt')])
  .then(data => {
      console.log(data)
  })

readDataUrl('../../images/ct_img/E_IED_0008_1/E_IED_0008_1_1.0_CT.png.txt')
  .then(data => {
      console.log(data)
  })
