// pages/personal/source/source.js
var attacheAPI = require('../../../model/personal/attache')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourceData: [],
    page: 1,
    limit: 20,
    isPage: false,
    showFoot: false,
    hasMore: true,
  },

  onLoad: function (options) {
    this.getList()
  },
  // 列表数据
  getList(isPage) {
    var self = this;
    wx.showLoading({
      title: '加载中...',
    })
    attacheAPI.commissionSource(wx.getStorageSync('token'), self.data.page, self.data.limit).then(res => {
      console.log('data', res);
      if (isPage) {
        // 下一页的数据拼接在原有数据后面
        self.setData({
          sourceData: self.data.sourceData.concat(res.data)
        })
      } else {
        // 第一页数据直接赋值
        self.setData({
          sourceData: res.data
        })
      }
      // 如果返回的数据为空，那么就没有下一页了
      if (res.total <= (self.data.page * 10)) {
        self.setData({
          hasMore: false,
          showFoot: true
        })
      }
      wx.hideLoading()
    })
  },
  scrollToLower(e) {
    if (this.data.hasMore) {
      this.setData({
        page: this.data.page + 1
      })
      this.getList(true);
    }
  },

})