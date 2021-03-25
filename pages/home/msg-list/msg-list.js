// pages/home/msg-list/msg-list.js
var docAPI = require('../../../model/home/document')

Page({
  data: {
    classFication: [],
    num: 0,
    listData: [],
    id: '',
    information: []
  },

  onLoad: function (options) {
    this.setData({
      num: options.index,
      id: options.id
    })
    this.getDocType();
    this.getDoc(this.data.id)
  },

  // 资讯类型
  getDocType() {
    var self = this;
    docAPI.docType().then(res => {
      self.setData({
        classFication: res
      })
    })
  },

  getDoc(val) {
    var self = this;
    wx.showLoading({
      title: '数据加载中...',
    })
    docAPI.docList(val).then(res => {
      // console.log(res);
      self.setData({
        information: res.data
      })
      wx.hideLoading()
    })
  },

  nav(e) {
    console.log(e);
    var self = this;
    self.setData({
      num: e.currentTarget.dataset.index
    })
    this.getDoc(e.currentTarget.dataset.id)
  },

  toDetail(e) {
    console.log(e);
    wx.navigateTo({
      url: '../msg-detail/msg-detail?id=' + e.currentTarget.dataset.id,
    })
  },
})