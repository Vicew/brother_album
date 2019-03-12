import regeneratorRuntime from '../libs/regenerator-runtime.js'
import baseUrl from '../static/js/serverConfig.js'

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}
class Axios {
  _baseUrl = baseUrl

  noIconTip(_tipText) {
    wx.showToast({
      title: _tipText,
      icon: 'none'
    })
  }

  getToken() {
    let token = wx.getStorageSync('token') || ''
    return token
  }

  // 复制微信号
  copyWechat () {
    wx.setClipboardData({
      data: 'sanlinck',
      success: () => {
        wx.showToast({
          title: '已复制微信号'
        })
      } 
    })
  }

  // 拦截器
  myIntercept(res, resolve, reject) {
    console.log('拦截器处理前结果：', res)
    if (res.statusCode === 200) {
      if (res.data.code === 1005) {
        wx.showModal({
          title: '访问提示',
          content: '手速太快了!请稍后重试\r\n如有问题，请您主动加客服微信\r\n(sanlinck) 获得帮助',
          confirmText: '好的',
          success: (res) => {
            if (res.confirm) {
              this.copyWechat()
            }
          }
        })
        resolve(false)
      }
      if (res.data.code === 1007) {
        // 参数 force: true 强制执行授权
        auth.checkAuthStatus(true)
        resolve(false)
      }
      resolve(res.data)
    } else {
      // 请求状态码非 200
      this.noIconTip('状态码: ' + res.statusCode + '\n信息: ' + res.data.message)
      reject(res)
    }
  }

  request({ url, method, data }) {
    return new Promise((resolve, reject) => {
      let newUrl = this._baseUrl + url
      if (this.getToken()) {
        newUrl = newUrl + '?token=' + this.getToken()
      }
      console.log('执行axios请求 url: ', newUrl)
      console.log('执行axios请求 data: ', data)
      wx.request({
        url: newUrl,
        method: method || METHOD.GET,
        data: data,
        success: res => this.myIntercept(res, resolve, reject),
        fail: reject
      })
    })
  }

  get(url, data) {
    return this.request({ url, method: METHOD.GET, data })
  }
  post(url, data) {
    return this.request({ url, method: METHOD.POST, data })
  }
  put(url, data) {
    return this.request({ url, method: METHOD.PUT, data })
  }
  delete(url, data) {
    return this.request({ url, method: METHOD.DELETE, data })
  }

  getBaseUrl() {
    return this._baseUrl
  }
}
export default new Axios()
