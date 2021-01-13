// pages/personal/attache/attache.js
var attache = require('../../../model/personal/attache')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    helUserList: [],
    merchantList: [],
    healthUser: '',
    merchant: '',
    health_id: '',
    merchant_id: '',
    state: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHelUser();
    this.getMerchant();
    if (wx.getStorageSync('health_user')) {
      var health_user = wx.getStorageSync('health_user').health_user;
      this.getDetail()
    }
  },

  getDetail() {
    var self = this;
    var user_id = wx.getStorageSync('health_user').user_id
    attache.healthDetail(wx.getStorageSync('token'), user_id).then(res => {
      console.log(res);
      wx.showLoading({
        title: '获取数据中..',
        icon: 'none',
        success: () => {
          self.setData({
            state: res.state,
            userInfo: {
              address: res.address,
              health_id: res.health_id,
              identity: res.identity,
              merchant_id: res.merchant_id,
              name: res.name,
              phone: res.phone,
            },
            healthUser: res.health_name,
            merchant: res.merchant_name
          })
          wx.hideLoading()
        }
      })
    })
  },

  // 等级
  getHelUser() {
    var self = this;
    attache.healthUser(wx.getStorageSync('token')).then(res => {
      console.log(res);
      self.setData({
        helUserList: res,
      })
    })
  },
  healthChange(e) {
    console.log(e);
    var self = this;

    self.setData({
      healthUser: self.data.helUserList[e.detail.value].name,
      health_id: self.data.helUserList[e.detail.value].id
    })
  },

  // 部门
  getMerchant() {
    var self = this;
    attache.merchantSelList(wx.getStorageSync('token')).then(res => {
      console.log(res);
      self.setData({
        merchantList: res
      })
    })
  },

  merchantChange(e) {
    var self = this;
    self.setData({
      merchant: self.data.merchantList[e.detail.value].name,
      merchant_id: self.data.merchantList[e.detail.value].id
    })
  },

  registerAttache(e) {
    console.log(e);
    var self = this;
    self.setData({
      userInfo: {
        token: wx.getStorageSync('token'),
        address: e.detail.value.address,
        health_id: self.data.health_id,
        identity: e.detail.value.identity,
        merchant_id: self.data.merchant_id,
        name: e.detail.value.name,
        phone: e.detail.value.phone,
      }
    })

    if (self.data.userInfo.name && self.data.userInfo.address && self.data.userInfo.health_id && self.data.userInfo.identity && self.data.userInfo.merchant_id && self.data.userInfo.phone) {
      attache.register(self.data.userInfo).then(res => {
        wx.showToast({
          title: '提交成功, 请等待审核',
          icon: 'none'
        })
      })
    } else {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
    }
  },
})