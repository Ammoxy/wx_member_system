// pages/home/home.js
var bannerAPI = require('../../model/home/banner')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFoot: false,
    bannerList: [],
    information: [{
      imgList: ['../../icon/8c1001e93901213f5347ebb256e736d12f2e956c.jpg', '../../icon/8c1001e93901213f5347ebb256e736d12f2e956c.jpg', '../../icon/8c1001e93901213f5347ebb256e736d12f2e956c.jpg'],
      detailsTitle: '精选测试',
    }, ]
  },

  onLoad: function (options) {
    this.getBanner()
  },
  onShow: function () {

  },

  getBanner() {
    var self = this;
    bannerAPI.banners().then(res => {
      self.setData({
        bannerList: res
      })
    })
  },

})