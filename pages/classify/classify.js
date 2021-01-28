var classify = require('../../model/classify/classify');
var app = getApp()
Page({
  data: {
    classifyData: [],
    num: 0,
    leftId: '',
    rightId: '',
    heightArr: [],
    classifyRight: [],
    keyword: '',
    user_type: ''
  },

  onLoad() {
    this.getClassify(0);
    console.log(app.globalData.user_type);
    this.setData({
      user_type: app.globalData.user_type
    })
    console.log('user_type', this.data.user_type);
  },

  getClassify(val) {
    var self = this;
    wx.showLoading({
      title: '数据加载中...',
    })
    classify.classifyList().then(response => {
      self.setData({
        classifyData: response,
        classifyRight: response[val].subs
      })
      wx.hideLoading()
    })
  },
  nav(e) {
    console.log(e);
    var self = this;;
    self.setData({
      num: e.currentTarget.dataset.index,
    })
    self.getClassify(self.data.num)
  },

  toGoodsList(e) {
    wx.navigateTo({
      url: '../goods/goods-list/goods-list?id=' + e.currentTarget.dataset.id,
    })
  },

  search(e) {
    console.log(e.detail.value);
    var self = this;
    self.setData({
      keyword: e.detail.value
    })
  },

})