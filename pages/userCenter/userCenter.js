import login from '../../utils/login.js'
import regeneratorRuntime from '../../libs/regenerator-runtime.js'
import interaction from '../../utils/interaction.js';
import axios from '../../utils/axios.js'

Page({
  data: {
    authed: true, // 是否授权过
  },
  
  onLoad() {
    await login()
    const authed = wx.getStorageSync('authed')
    this.setData({
      authed,
    })
    this.goPage()
  },

  async goPage() {
    // const res = axios.get('user/info')
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
    this.setData({
      authed: true
    })
    interaction.showToast('授权成功')
  }
})