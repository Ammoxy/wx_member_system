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
        user_id: '',
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
        user_type: '',
        hideModal: true, //模态框的状态  true-隐藏  false-显示
        animationData: {}, //
        isAdd: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.user_id) {
            this.setData({
                user_id: options.user_id
            })
        }
        this.setData({
            id: options.id,
            good_id: options.id,
            user_type: options.user_type
        });
        this.getDetail();
    },
    // 获取商品详情
    getDetail() {
        var self = this;
        wx.showLoading({
            title: '数据加载中...',
        })
        if (self.data.user_id) {
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

    // 数量加减
    toSubtract() {
        var self = this;
        if (Number(self.data.count) > 1) {
            self.setData({
                count: Number(self.data.count) - 1,
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
            count: Number(self.data.count) + 1,
        })
    },

    // 加入购物车
    addCar() {
        var self = this;
        self.setData({
            carParam: {
                token: wx.getStorageSync('token'),
                good_id: self.data.good_id,
                count: Number(self.data.count),
                type: 1
            }
        })
        carAPI.creationCar(self.data.carParam).then(res => {
            wx.showToast({
                title: '添加购物车成功',
                icon: 'none'
            })
            self.setData({
                hideModal: true
            })
        })
    },
    // 输入数量
    iptCount(e) {
        this.setData({
            count: e.detail.value
        })
    },


    // 添加订单
    addOrder() {
        var self = this;
        if (self.data.user_id) {
            var data = [];
            data.push({
                freight: self.data.info.freight,
                img: self.data.info.img,
                is_fetch: self.data.info.is_fetch,
                price: self.data.info.price,
                count: Number(self.data.count),
                name: self.data.info.name,
                intro: self.data.info.intro,
                id: self.data.info.id,
                have_merchant: self.data.info.have_merchant,
            })
            console.log(data);
            wx.navigateTo({
                url: '../../car/order-detail/order-detail?data=' + JSON.stringify(data) + "&user_id=" + self.data.user_id,
            })
        } else {
            console.log(2222, self.data.details);

            var param = {
                good: [{
                    good_id: self.data.details.id,
                    count: Number(self.data.count),
                    price: self.data.user_type == 1 ? self.data.details.price * Number(self.data.count) : self.data.details.vip_price * Number(self.data.count)
                }],
                money: self.data.user_type == 1 ? self.data.details.price * Number(self.data.count) : self.data.details.vip_price * Number(self.data.count),
                totalFreight: Number(self.data.count) * self.data.details.freight,
                goodsInfo: [{
                    good_id: self.data.details.id,
                    count: Number(self.data.count),
                    vip_price: self.data.details.vip_price,
                    freight: self.data.details.freight,
                    img: self.data.details.img,
                    intro: self.data.details.intro,
                    name: self.data.details.name,
                    id: self.data.details.id,
                    price: self.data.details.price,
                    have_merchant: self.data.details.have_merchant,
                    is_fetch: self.data.details.is_fetch
                }],
                totalCount: Number(self.data.count)
            }
            console.log(333, param);

            wx.navigateTo({
                url: '../../car/order-detail/order-detail?param=' + JSON.stringify(param),
            })
        }

    },

    // 前往购物车
    toCar() {
        wx.switchTab({
            url: '../../car/car',
        })
    },

    // 购物车
    // 显示遮罩层
    showModal: function (e) {
        console.log(e);
        var that = this;
        if (e.currentTarget.dataset.index == '1') {
            that.setData({
                isAdd: true
            })
        } else if (e.currentTarget.dataset.index == '2') {
            that.setData({
                isAdd: false
            })
        }
        that.setData({
            hideModal: false,
        })
        var animation = wx.createAnimation({
            duration: 600, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
            timingFunction: 'ease', //动画的效果 默认值是linear
        })
        this.animation = animation
        setTimeout(function () {
            that.fadeIn(); //调用显示动画
        }, 200)
    },

    // 隐藏遮罩层
    hideModal: function () {
        var that = this;
        var animation = wx.createAnimation({
            duration: 800, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
            timingFunction: 'ease', //动画的效果 默认值是linear
        })
        this.animation = animation
        that.fadeDown(); //调用隐藏动画   
        setTimeout(function () {
            that.setData({
                hideModal: true
            })
        }, 720) //先执行下滑动画，再隐藏模块

    },
    //动画集
    fadeIn: function () {
        this.animation.translateY(0).step()
        this.setData({
            animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
        })
    },
    fadeDown: function () {
        this.animation.translateY(300).step()
        this.setData({
            animationData: this.animation.export(),
        })
    },
})