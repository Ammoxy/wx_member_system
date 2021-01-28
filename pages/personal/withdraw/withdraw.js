// pages/personal/withdraw/withdraw.js
var attacheAPI = require('../../../model/personal/attache')
var infomation = require('../../../model/personal/infomation')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: '',
    totalMoney: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo()
  },

  getInfo() {
    var self = this;
    infomation.userInfo(wx.getStorageSync('token')).then(res => {
      console.log(res);
      if (res.health_user) {
        self.setData({
          totalMoney: res.health_user.money
        })
      }
    })
  },
  // withdrawAll(e) {
  //   var self = this;
  //   self.setData({
  //     money: e.currentTarget.dataset.money
  //   })
  // },

  withdraw(e) {
    console.log(e);
    var self = this;
    self.setData({
      money: e.detail.value.momey
    })
    if (self.data.money >= 1) {
      wx.showModal({
        title: '提示',
        content: '是否申请提现' + self.data.money + '元',
        confirm: '确定',
        cancel: '取消',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            attacheAPI.withdraw(wx.getStorageSync('token'), self.data.money).then(res => {
              wx.showToast({
                title: '申请成功, 请等待审核',
                icon: 'none',
              })
              // self.getInfo()
              wx.navigateBack({
                delta: 1
              })
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showToast({
        title: '提现金额最少一元',
        icon: 'none'
      })
    }


  },

})