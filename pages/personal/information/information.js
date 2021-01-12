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
    identityData: [{
      value: 1,
      name: '普通用户'
    }, {
      value: 2,
      name: '会员'
    }, {
      value: 3,
      name: '健康专员'
    }, ],
    identityType: '',
    identity: ''
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
          identity: self.data.identityData[res.type - 1].name
        })
      }
    })
  },

  register(e) {
    var self = this;
    console.log(e);
    var token = wx.getStorageSync('token');
    var name = e.detail.value.name;
    var age = e.detail.value.age;
    var phone = e.detail.value.phone;
    var profession = e.detail.value.profession;
    var sex = e.detail.value.sex;
    var stature = e.detail.value.stature;
    var weight = e.detail.value.weight;
    var type = self.data.identityType
    if (name && phone) {
      infomation.register(token, name, phone, type, weight, stature, profession, sex, age).then(res => {
        console.log(res);
        self.setData({
          userInfo: res
        })
        wx.showLoading({
          title: '提交中',
          icon: "loading",
          success: () => {
            wx.hideLoading();
            wx.showToast({
              icon: "none",
              title: '提交成功,请等待审核',
              success() {
                
              }
            });
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

  IDChange(e) {
    var self = this;
    console.log(e);
    self.setData({
      identityType: e.detail.value + 1,
      identity: self.data.identityData[e.detail.value].name
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})