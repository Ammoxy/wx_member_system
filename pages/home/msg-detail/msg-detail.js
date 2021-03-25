// pages/home/socialInformation/details/details.js
var WxParse = require('../../../wxParse/wxParse.js');
var doc = require('../../../model/home/document')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: null,
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getDetails();
  },

  // 获取资讯详情
  getDetails() {
    var self = this;
    wx.showLoading({
      title: '数据加载中...',
    })
    doc.docDetail(self.data.id).then(res => {
      console.log('created_at', res.created_at);

      WxParse.wxParse('article', 'html', res.content, self, 2);
      self.setData({
        details: res
      })
      wx.hideLoading()
    })
  },

})