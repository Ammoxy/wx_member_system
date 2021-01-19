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
    // identityData: [{
    //   value: 1,
    //   name: '普通用户'
    // }, {
    //   value: 2,
    //   name: '会员'
    // }, {
    //   value: 3,
    //   name: '健康专员'
    // }, ],
    // identityType: '',
    // identity: '',
    // isRegister: false
    health_user: null,
    id: '',
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
    console.log(this.data.userInfo);

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
          // identity: self.data.identity Data[res.type - 1].name
        })
      }
    })
  },

  register(e) {
    var self = this;
    console.log(e);
    var type = self.data.userInfo.type;
    if (self.data.health_user) {
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
          type: self.data.type
        }
      })
    } else {
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
          type: 1
        }
      })
    }
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

  // IDChange(e) {
  //   var self = this;
  //   console.log(e);
  //   self.setData({
  //     identityType: e.detail.value + 1,
  //     // identity: self.data.identityData[e.detail.value].name
  //   })
  // },

})