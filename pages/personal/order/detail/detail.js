// pages/personal/order/detail/detail.js
var orderAPI = require('../../../../model/car/order')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null,
    orderData: [],
    logisticsData: null,
    express_no: '',
    logistics_id: '',
    isCommon: '',
    userGood: null
  },

  onLoad: function (options) {
    console.log(JSON.parse(options.detail));
    console.log(options.isCommon);
    
    this.setData({
      isCommon: options.isCommon,
      detail: JSON.parse(options.detail),
      orderData: JSON.parse(options.detail).good,
      express_no: JSON.parse(options.detail).express_no,
      logistics_id: JSON.parse(options.detail).logistics_id,
      userGood: JSON.parse(options.detail)
    })
    if (this.data.express_no && this.data.logistics_id) {
      this.getLogistics()
    }
  },

  getLogistics() {
    var self = this;
    wx.showLoading({
      title: '数据加载中...',
    })
    orderAPI.orderInquire(wx.getStorageSync('token'), self.data.express_no, self.data.logistics_id).then(res => {
      console.log(res);
      self.setData({
        logisticsData: res
      })
      console.log(self.data.logisticsData.State);
      wx.hideLoading()
    })

  },


})