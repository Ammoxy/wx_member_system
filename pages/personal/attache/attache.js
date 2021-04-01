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
    disabled: false,
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    estateList: [{
      title: '市级事业部',
      value: 1
    }, {
      title: '区县事业部',
      value: 2
    }, {
      title: '社区事业部',
      value: 3
    }],
    is_estate: '', // 等级下标
    is_merchant: '', // 部门下标
    estate: '',
    merchant_sel: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1, JSON.parse(options.health_user));

    this.setData({
      user_id: options.user_id,
    })
    this.getHelUser();
    // this.getMerchant();
    if (this.data.user_id) {
      this.getDetail();
    }
  },

  getDetail() {
    var self = this;
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

  estateChange(e) {
    var self = this;
    console.log(e);
    self.setData({
      is_estate: e.detail.value,
      estate: self.data.estateList[e.detail.value].title,
      merchant_sel: '',
      merchant_id: ''
    })
    self.getMerchant(self.data.estateList[e.detail.value].value)
  },

  // 部门
  getMerchant(val) {
    var self = this;
    attache.merchantSelList(wx.getStorageSync('token'), val).then(res => {
      console.log(res);
      self.setData({
        merchantList: res
      })
    })
  },

  merchantChange(e) {
    var self = this;
    self.setData({
      merchant_sel: self.data.merchantList[e.detail.value].name,
      merchant_id: self.data.merchantList[e.detail.value].id,
      isSave: true
    })
  },

  registerAttache(e) {
    var self = this;
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
    // console.log(self.data.userInfo);

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
            icon: 'none',
            success: () => {
              self.setData({
                isSave: false
              })
              wx.navigateBack({
                delta: 1,
              })
            }
          })

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

  // 显示遮罩层
  showModal: function () {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn(); //调用显示动画
    }, 200)
  },
  // 隐藏遮罩层
  hideModal: function (e) {
    console.log(e);
    
    var that = this;
    var animation = wx.createAnimation({
      duration: 800, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown(); //调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideModal: true,
      })
      if (e.currentTarget.dataset.index == 2) {
        that.setData({
          merchant: that.data.merchant_sel
        })
      }
    }, 720) //先执行下滑动画，再隐藏模块

  },
  // 动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
})