// pages/car/car.js
var carAPI = require('../../model/car/car');
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
        token: wx.getStorageSync('token'),
        goods: [],
        totalCount: '',
        totalPrice: '',
        good: [],
        user_type: '',
        isShow: false,
        choseLength: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            user_type: app.globalData.userType
        })
        this.getList();
    },

    onShow() {
        this.getList();
        this.setData({
            user_type: app.globalData.userType,
            isAllCheck: false,
            totalCount: '',
            totalPrice: '',
            isShow: false
        })
        
    },

    getTotalPrice() {
        var self = this;
        let carts = self.data.carts;
        let total = 0;
        let count = 0;
        for (let i = 0; i < carts.length; i++) {
            var i_count = carts[i].count
            if (self.data.user_type == 3 || self.data.user_type == 2) {
                if (carts[i].isCheck) {
                    count += Number(i_count);
                    total += carts[i].count * carts[i].good.vip_price;
                }
            } else {
                if (carts[i].isCheck) {
                    count += Number(i_count);
                    total += carts[i].count * carts[i].good.price;
                }
            }
            this.setData({
                carts: carts,
                totalPrice: total,
                totalCount: count,
            });
        }
    },

    // 单选
    choseShop(e) {
        console.log(e);
        var self = this;
        let index = e.currentTarget.dataset.index;
        let carts = self.data.carts;
        var arr = []
        const isCheck = carts[index].isCheck
        self.data.carts[index].isCheck = !self.data.carts[index].isCheck;
        carts.forEach(item => {
            if (item.isCheck) {
                arr.push(item);
            }
        })
        self.setData({
            carts: carts,
            choseLength: arr.length
        });
        // if (self.data.choseLength >= 2) {
        //     self.setData({
        //         isShow: true
        //     })
        // } else {
        //     self.setData({
        //         isShow: false
        //     })
        // }
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
        // self.data.isShow = !self.data.isShow;
        let carts = self.data.carts;
        
        for (let i = 0; i < carts.length; i++) {
            carts[i].isCheck = isAllCheck; // 改变所有商品状态
        }
        self.setData({
            isAllCheck: isAllCheck,
            carts: carts,
            // isShow: self.data.isShow
        });
        this.getTotalPrice();
    },



    toSubtract(e) {
        var self = this;
        const index = e.currentTarget.dataset.index;
        let carts = self.data.carts;
        let num = Number(carts[index].count);
        if (e.currentTarget.dataset.count > 1 && e.currentTarget.dataset.count < 999) {
            num = num - 1;
            carts[index].count = num;
            this.setData({
                carts: carts
            });
            this.getTotalPrice();
        } else {
            self.toDel(e)
        }
    },

    toAdd(e) {
        var self = this;
        const index = e.currentTarget.dataset.index;
        let carts = self.data.carts;
        let num = Number(carts[index].count);
        num = num + 1;
        carts[index].count = num;
        self.setData({
            carts: carts
        });
        this.getTotalPrice();
    },

    getList() {
        var self = this;
        wx.showLoading({
            title: '加载数据中...',
        })
        carAPI.cars(wx.getStorageSync('token')).then(res => {
            console.log(res);
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

    // toDel(e) {
    //     console.log(e);
    //     var self = this;
    //     const index = e.currentTarget.dataset.index;
    //     let carts = self.data.carts;
    //     var arr = [];
    //     arr.push(e.currentTarget.dataset.id)
    //     wx.showModal({
    //         title: '提示',
    //         content: '确认将该商品删除? ',
    //         confirm: '删除',
    //         cancel: '取消',
    //         success(res) {
    //             if (res.confirm) {
    //                 console.log('用户点击确定')
    //                 console.log(arr)
    //                 wx.request({
    //                     url: 'http://192.168.0.107/api/cart',
    //                     method: 'DELETE',
    //                     data: {
    //                         token: wx.getStorageSync('token'),
    //                         goods: arr
    //                     },
    //                     success: (res) => {
    //                         console.log(res);
    //                         // self.getList();
    //                         carts.splice(index, 1);
    //                         self.setData({
    //                             carts: carts
    //                         });
    //                         self.getTotalPrice(); // 重新计算总价格

    //                     }
    //                 })
    //             } else if (res.cancel) {
    //                 console.log('用户点击取消')
    //             }
    //         }
    //     })
    // },
    toDelAll(e) {
        console.log(e);
        var self = this;
        const index = e.currentTarget.dataset.index;
        let carts = self.data.carts;
        var arr = [];
        carts.forEach(item => {
            if (item.isCheck) {
                arr.push(item.good.id);
            }
        })
        // arr.push(e.currentTarget.dataset.id)

        console.log(arr);
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
                                console.log(res);
                                self.getList();
                                // carts.splice(index, 1);
                                self.setData({
                                    isAllCheck: false,
                                    totalCount: '',
                                    totalPrice: ''
                                });
                                // self.getTotalPrice(); // 重新计算总价格
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
    toAccount() {
        var self = this;
        self.data.carts.forEach(item => {
            console.log(item);
            if (item.isCheck) {
                goods.push({
                    good_id: '',
                    count: '',
                    price: ''
                })
            }
        })
        // wx.request({
        //     url: 'http://192.168.0.107/api/creation/order',
        //     method: 'post',
        //     data: {
        //         token: wx.getStorageSync('token'),
        //         goods: arr,
        //         freight: 0,
        //         money: '',
        //         address_id: '',
        //         merchant_id: ''
        //     },
        //     success: (res) => {
        //         console.log(res);
        //         // self.getList();
        //         carts.splice(index, 1);
        //         self.setData({
        //             carts: carts
        //         });
        //         self.getTotalPrice(); // 重新计算总价格

        //     }
        // })
    },

    toMag() {
        var self = this;
        self.setData({
            isShow: !self.data.isShow
        })
    },

})