// pages/home/home.js
var bannerAPI = require('../../model/home/banner')
var docAPI = require('../../model/home/document')
var app = getApp()
// import qs from "qs"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFoot: false,
    bannerList: [],
    information: [],
    address: '',
    qrCode: '/icon/qrcode.jpg',
    classFication: []
  },

  onLoad: function (options) {
    this.getBanner()
    this.getDocType()
    this.getDoc()
  },

  getBanner() {
    var self = this;
    wx.showLoading({
      title: '数据加载中...',
    })
    bannerAPI.banners().then(res => {
      self.setData({
        bannerList: res
      })
      wx.hideLoading()
    })
  },

  getDocType() {
    var self = this;
    docAPI.docType().then(res => {
      self.setData({
        classFication: res
      })
    })
  },

  getDoc() {
    var self = this;
    var arr = []
    docAPI.docList(0).then(res => {
      console.log(res);
      res.data.forEach(item => {
        if (item.is_show == 1) {
          arr.push(item)
        }
      })
      self.setData({
        information: arr
      })
    })
  },

  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '15976506555'
    })
  },

  // 显示二维码
  showCode: function () {
    let self = this;
    wx.previewImage({
      current: self.data.qrCode, // 当前显示图片的http链接
      urls: [self.data.qrCode] // 需要预览的图片http链接列表
    })
  },

  map(e) {
    var self = this;
    console.log("开启地图")
    wx.getLocation({ //获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
      success: function (res) {
        console.log(res);
        wx.chooseLocation({
          success(res) {
            wx.openLocation({ //​使用微信内置地图查看位置。
              latitude: res.latitude, //要去的纬度-地址
              longitude: res.longitude, //要去的经度-地址
              name: res.name,
              address: res.address
            })
          },
        })
        // wx.openLocation({ //​使用微信内置地图查看位置。
        //   latitude: 22.93772, //要去的纬度-地址
        //   longitude: 113.38424, //要去的经度-地址
        //   name: "奥园广场",
        //   address: '奥园广场'
        // })
      }
    })
    console.log("地图")
  },

  openClassification(e) {
    console.log(e);
    
    wx.navigateTo({
      url: './msg-list/msg-list?id=' + e.currentTarget.dataset.id + '&index=' + e.currentTarget.dataset.index,
    })
  },

  openDetals(e) {
    if (e.currentTarget.dataset.id) {
      wx.navigateTo({
        url: './msg-detail/msg-detail?id=' + e.currentTarget.dataset.id,
      })
    } else {
      wx.showToast({
        title: '该轮播图未设置跳转',
        icon: 'none'
      })
    }
  }

})