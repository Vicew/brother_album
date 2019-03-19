Page({
    data: {
        locateCount: 0,
        particularCount: 0,
        maxLocateCount: 6,
        maxParticularCount: 40,
        images: [],
    },
    chooseImg() {
        var that = this
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
                            console.log(that.data)
                            const images = that.data.images.concat(res.tempFilePaths)
                            // 限制最多只能留下3张照片
                            that.data.images = images.length <= 3 ? images : images.slice(0, 3)
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
    handleTitleInput(e) {
        // 获取输入框的内容
        var value = e.detail.value;
        // 获取输入框内容的长度
        var len = parseInt(value.length);
        console.log(this.data.maxLocateCount)
        if (len <= this.data.maxLocateCount) {
            this.setData({
                locateCount: len //当前字数  
            });
        } else return;
    },
    handleContentInput(e) {
        // 获取输入框的内容
        var value = e.detail.value;
        // 获取输入框内容的长度
        var len = parseInt(value.length);
        console.log(this.data.maxParticularCount)
        if (len <= this.data.maxParticularCount) {
            this.setData({
                particularCount: len //当前字数  
            });
        } else return;
    },
})