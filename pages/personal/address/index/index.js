// pages/personal/address/index/index.js
var address = require('../../../../model/personal/address');
var tools = require('../../../../utils/tools')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: [],
    isOrder: false, // 订单选择地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    if (options.superiors) {
      this.setData({
        isOrder: true
      })
    } else {
      this.setData({
        isOrder: false
      })
    }

    this.getList()
  },
  onShow: function () {
    this.getList()
  },
  toAdd() {
    wx.navigateTo({
      url: '../add/add',
    })
  },

  getList() {
    var self = this;
    wx.showLoading({
      title: '加载中...',
    })
    address.addList(wx.getStorageSync('token')).then(res => {
      console.log(res);
      self.setData({
        addressData: res
      })
      wx.hideLoading()
    })
  },

  toEdit(e) {
    console.log(e);
    var self = this;
    // var id = e.currentTarget.dataset.id
    var info = {
      address: e.currentTarget.dataset.address,
      cityid: e.currentTarget.dataset.cityid,
      districtid: e.currentTarget.dataset.districtid,
      id: e.currentTarget.dataset.id,
      isdefault: e.currentTarget.dataset.isdefault,
      name: e.currentTarget.dataset.name,
      phone: e.currentTarget.dataset.phone,
      provinceid: e.currentTarget.dataset.provinceid,
      city: e.currentTarget.dataset.city,
      province: e.currentTarget.dataset.province,
      district: e.currentTarget.dataset.district,
    }
    wx.navigateTo({
      url: '../add/add?data=' + JSON.stringify(info) + '&id=' + e.currentTarget.dataset.id,
    })
  },

  choseAdd(e) {
    console.log(e);
    var self = this;
    // wx.navigateBack({
    //   delta: 0,
    // })
    if (self.data.isOrder) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      var address = 'addressInfo.address';
      var phone = 'addressInfo.phone';
      var id = 'addressInfo.id';
      var name = 'addressInfo.name'
      prevPage.setData({
        [address]: e.currentTarget.dataset.address,
        [id]: e.currentTarget.dataset.id,
        [phone]: e.currentTarget.dataset.phone,
        [name]: e.currentTarget.dataset.name,
      })
      wx.navigateBack({
        delta: 1
      })
    }
  },

})