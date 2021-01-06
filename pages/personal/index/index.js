let app = getApp();


Page({

    data: {
        isAuthorization: false,
        userInfo: null,
        qrCode: '/icon/qrcode.jpg',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    onShow: function () {
        // 微信授权
        this.setData({
            isAuthorization: true
        })
    },
    getUserInfo(e) {
        let self = this;
        wx.login({
            success(res) {
                var code = res.code;
                if (code) {
                    wx.getUserInfo({
                        success: (res) => {
                            app.globalData.userInfo = res.userInfo;
                            wx.showToast({
                              title: '授权成功',
                              icon: 'success',
                              success: (res) => {
                                  self.setData({
                                      isAuthorization: false
                                  });
                                  wx.showLoading({
                                    title: '获取数据中',
                                    success: (res) => {
                                        wx.hideLoading();
                                        self.setData({
                                            userInfo: app.globalData.userInfo
                                        });
                                        console.log(self.data.userInfo)
                                    }
                                  })
                              }
                            })
                        }
                    })
                }
            }
        });
    },

    // 取消授权
    cancel() {
        this.setData({
            isAuthorization: false
        })
    },

    // 二维码放大
    preview() {
        let self = this;
        wx.previewImage({
            current: self.data.qrCode, // 当前显示图片的http链接
            urls: [self.data.qrCode] // 需要预览的图片http链接列表
        })
    }
})