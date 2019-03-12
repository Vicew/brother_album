import _baseUrl from '../static/js/serverConfig.js'
import regeneratorRuntime from '../libs/regenerator-runtime.js'
import interaction from './interaction.js'

// 获取微信的code--临时凭证
const getWxCode = () => {
  return new Promise(resolve => {
    wx.login({
      success: function (loginData) {
        console.log('code 临时凭证：', loginData.code)
        resolve(loginData.code)
      },
      fail: function (res) {
        // wx.hideLoading()
        resolve('')
        // reject()
      }
    })
  })
}

const systemLogin = async (resolve, reject) => {
  const code = await getWxCode()
  if (!code) {
    interaction.showToast('获取code失败')
    return
  }
  
  wx.request({
    url: _baseUrl + '/user/login',
    method: 'POST',
    data: {
      code: code,
    },
    success: function (rspData) {
      // 保存 token 和 auth 的信息
      console.log('--------------------------------------------------')
      const { id, token, authed } = rspData.data.result
      console.log(rspData.data.result)
      wx.setStorageSync('token', token)
      wx.setStorageSync('authed', authed)
      wx.setStorageSync('id', id)
      console.log('--------------------------------------------------')
      resolve()
    },
    fail: function (error) {
      reject(error)
    }
  })

}

function login() {
  return new Promise(function (resolve, reject) {
    // 校验当前的sessionKey是否有效
    wx.checkSession({
      // sessionKey有效, 从本地获取对应的token
      success: function (res) {
        console.log('检查Session是否失效，checkSession: ', res)
        const token = wx.getStorageSync('token') || ''
        // 如果找不到token，则还是登录
        console.log('从缓存中获取token: ', token)
        if (token === '') {
          systemLogin(resolve, reject)
        } else {
          resolve()
          console.log('--------------------------------------------------')
        }
      },
      fail: function (res) {
        // 如果失效则登录
        console.log('检查Session是否失效，checkSession: ', res)
        systemLogin(resolve, reject)
      },
      complete: function (res) { }
    })
  })
}

export default login
