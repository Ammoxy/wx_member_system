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
    userType: ''
  },

  onLoad() {
    this.getClassify(0);
    console.log(app.globalData.userType);
  },

  getClassify(val) {
    var self = this;
    classify.classifyList().then(response => {
      wx.showLoading({
        title: '获取数据中...',
        mask: true,
        success: (res) => {
          self.setData({
            classifyData: response,
            classifyRight: response[val].subs
          })
          console.log(self.data.classifyRight);
          wx.hideLoading({
            success: (res) => {},
          })
        },
        fail: (res) => {},
        complete: (res) => {},
      })
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
    console.log(e);
    
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