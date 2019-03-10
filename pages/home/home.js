import login from '../../utils/login.js'
import regeneratorRuntime from '../../libs/regenerator-runtime.js'
// import interaction from '../../utils/interaction.js';

Page({
  data: {},

  onLoad() {
    this.goPage()
  },

  async goPage() {
    await login()
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
  }
})