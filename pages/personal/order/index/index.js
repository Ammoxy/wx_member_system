// pages/personal/order/index/index.js
var app = getApp()
var orderAPI = require('../../../../model/car/order')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 0,
        orderData: [],
        isCommon: false,
        page: 1,
        limit: 20,
        showFoot: false,
        hasMore: true,
        isPage: false,
    },

    onLoad(option) {
        console.log(option);
        this.setData({
            current: Number(option.num)
        })
        if (option.sign) {
            this.setData({
                isCommon: false
            })
            this.getOrder()

        } else {
            this.setData({
                isCommon: true
            })
            this.getComOrder()
        }

    },

    currentTag(e) {
        let self = this;
        self.setData({
            current: e.currentTarget.dataset.num,
        })
        self.getComOrder()
    },

    getOrder() {
        var self = this;
        wx.showLoading({
            title: '数据加载中...',
        })
        orderAPI.userOrderList(wx.getStorageSync('token')).then(res => {
            // console.log(res);
            self.setData({
                orderData: res
            })
            wx.hideLoading()
        })
    },

    getComOrder(isPage) {
        var self = this;
        var param = {};
        wx.showLoading({
            title: '数据加载中...',
        })
        if (self.data.current == 0) {
            param = {
                token: wx.getStorageSync('token'),
                currentPage: self.data.page,
                perPage: self.data.limit,
            }
        } else {
            param = {
                token: wx.getStorageSync('token'),
                currentPage: self.data.page,
                perPage: self.data.limit,
                status: self.data.current
            }
        }
        orderAPI.orders(param).then(res => {
            console.log(res);
            if (isPage) {
                // 下一页的数据拼接在原有数据后面
                self.setData({
                    orderData: self.data.orderData.concat(res.data)
                })
            } else {
                // 第一页数据直接赋值
                self.setData({
                    orderData: res.data
                })
            }
            // 如果返回的数据为空，那么就没有下一页了
            if (res.total <= (self.data.page * 20)) {
                self.setData({
                    hasMore: false,
                    showFoot: true
                })
            }
            wx.hideLoading()
        })
    },

    // 收货
    toShipments(e) {
        var self = this;
        var order_id = e.currentTarget.dataset.id;
        if (self.data.isCommon) {
            console.log('普通');
            wx.showModal({
                title: '提示',
                content: '您是否确定收货',
                confirm: '确定',
                cancel: '取消',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        orderAPI.cofimReceive(wx.getStorageSync('token'), order_id, 1).then(res => {
                            wx.showToast({
                                title: '取消成功',
                                icon: 'none'
                            })
                            self.getComOrder()
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })

        } else {
            console.log('会员');
            wx.showModal({
                title: '提示',
                content: '您是否确定收货',
                confirm: '确定',
                cancel: '取消',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        orderAPI.cofimReceive(wx.getStorageSync('token'), order_id, 2).then(res => {
                            wx.showToast({
                                title: '取消成功',
                                icon: 'none'
                            })
                            self.getOrder()
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
    },
    // 取消订单
    toCancel(e) {
        var self = this;
        var order_id = e.currentTarget.dataset.id;
        if (self.data.isCommon) {
            console.log('普通');
            wx.showModal({
                title: '提示',
                content: '您是否确定取消该订单',
                confirm: '确定',
                cancel: '取消',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        orderAPI.cancelOrder(wx.getStorageSync('token'), order_id, 1).then(res => {
                            wx.showToast({
                                title: '取消成功',
                                icon: 'none'
                            })
                            self.getComOrder()
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })

        } else {
            console.log('会员');
            wx.showModal({
                title: '提示',
                content: '您是否确定取消该订单',
                confirm: '确定',
                cancel: '取消',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        orderAPI.cancelOrder(wx.getStorageSync('token'), order_id, 2).then(res => {
                            wx.showToast({
                                title: '取消成功',
                                icon: 'none'
                            })
                            self.getOrder()
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }

    },
    // 支付
    toPay(e) {
        var self = this;
        console.log(e);
        var order_id = e.currentTarget.dataset.id;
        if (self.data.isCommon) {
            console.log('普通');
            orderAPI.orderPay(wx.getStorageSync('token'), order_id, 1).then(response => {
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
                        });
                        self.getComOrder()
                    },
                    fail(res) {
                        console.log(222, res);
                        wx.showToast({
                            icon: "none",
                            title: '取消成功',
                        });
                    }
                })

            })
        } else {
            console.log('会员');

            orderAPI.orderPay(wx.getStorageSync('token'), order_id, 2).then(response => {
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
                        });
                        self.getOrder()
                    },
                    fail(res) {
                        console.log(222, res);
                        wx.showToast({
                            icon: "none",
                            title: '取消成功',
                        });
                    }
                })

            })
        }
    },
    scrollToLower(e) {
        if (this.data.hasMore) {
            this.setData({
                page: this.data.page + 1
            })
            this.getComOrder(true);
        }
    },

})