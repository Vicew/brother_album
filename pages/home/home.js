import login from '../../utils/login.js'
import regeneratorRuntime from '../../libs/regenerator-runtime.js'
import interaction from '../../utils/interaction.js';
import axios from '../../utils/axios.js'

Page({

  data: {
    Whole_Picture:[1,2],
    PictureName:"啦啦啦啦啦",
    Author:"小俊",
    pictureList: []
  },

  onLoad() {
    this.goPage()
  },

  showBigImg(option) {
    const urls = this.data.pictureList.map(item => item.url)
    console.log(option)
    wx.previewImage({
      current: urls[option.target.dataset.index], // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  async goPage() {
    await login()
    const res = await axios.get('/picture')
    console.log(res)
    if (res.result.pictureList.length % 2 === 1) {
      res.result.pictureList.push({})
    }
    this.setData({
      pictureList: res.result.pictureList,
    })
  },
  addImg(){
    wx.navigateTo({
      url: '../../pages/submitImg/submitImg'
    })
  },
})