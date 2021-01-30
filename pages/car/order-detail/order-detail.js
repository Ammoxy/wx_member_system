// pages/car/order-detail/order-detail.js
var address = require('../../../model/personal/address');
var attache = require('../../../model/personal/attache');
var orderAPI = require('../../../model/car/order');
var infomation = require('../../../model/personal/infomation')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: null,
    totalPrice: 0,
    totalCount: 0,
    // address: null,
    addressData: [],
    addressInfo: {
      address: '',
      id: '',
      phone: '',
      name: '',
    },
    fetch: false,
    merchantList: [],
    freight: 0,
    merchant: '',
    merchant_id: '',
    address_id: '',
    goods: [],
    totalMoney: '',
    user_id: '',
    // user_id: 1,
    is_fetch: null,
    checkDate: '',
    order_id: '',
    user_type: '',
    isInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
    if (options.data) {
      // 会员订单
      console.log('会员订单 data', JSON.parse(options.data));

      this.setData({
        orderData: JSON.parse(options.data),
        totalCount: JSON.parse(options.data)[0].count,
        totalPrice: JSON.parse(options.data)[0].count * JSON.parse(options.data)[0].price + JSON.parse(options.data)[0].count * JSON.parse(options.data)[0].freight,
        freight: JSON.parse(options.data)[0].freight * JSON.parse(options.data)[0].count,
        merchantList: JSON.parse(options.data)[0].have_merchant,
        is_fetch: JSON.parse(options.data)[0].is_fetch,
        totalMoney: JSON.parse(options.data)[0].count * JSON.parse(options.data)[0].price
      })
    } else if (options.param) {
      // 普通订单
      console.log('普通订单 param', JSON.parse(options.param));

      this.setData({
        orderData: JSON.parse(options.param).goodsInfo,
        totalCount: JSON.parse(options.param).totalCount,
        freight: JSON.parse(options.param).totalFreight,
        totalPrice: JSON.parse(options.param).money + JSON.parse(options.param).totalFreight,
        goods: JSON.parse(options.param).good,
        totalMoney: JSON.parse(options.param).money
      })

      if (JSON.parse(options.param).goodsInfo.length == 1) {
        this.setData({
          is_fetch: JSON.parse(options.param).goodsInfo[0].is_fetch,
          merchantList: JSON.parse(options.param).goodsInfo[0].have_merchant,
        })
      } else {
        this.setData({
          is_fetch: 2
        })
      }
    }
    this.getAddress();
  },

  onShow: function (options) {
    this.setData({
      addressInfo: {
        address: this.data.addressInfo.address,
        id: this.data.addressInfo.id,
        phone: this.data.addressInfo.phone,
        name: this.data.addressInfo.name,
      }
    })
    this.getInfo();
    // this.getAddress();
    
  },
  // 选择日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      checkDate: e.detail.value
    })
  },
  // 选择商家地址
  addressChange(e) {
    var self = this;
    self.setData({
      merchant: self.data.merchantList[e.detail.value].address,
      is_merchant: e.detail.value,
      merchant_id: self.data.merchantList[e.detail.value].id,
    })
  },
  // 获取地址列表
  getAddress() {
    var self = this;
    wx.showLoading({
      title: '加载中...',
    })
    address.addList(wx.getStorageSync('token')).then(res => {
      console.log(res);

      if (res.length >= 1) {
        res.forEach(item => {
          if (item.is_default == 1) {
            self.setData({
              addressInfo: {
                address: item.address,
                id: item.id,
                phone: item.phone,
                name: item.name,
              }
            })
          }
        })
        self.setData({
          addressData: res,
        })
      }

      wx.hideLoading()
    })
  },
  toAdd() {
    wx.navigateTo({
      url: '../../personal/address/index/index?superiors=' + 'superiors',
    })
  },

  toSet() {
    this.setData({
      fetch: !this.data.fetch
    })
  },
  getInfo() {
    var self = this;
    infomation.userInfo(wx.getStorageSync('token')).then(res => {
      console.log(res);
      if (res.user_id) {
        app.globalData.userType = res.type;
        self.setData({
          user_type: res.type,
          isInfo: false
        })
      } else {
        self.setData({
          user_type: res.type,
          isInfo: true
        })
      }
      
    })
  },

  // 会员订单支付
  createOrder(param) {
    var self = this;
    var payParam = {}
    orderAPI.userOrder(param).then(res => {
      self.setData({
        order_id: res.id,
      })
      console.log('会员订单支付', res);
      orderAPI.orderPay(wx.getStorageSync('token'), self.data.order_id, 2).then(response => {
        wx.requestPayment({
          timeStamp: response.timeStamp,
          nonceStr: response.nonceStr,
          package: response.package,
          signType: 'MD5',
          paySign: response.paySign,
          success(res) {
            console.log(111, res);
            wx.showToast({
              icon: "none",
              title: '购买成功',
              success: () => {
                wx.reLaunch({
                  url: '../../personal/order/index/index?sign=' + 'member'
                })
              }
            });
          },
          fail(res) {
            console.log(222, res);
            wx.showToast({
              icon: "none",
              title: '取消成功',
              success: () => {
                wx.reLaunch({
                  url: '../../personal/order/index/index?sign=' + 'member'
                })
              }
            });
          }
        })

      })
    })
  },

  toAccount() {
    var self = this;
    var param = {}
    // 扫码
    if (self.data.user_id == 1) {
      if (self.data.isInfo) {
        wx.showModal({
          title: '提示',
          content: '您未填写个人信息, 无法提交订单, 是否前往补充',
          confirm: '确定',
          cancel: '取消',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateTo({
                url: "../../personal/information/information"
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        if (self.data.fetch) {
          param = {
            token: wx.getStorageSync('token'),
            good_id: self.data.orderData[0].id,
            money: self.data.orderData[0].price * self.data.orderData[0].count,
            count: self.data.totalCount,
            merchant_id: self.data.merchant_id,
            user_id: 4,
            date: self.data.checkDate
          }
          if (param.merchant_id) {
            self.createOrder(param);
          } else {
            wx.showToast({
              title: '您已选择到店自取, 请选择商家地址',
              icon: 'none'
            })
          }
        } else {
          param = {
            token: wx.getStorageSync('token'),
            good_id: self.data.orderData[0].id,
            freight: self.data.freight,
            money: self.data.orderData[0].price * self.data.orderData[0].count,
            count: self.data.totalCount,
            address_id: self.data.addressInfo.id,
            user_id: 4
          }
          self.createOrder(param);
        }
      }
    } else { // 会员
      // if (self.data.isInfo) {
      //   wx.showModal({
      //     title: '提示',
      //     content: '您未填写个人信息, 无法提交订单, 是否前往补充',
      //     confirm: '确定',
      //     cancel: '取消',
      //     success(res) {
      //       if (res.confirm) {
      //         console.log('用户点击确定')
      //         wx.navigateTo({
      //           url: "../../personal/information/information"
      //         })
      //       } else if (res.cancel) {
      //         console.log('用户点击取消')
      //       }
      //     }
      //   })
      // } else {
      if (self.data.fetch) {
        if (self.data.merchant_id) {
          wx.request({
            url: 'https://he.fengniaotuangou.cn/api/creation/order',
            method: 'post',
            data: {
              token: wx.getStorageSync('token'),
              good: self.data.goods,
              money: self.data.totalMoney,
              merchant_id: self.data.merchant_id,
              date: self.data.checkDate
            },
            success: (res) => {
              if (res.data.code == 10000) {
                console.log('普通订单支付', res);
                self.setData({
                  order_id: res.data.result.id
                })
                orderAPI.orderPay(wx.getStorageSync('token'), self.data.order_id, 1).then(response => {
                  wx.requestPayment({
                    timeStamp: response.timeStamp,
                    nonceStr: response.nonceStr,
                    package: response.package,
                    signType: 'MD5',
                    paySign: response.paySign,
                    success(res) {
                      console.log(111, res);
                      wx.showToast({
                        icon: "none",
                        title: '购买成功',
                        success: () => {
                          wx.reLaunch({
                            url: '../../personal/order/index/index?num=' + 2,
                          })
                        }
                      });
                    },
                    fail(res) {
                      console.log(222, res);
                      wx.showToast({
                        icon: "none",
                        title: '取消成功',
                        success: () => {
                          wx.reLaunch({
                            url: '../../personal/order/index/index?num=' + 1,
                          })
                        }
                      });
                    }
                  })
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '您已选择到店自取, 请选择商家地址',
            icon: 'none'
          })
        }
      } else {
        // wx.request({
        //   url: 'http://192.168.0.107/api/creation/order',
        //   method: 'post',
        //   data: {
        //     token: wx.getStorageSync('token'),
        //     good: self.data.goods,
        //     freight: self.data.freight,
        //     money: self.data.totalMoney,
        //     address_id: self.data.addressInfo.id,
        //   },
        //   success: (res) => {
        //     if (res.data.code == 10000) {
        //       console.log('普通订单支付', res);
        //       self.setData({
        //         order_id: res.data.result.id
        //       })
        //     }
        //   }
        // })
        if (self.data.addressInfo.id) {
          wx.request({
            url: 'https://he.fengniaotuangou.cn/api/creation/order',
            method: 'post',
            data: {
              token: wx.getStorageSync('token'),
              good: self.data.goods,
              freight: self.data.freight,
              money: self.data.totalMoney,
              address_id: self.data.addressInfo.id,
            },
            success: (res) => {
              if (res.data.code == 10000) {
                console.log('普通订单支付', res);
                self.setData({
                  order_id: res.data.result.id
                })
                orderAPI.orderPay(wx.getStorageSync('token'), self.data.order_id, 1).then(response => {
                  wx.requestPayment({
                    timeStamp: response.timeStamp,
                    nonceStr: response.nonceStr,
                    package: response.package,
                    signType: 'MD5',
                    paySign: response.paySign,
                    success(res) {
                      console.log(111, res);
                      wx.showToast({
                        icon: "none",
                        title: '购买成功',
                        success: () => {
                          wx.reLaunch({
                            url: '../../personal/order/index/index?num=' + 2
                          })
                        }
                      });
                    },
                    fail(res) {
                      console.log(222, res);
                      wx.showToast({
                        icon: "none",
                        title: '取消成功',
                        success: () => {
                          wx.reLaunch({
                            url: '../../personal/order/index/index?num=' + 1,
                          })
                        }
                      });
                    }
                  })
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '您未选择收货地址, 请先添加选择',
            icon: 'none'
          })
        }

        // }
      }

    }
  }
})