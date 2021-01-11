// pages/personal/address/add/add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    map(e) {
        var self = this;
        console.log("开启地图")
        wx.chooseLocation({
          success(res) {
            console.log(res)
            self.setData({
              address: res.address
            })
          },
          fail: function (err) {
            console.log(123, err)
            wx.getSetting({
              success: (res) => {
                console.log(456, res)
                if (res.authSetting['scope.userLocation'] == false) {

                }
              }
            })
          },
        })
        console.log("地图")
      },
})