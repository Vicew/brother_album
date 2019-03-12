import login from '../../utils/login.js'
import regeneratorRuntime from '../../libs/regenerator-runtime.js'
import interaction from '../../utils/interaction.js';
import axios from '../../utils/axios.js'

Page({
  data: {
    authed: true, // 是否授权过
  },

  onLoad() {
    this.goPage()
  },

  async goPage() {
    await login()
    const authed = wx.getStorageSync('authed')
    this.setData({
      authed,
    })
  },

  TakePhoto() {
    wx.showActionSheet({
      itemList: ['拍照', '从相册里选择'],
      success: function (res) {
        //console.log(res.tapIndex);
        if (res.tapIndex == 1) {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
            }
          })
        }
        if (res.tapIndex == 0) {
          wx.chooseImage({
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
            }
          })
        }
      }
    })
  },

  async onGotUserInfo(e) {
    console.log('授权按钮获得的数据：', e)

    // 未获取用户信息的处理
    let userInfo = e.detail.userInfo
    if (!userInfo) {
      interaction.showToast('授权失败')
      return
    }

    interaction.showLoading('')
    
    const params = {
      ...userInfo,
      device: wx.getSystemInfoSync().model,
      iv: e.detail.iv, // iv 用户解密获取unionId，暂时用不到
      encryptData: e.detail.encryptedData // encryptData 用户解密获取unionId，暂时用不到
    }
    console.log('params: ', params)

    let res = await axios.post('/user/update', params)
    interaction.hideLoading()
    if (res.code !== 1001) {
      interaction.showToast('授权失败')
      return
    }
    this.authed = true
    wx.setStorageSync('authed', true)
  }
})