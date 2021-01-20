// pages/personal/attache/attache.js
var attache = require('../../../model/personal/attache')
var reg = require('../../../utils/reg')

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
    state: '',
    user_id: '',
    // health_user: null,
    id: '',
    isSave: false, // 提交按钮
    detailData: null,
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_id: options.user_id,
      // health_user: JSON.parse(options.health_user).health_user
    })
    this.getHelUser();
    this.getMerchant();
    // console.log(JSON.parse(options.health_user));
    this.getDetail();



    // if (JSON.parse(options.health_user).health_user) {
    // }
  },

  getDetail() {
    var self = this;
    // var user_id = wx.getStorageSync('health_user').user_id
    wx.showLoading({
      title: '获取数据中..',
      icon: 'none',
      success: () => {
        attache.healthApplyDetail(wx.getStorageSync('token'), self.data.user_id).then(res => {
          console.log(res);
          self.setData({
            state: res.state,
            userInfo: {
              address: res.address,
              identity: res.identity,
              name: res.name,
              phone: res.phone,
            },
            health_id: res.health_id,
            merchant_id: res.merchant_id,
            healthUser: res.health_name,
            merchant: res.merchant_name,
            id: res.id,
            detailData: res
          })
          if (self.data.state == 1) {
            this.setData({
              disabled: true
            })
          }
          wx.hideLoading();

        }).catch(err => {
          console.log(err);
        })
      }
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
      health_id: self.data.helUserList[e.detail.value].id,
      isSave: true
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
      merchant_id: self.data.merchantList[e.detail.value].id,
      isSave: true
    })
  },

  registerAttache(e) {
    console.log(e);
    var self = this;
    // if (self.data.health_user) {
    //   self.setData({
    //     userInfo: {
    //       token: wx.getStorageSync('token'),
    //       address: e.detail.value.address,
    //       health_id: self.data.health_id,
    //       identity: e.detail.value.identity,
    //       merchant_id: self.data.merchant_id,
    //       name: e.detail.value.name,
    //       phone: e.detail.value.phone,
    //       id: self.data.id
    //     }
    //   })
    // } else {
    var identity = e.detail.value.identity
    if (!reg.IDCard(identity)) {
      wx.showToast({
        icon: "none",
        title: '请输入有效的身份证号码'
      })
    }
    self.setData({
      userInfo: {
        token: wx.getStorageSync('token'),
        address: e.detail.value.address,
        health_id: self.data.health_id,
        identity: identity,
        merchant_id: self.data.merchant_id,
        name: e.detail.value.name,
        phone: e.detail.value.phone,
      }
    })
    // }

    if ((self.data.userInfo.address == self.data.detailData.address) && (self.data.userInfo.health_id == self.data.detailData.health_id) && (self.data.userInfo.identity == self.data.detailData.identity) && (self.data.userInfo.merchant_id == self.data.detailData.merchant_id) && (self.data.userInfo.name == self.data.detailData.name) && (self.data.userInfo.phone == self.data.detailData.phone)) {
      wx.showToast({
        title: '信息相同, 无法重复提交',
        icon: 'none'
      })
    } else {
      if (self.data.userInfo.name && self.data.userInfo.address && self.data.userInfo.health_id && self.data.userInfo.identity && self.data.userInfo.merchant_id && self.data.userInfo.phone) {
        attache.register(self.data.userInfo).then(res => {
          wx.showToast({
            title: '提交成功, 请等待审核',
            icon: 'none'
          })
          self.setData({
            isSave: false
          })
          // if (self.data.health_user) {
          self.getDetail()
          // }
        })
      } else {
        wx.showToast({
          title: '请填写完整信息',
          icon: 'none'
        })
      }
    }
  },

  nameBlur(e) {
    this.setData({
      // isSave: true,
      name: e.detail.value
    })
  },
  phoneBlur(e) {
    this.setData({
      isSave: true,
      name: e.detail.value
    })
  },
  identityBlur(e) {
    this.setData({
      isSave: true,
      // name: e.detail.value
    })
    if (!reg.IDCard(e.detail.value)) {
      wx.showToast({
        icon: "none",
        title: '请输入有效的身份证号码',
      })
    }
  },
  addressBlur(e) {
    this.setData({
      isSave: true,
      name: e.detail.value
    })
  },
})