// pages/car/order-detail/order-detail.js
var address = require('../../../model/personal/address');
var attache = require('../../../model/personal/attache');
var orderAPI = require('../../../model/car/order');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: null,
    totalPrice: 0,
    totalCount: 0,
    // address: null,
    addressData: [],
    addressInfo: {
      address: '',
      id: '',
      phone: '',
      name: '',
    },
    fetch: false,
    merchantList: [],
    freight: 0,
    merchant: '',
    merchant_id: '',
    address_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.data));

    this.setData({
      orderData: JSON.parse(options.data),
      totalCount: JSON.parse(options.data)[0].count,
      totalPrice: JSON.parse(options.data)[0].count * JSON.parse(options.data)[0].price + JSON.parse(options.data)[0].freight,
      freight: JSON.parse(options.data)[0].freight,
      merchantList: JSON.parse(options.data)[0].have_merchant
    })
    this.getAddress();
    console.log(JSON.parse(options.data)[0].have_merchant);

  },

  onShow: function (options) {
    this.setData({
      addressInfo: {
        address: this.data.addressInfo.address,
        id: this.data.addressInfo.id,
        phone: this.data.addressInfo.phone,
        name: this.data.addressInfo.name,
      }
    })

  },

  addressChange(e) {
    console.log(e);
    var self = this;
    self.setData({
      merchant: self.data.merchantList[e.detail.value].address,
      is_merchant: e.detail.value,
      merchant_id: self.data.merchantList[e.detail.value].id,
    })
  },

  getAddress() {
    var self = this;
    wx.showLoading({
      title: '加载中...',
    })
    address.addList(wx.getStorageSync('token')).then(res => {
      console.log(res);
      res.forEach(item => {
        if (item.is_default == 1) {
          self.setData({
            addressInfo: {
              address: item.address,
              id: item.id,
              phone: item.phone,
              name: item.name,
            }
          })
        }
      })
      self.setData({
        addressData: res,
      })
      console.log(self.data.addressInfo);

      wx.hideLoading()
    })
  },

  toAdd() {
    wx.navigateTo({
      url: '../../personal/address/index/index?superiors=' + 'superiors',
    })
  },

  toSet() {
    this.setData({
      fetch: !this.data.fetch
    })
  },

  createOrder(param) {
    var self = this;
    orderAPI.userOrder(param).then(res => {
      console.log(333);
      wx.showToast({
        title: '创建订单成功',
        icon: 'none'
      })
    })
  },

  toAccount() {
    var self = this;
    var param = {};
    if (self.data.fetch) {
      param = {
        token: wx.getStorageSync('token'),
        good_id: self.data.orderData[0].id,
        freight: self.data.freight,
        money: self.data.orderData[0].price,
        count: self.data.orderData[0].count,
        merchant_id: self.data.merchant_id
      }
      if (param.merchant_id) {
        self.createOrder(param);
      } else {
        wx.showToast({
          title: '您已选择到店自取, 请选择商家地址',
          icon: 'none'
        })
      }
    } else {
      param = {
        token: wx.getStorageSync('token'),
        good_id: self.data.orderData[0].id,
        freight: self.data.freight,
        money: self.data.orderData[0].price,
        count: self.data.orderData[0].count,
        address_id: self.data.addressInfo.id
      }
      self.createOrder(param);
    }
  }
})