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
        // user_id: 1,
        user_id: 2,
        orderParam: null,
        merchant_id: '',
        info: {
            freight: '',
            img: '',
            is_fetch: '',
            price: '',
            count: '',
            id: '',
            have_merchant: []
        },
        count: 1,
        user_type: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id,
            good_id: options.id,
            user_type: options.user_type
        });
        this.getDetail();
    },

    getDetail() {
        var self = this;
        wx.showLoading({
          title: '数据加载中...',
        })
        if (self.data.user_id == 1) {
            goods.memberGoodDetail(wx.getStorageSync('token'), self.data.id).then(res => {
                WxParse.wxParse('article', 'html', res.detail, self, 2);
                self.setData({
                    details: res,
                    info: {
                        freight: res.freight,
                        img: res.img,
                        is_fetch: res.is_fetch,
                        price: res.price,
                        name: res.name,
                        intro: res.intro,
                        id: res.id,
                        have_merchant: res.have_merchant
                    }
                })
                wx.hideLoading()
            })
        } else {
            goods.goodDetail(wx.getStorageSync('token'), self.data.id).then(res => {
                WxParse.wxParse('article', 'html', res.detail, self, 2);
                self.setData({
                    details: res
                })
                wx.hideLoading()
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
                count: self.data.count,
                type: 1
            }
        })
        carAPI.creationCar(self.data.carParam).then(res => {
            wx.showToast({
                title: '添加购物车成功',
                icon: 'none'
            })
        })
    },

    iptCount(e) {
        this.setData({
            count: e.detail.value
        })
    },

    addOrder() {
        var self = this;
        var data = [];
        data.push({
            freight: self.data.info.freight,
            img: self.data.info.img,
            is_fetch: self.data.info.is_fetch,
            price: self.data.info.price,
            count: self.data.count,
            name: self.data.info.name,
            intro: self.data.info.intro,
            id: self.data.info.id,
            have_merchant: self.data.info.have_merchant,
        })
        console.log(data);
        wx.navigateTo({
            url: '../../car/order-detail/order-detail?data=' + JSON.stringify(data),
        })
    },
})