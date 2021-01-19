// pages/goods/detail/detail.js
var goods = require('../../../model/classify/goods');
var WxParse = require('../../../wxParse/wxParse.js');
var carAPI = require('../../../model/car/car')
var app = getApp()
var orderAPI = require('../../../model/car/order')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        details: null,
        id: '',
        carParam: null,
        user_type: '',
        user_id: 2,
        orderParam: null,
        merchant_id: '',
        info: {
            freight: '',
            img: '',
            is_fetch: '',
            price: '',
            count: ''
        },
        count: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id,
            good_id: options.id,
            user_type: app.globalData.userType
        });
        this.getDetail();
        console.log(app.globalData.userType);

    },

    getDetail() {
        var self = this;
        if (self.data.user_id == 1) {
            goods.memberGoodDetail(wx.getStorageSync('token'), self.data.id).then(res => {
                // console.log('res', res);
                WxParse.wxParse('article', 'html', res.detail, self, 2);
                self.setData({
                    details: res,
                    info: {
                        freight: res.freight,
                        img: res.img,
                        is_fetch: res.is_fetch,
                        price: res.price,
                    }
                })
            })
        } else {
            goods.goodDetail(wx.getStorageSync('token'), self.data.id).then(res => {
                // console.log('res', res);
                WxParse.wxParse('article', 'html', res.detail, self, 2);
                self.setData({
                    details: res
                })
            })
        }

    },

    toSubtract() {
        var self = this;
        if (self.data.count > 1) {
            self.setData({
                count: self.data.count - 1,

            })
        } else {
            wx.showToast({
                title: '数量不能小于1',
                icon: 'none'
            })
        }

    },
    toAdd() {
        var self = this;
        self.setData({
            count: self.data.count + 1,

        })
    },

    addCar() {
        var self = this;
        self.setData({
            carParam: {
                token: wx.getStorageSync('token'),
                good_id: self.data.good_id,
                count: 1,
                type: 1
            }
        })
        carAPI.creationCar(self.data.carParam).then(res => {
            // console.log(res);
            wx.showToast({
                title: '添加购物车成功',
                icon: 'none'
            })
        })
    },

    addOrder() {
        var self = this;
        var data = {
            freight: self.data.info.freight,
            img: self.data.info.img,
            is_fetch: self.data.info.is_fetch,
            price: self.data.info.price * self.data.count,
            count: self.data.count
        }
        console.log(data);
        wx.navigateTo({
          url: '../../car/order-detail/order-detail?data=' + JSON.stringify(data),
        })
        // self.setData({
        //     orderParam: {
        //         token: wx.getStorageSync('token'),
        //         good_id: self.data.good_id,
        //         freight: 0,
        //         money: 200,
        //         count: 1,
        //         merchant_id: 1
        //     }
        // })
        // orderAPI.userOrder(self.data.orderParam).then(res => {

        // })
    },

})