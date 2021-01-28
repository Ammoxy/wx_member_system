// pages/personal/information/information.js
var infomation = require('../../../model/personal/infomation')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      sex: 1
    },
    health_user: null,
    id: '',
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
  },

  getInfo() {
    var self = this;
    infomation.userInfo(wx.getStorageSync('token')).then(res => {
      console.log(res);
      if (res.user_id) {
        self.setData({
          userInfo: res,
          health_user: res.health_user,
          id: res.id,
          type: res.type
        })
      }
    })
  },

  register(e) {
    var self = this;

    var type = self.data.health_user ? self.data.type : 1;
    self.setData({
      userInfo: {
        token: wx.getStorageSync('token'),
        name: e.detail.value.name,
        age: e.detail.value.age,
        phone: e.detail.value.phone,
        profession: e.detail.value.profession,
        sex: e.detail.value.sex,
        stature: e.detail.value.stature,
        weight: e.detail.value.weight,
        id: self.data.id,
        type: type
      }
    })

    if (self.data.userInfo.name && self.data.userInfo.phone) {
      infomation.register(self.data.userInfo).then(res => {
        console.log(res);
        self.setData({
          userInfo: res
        })
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          success: () => {
            wx.navigateBack({
              delta: 1,
            })
          }
        })
      })
    } else {
      wx.showToast({
        title: '姓名与手机为必填项',
        icon: 'none'
      })
    }
  },
})