var bannerAPI = require('../../model/home/banner')
var docAPI = require('../../model/home/document')
Page({
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

  // 获取轮播图
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

  // 获取资讯类型
  getDocType() {
    var self = this;
    docAPI.docType().then(res => {
      self.setData({
        classFication: res
      })
    })
  },

  // 获取资讯
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

  // 前往资讯列表
  openClassification(e) {
    console.log(e);
    wx.navigateTo({
      url: './msg-list/msg-list?id=' + e.currentTarget.dataset.id + '&index=' + e.currentTarget.dataset.index,
    })
  },

  // 前往资讯详情
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
  },

  // 打电话
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

  // 导航
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
      }
    })
    console.log("地图")
  },

})