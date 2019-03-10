export default {
  // 消息提示框
  showToast: function (title, icon) {
    wx.showToast({
      title: title,
      icon: icon || 'none'
    })
  },
  // 显示loading提示框
  showLoading: function (title) {
    wx.showLoading({
      title: title
    })
  },
  // 隐藏loading提示框
  hideLoading: function () {
    wx.hideLoading()
  },
  // 显示模态弹窗
  showModal: function (title, content, confirmText, showCancel = true) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: content,
        showCancel: showCancel,
        confirmText: confirmText || '确定',
        success: function (res) {
          resolve(res.confirm)
        }
      })
    })
  },
  //
  showActionSheet: function (itemList) {
    return new Promise((resolve, reject) => {
      wx.showActionSheet({
        itemList: itemList,
        success: function (res) {
          resolve(res.tapIndex)
        },
        fail: function () {
          resolve(false)
        }
      })
    })
  }
}
