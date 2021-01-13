// pages/personal/address/add/add.js
var add = require('../../../../model/personal/address')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    provide: '',
    city: '',
    area: '',
    provideList: [],
    cityList: [],
    areaList: [],
    is_pro: '', // 选中省级
    is_city: '', // 选中市级
    is_area: '', // 选中区级
    parent_id: '', // 用于取地区值
    province_id: '',
    city_id: '',
    district_id: '',
    amendId: '',
    info: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        amendId: options.id,
        info: JSON.parse(options.data),
        provide: JSON.parse(options.data).province,
        city: JSON.parse(options.data).city,
        area: JSON.parse(options.data).district,
        province_id: JSON.parse(options.data).provinceid,
        city_id: JSON.parse(options.data).cityid,
        district_id: JSON.parse(options.data).districtid,
      })
      this.getCity(this.data.province_id);
      this.getArea(this.data.city_id)
      console.log(this.data.info);
    }
    this.getPro();
    // console.log(JSON.parse(options.data));
  },
  getPro() {
    var self = this;
    add.chinaAreas(wx.getStorageSync('token'), 1, 0).then(res => {
      // console.log(res);
      self.setData({
        provideList: res
      })
    })
  },
  getCity(val) {
    var self = this;
    add.chinaAreas(wx.getStorageSync('token'), 2, val).then(res => {
      // console.log(res);
      self.setData({
        cityList: res
      })
    })
  },
  getArea(val) {
    var self = this;
    add.chinaAreas(wx.getStorageSync('token'), 3, val).then(res => {
      // console.log(res);
      self.setData({
        areaList: res
      })
    })
  },
  proChange(e) {
    var self = this;
    console.log(e);
    self.setData({
      is_pro: e.detail.value,
      provide: self.data.provideList[e.detail.value].name,
      // parent_id: self.data.provideList[e.detail.value].id,
      province_id: self.data.provideList[e.detail.value].id,
      city: '',
      area: ''
    })
    // self.data.parent_id = self.data.provideList[self.data.is_pro].id;
    self.getCity(self.data.province_id)
  },
  cityChange(e) {
    var self = this;
    console.log(e);
    self.setData({
      is_city: e.detail.value,
      city: self.data.cityList[e.detail.value].name,
      // parent_id: self.data.cityList[e.detail.value].id,
      city_id: self.data.cityList[e.detail.value].id,
      area: ''
    })
    // self.data.parent_id = self.data.cityList[self.data.is_city].id;
    self.getArea(self.data.city_id)
  },
  areaChange(e) {
    var self = this;
    console.log(e);
    self.setData({
      is_area: e.detail.value,
      area: self.data.areaList[e.detail.value].name,
      // parent_id: self.data.areaList[e.detail.value].id,
      district_id: self.data.areaList[e.detail.value].id
    })
    // self.data.parent_id = self.data.areaList[self.data.is_area].id;
  },
  saveAddress(e) {
    var self = this;
    console.log(e);
    var is_default;
    e.detail.value.is_default == true ? is_default = 1 : is_default = 2;
    if (self.data.amendId) {
      this.setData({
        info: {
          token: wx.getStorageSync('token'),
          province_id: self.data.province_id,
          city_id: self.data.city_id,
          district_id: self.data.district_id,
          address: e.detail.value.address,
          name: e.detail.value.name,
          phone: e.detail.value.phone,
          is_default: is_default,
          id: self.data.amendId
        }
      })
    } else {
      this.setData({
        info: {
          token: wx.getStorageSync('token'),
          province_id: self.data.province_id,
          city_id: self.data.city_id,
          district_id: self.data.district_id,
          address: e.detail.value.address,
          name: e.detail.value.name,
          phone: e.detail.value.phone,
          is_default: is_default
        }
      })
    }

    console.log(self.data.info);

    // var name = e.detail.value.name;
    // var address = e.detail.value.address;
    // var province_id = self.data.province_id;
    // var city_id = self.data.city_id;
    // var district_id = self.data.district_id;
    // var phone = e.detail.value.phone;
    if (self.data.info.province_id && self.data.info.city_id && self.data.info.district_id && self.data.info.address && self.data.info.name && self.data.info.phone && self.data.info.is_default) {
      add.createAdd(self.data.info).then(res => {
        console.log(res);
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          success: () => {
            wx.navigateBack({
              delta: 1,
            })
          }
        })
      })
    } else {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
    }
  },
  delAdd(e) {
    var self = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该地址',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          add.delAdd(wx.getStorageSync('token'), self.data.amendId).then(res => {
            wx.showToast({
              icon: "none",
              title: '删除成功',
              success: () => {
                wx.navigateBack({
                  delta: 1,
                })
                // wx.navigateTo({
                //   url: '../index/index',
                // })
              }
            });
          })
        } else if (res.cancel) {
          console.log('用户点击取消');
          wx.showToast({
            icon: "none",
            title: '取消成功'
          });
        }
      }
    })

  },
  // map(e) {
  //   var self = this;
  //   console.log("开启地图")
  //   wx.chooseLocation({
  //     success(res) {
  //       console.log(res)
  //       self.setData({
  //         address: res.address
  //       })
  //     },
  //     fail: function (err) {
  //       console.log(123, err)
  //       wx.getSetting({
  //         success: (res) => {
  //           console.log(456, res)
  //           if (res.authSetting['scope.userLocation'] == false) {

  //           }
  //         }
  //       })
  //     },
  //   })
  //   console.log("地图")
  // },
})