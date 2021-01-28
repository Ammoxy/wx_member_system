// pages/car/car.js
var carAPI = require('../../model/car/car');
var infomationAPI = require('../../model/personal/infomation')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        total: 1,
        carts: [],
        isOneCheck: false,
        isAllCheck: false,
        carParam: null,
        count: null,
        goods: [],
        totalCount: '',
        totalPrice: 0,
        goodsInfo: [],
        user_type: '',
        isShow: false,
        choseLength: 0,
        totalFreight: 0,
        have_merchant: [], // 商家地址
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getList();
    },

    onShow() {
        this.getInfo()
    },

    // 获取购物车列表
    getList() {
        var self = this;
        wx.showLoading({
            title: '加载数据中...',
        })
        carAPI.cars(wx.getStorageSync('token')).then(res => {
            self.setData({
                carts: res,
            })
            if (self.data.carts.length > 0) {
                self.data.carts.forEach(item => {
                    item.isCheck = false;
                })
            }
            wx.hideLoading()
        })
    },

    // 计算价格方法
    getTotalPrice() {
        var self = this;
        let carts = self.data.carts;
        let total = 0;
        let count = 0;
        let freight = 0;
        for (let i = 0; i < carts.length; i++) {
            var i_count = carts[i].count
            if (self.data.user_type == 3 || self.data.user_type == 2) {
                if (carts[i].isCheck) {
                    count += Number(i_count);
                    total += carts[i].count * carts[i].good.vip_price;
                    freight += carts[i].good.freight * carts[i].count
                }
            } else {
                if (carts[i].isCheck) {
                    count += Number(i_count);
                    total += carts[i].count * carts[i].good.price;
                    freight += carts[i].good.freight * carts[i].count
                }
            }
            this.setData({
                carts: carts,
                totalPrice: total,
                totalCount: count,
                totalFreight: freight
            });
        }
    },

    // 获取参数封装
    getParam(arr) {
        var self = this;
        var goodsArr = [];
        var goodsInfo = [];
        var have_merchant = [];

        arr.forEach(item => {
            if (item.isCheck) {
                // 参数: 会员与普通用户不同
                console.log(self.data.user_type);
                
                if (self.data.user_type == 2 || self.data.user_type == 3) {
                    goodsArr.push({
                        good_id: item.good.id,
                        count: Number(item.count),
                        price: item.good.vip_price * Number(item.count)
                    })
                } else {
                    goodsArr.push({
                        good_id: item.good.id,
                        count: Number(item.count),
                        price: item.good.price * Number(item.count)
                    })
                }

                goodsInfo.push({
                    good_id: item.good.id,
                    count: Number(item.count),
                    vip_price: item.good.vip_price,
                    freight: item.good.freight,
                    img: item.good.img,
                    intro: item.good.intro,
                    name: item.good.name,
                    id: item.good.id,
                    price: item.good.price,
                    have_merchant: item.good.have_merchant,
                    is_fetch: item.good.is_fetch
                })
            }

        })

        self.setData({
            goods: goodsArr,
            goodsInfo: goodsInfo,
            have_merchant: have_merchant
        });
    },

    // 单选
    choseShop(e) {
        console.log(e);
        var self = this;
        let index = e.currentTarget.dataset.index;
        let carts = self.data.carts;
        var arr = [];
        const isCheck = carts[index].isCheck
        self.data.carts[index].isCheck = !self.data.carts[index].isCheck;
        carts.forEach(item => {
            if (item.isCheck) {
                arr.push(item);
            }
        })
        // 获取参数
        self.getParam(arr);
        self.setData({
            carts: carts,
            choseLength: arr.length,
        });
        if (self.data.choseLength == carts.length) {
            self.setData({
                isAllCheck: true
            })
        } else {
            self.setData({
                isAllCheck: false
            })
        }
        self.getTotalPrice();
    },

    // 全选
    allCheck() {
        var self = this;
        let isAllCheck = self.data.isAllCheck; // 是否全选状态
        isAllCheck = !isAllCheck;
        let carts = self.data.carts;
        var arr = [];
        for (let i = 0; i < carts.length; i++) {
            carts[i].isCheck = isAllCheck; // 改变所有商品状态
        }
        self.setData({
            isAllCheck: isAllCheck,
            carts: carts,
        });
        self.data.carts.forEach(item => {
            if (item.isCheck) {
                arr.push(item)
            }
        })
        self.getParam(arr);
        this.getTotalPrice();
    },

    toSubtract(e) {
        var self = this;
        const index = e.currentTarget.dataset.index;
        let carts = self.data.carts;
        let num = Number(carts[index].count);
        var arr = [];
        if (e.currentTarget.dataset.count > 1 && e.currentTarget.dataset.count < 999) {
            self.setData({
                carParam: {
                    token: wx.getStorageSync('token'),
                    good_id: e.currentTarget.dataset.id,
                    count: Number(e.currentTarget.dataset.count) - 1,
                    type: 2
                }
            })
            wx.showLoading({
                title: '加载中...',
            })
            carAPI.creationCar(self.data.carParam).then(res => {
                wx.hideLoading()
                num = num - 1;
                carts[index].count = num;
                carts.forEach(item => {
                    if (item.isCheck) {
                        arr.push(item)
                    }
                })
                // 获取参数
                self.getParam(arr);
                self.setData({
                    carts: carts,
                });
                self.getTotalPrice();
            })
        } else {
            wx.showToast({
                title: '数量不能少于1! ',
                icon: 'none'
            })
        }
    },

    toAdd(e) {
        var self = this;
        const index = e.currentTarget.dataset.index;
        let carts = self.data.carts;
        let num = Number(carts[index].count);
        var arr = []
        self.setData({
            carParam: {
                token: wx.getStorageSync('token'),
                good_id: e.currentTarget.dataset.id,
                count: Number(e.currentTarget.dataset.count) + 1,
                type: 2
            }
        })
        wx.showLoading({
            title: '加载中...',
        })
        carAPI.creationCar(self.data.carParam).then(res => {
            // console.log(res);
            wx.hideLoading()
            num = num + 1;
            carts[index].count = num;
            carts.forEach(item => {
                if (item.isCheck) {
                    arr.push(item)
                }
            })
            // 获取参数
            self.getParam(arr);
            self.setData({
                carts: carts,
            });
            console.log(self.data.goodsInfo);

            self.getTotalPrice();
        })
    },

    // 删除
    toDelAll(e) {
        var self = this;
        let carts = self.data.carts;
        var arr = [];
        carts.forEach(item => {
            if (item.isCheck) {
                arr.push(item.good.id);
            }
        })

        if (arr.length > 0) {
            wx.showModal({
                title: '提示',
                content: '确认将所选商品删除? ',
                confirm: '删除',
                cancel: '取消',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        console.log(arr)
                        wx.request({
                            url: 'http://192.168.0.107/api/cart',
                            method: 'DELETE',
                            data: {
                                token: wx.getStorageSync('token'),
                                goods: arr
                            },
                            success: (res) => {
                                self.getList();
                                self.setData({
                                    isAllCheck: false,
                                    totalCount: '',
                                    totalPrice: ''
                                });
                            }
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else {
            wx.showToast({
                title: '您未选择商品',
                icon: 'none'
            })
        }

    },

    // 结算
    toAccount() {
        var self = this;
        var param = {
            good: self.data.goods,
            money: self.data.totalPrice,
            totalFreight: self.data.totalFreight,
            goodsInfo: self.data.goodsInfo,
            totalCount: self.data.totalCount
        }
        console.log(param.good.length);
        console.log(param.good.length);

        if (param.good.length > 0 && param.goodsInfo.length > 0) {
            wx.navigateTo({
                url: '../car/order-detail/order-detail?param=' + JSON.stringify(param),
            })
        } else {
            wx.showToast({
                title: '您未选择商品',
                icon: 'none'
            })
        }
    },

    // 管理
    toMag() {
        var self = this;
        self.setData({
            isShow: !self.data.isShow
        })
    },

    //下拉刷新
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading() //在标题栏中显示加载
        this.getList();
        this.setData({
            isAllCheck: false,
            totalPrice: 0,
            goods: [],
            goodsInfo: []
        })
        //模拟加载
        setTimeout(function () {
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
    },

    getInfo() {
        var self = this;
        infomationAPI.userInfo(wx.getStorageSync('token')).then(res => {
            console.log(res);
            if (res) {
                self.setData({
                    user_type: res.type
                })
            }
        })
    },
})