// pages/personal/address/index/index.js
var address = require('../../../../model/personal/address');
var tools = require('../../../../utils/tools')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      res.forEach(item => {
        item.phone = tools.toNorms(item.phone);
        // console.log(tools.toNorms(item.phone));
      })
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
      url: '../amendAdd/amendAdd?data=' + JSON.stringify(info) + '&id=' + e.currentTarget.dataset.id,
    })
    
  },
})