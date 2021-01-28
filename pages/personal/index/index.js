let app = getApp();
let user = require('../../../model/user');
var infomation = require('../../../model/personal/infomation')
var orderAPI = require('../../../model/car/order')

Page({

    data: {
        isAuthorization: false,
        userInfo: null,
        qrCode: '/icon/qrcode.jpg',
        wxInfo: null,
        type: '',
        user_id: '',
        page: 1,
        limit: 20,
        payDot: '',
        sendDot: '',
        collectDot: '',
        disDot: '',
        money: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var url = decodeURIComponent(options.q);

        if (!wx.getStorageSync('token')) {
            this.setData({
                isAuthorization: true
            })
        } else {
            this.getComOrder()
        }

    },

    onShow: function () {
        // 微信授权
        this.setData({
            wxInfo: wx.getStorageSync('wxInfo'),
        })
        if (!wx.getStorageSync('token')) {
            this.setData({
                isAuthorization: true
            })
        } else {
            this.getInfo()
            this.getComOrder()
        }

    },
    getUserInfo(e) {
        let self = this;
        wx.login({
            success(res) {
                var code = res.code;
                if (code) {
                    wx.getUserInfo({
                        success: (res) => {
                            user.login(code, res.iv, res.encryptedData).then(response => {
                                console.log(111, response);
                                wx.showToast({
                                    title: '授权成功',
                                    icon: 'success',
                                    success: (res) => {
                                        console.log('res', res);

                                        wx.setStorage({
                                            data: response.token,
                                            key: 'token',
                                        })
                                        // 全局
                                        var wxInfo = {
                                            avatarUrl: response.info.avatarUrl,
                                            nickName: response.info.nickName
                                        };
                                        // var health_user = response.userInfo
                                        wx.setStorageSync('wxInfo', wxInfo)
                                        // wx.setStorageSync('health_user', health_user)
                                        self.setData({
                                            wxInfo: wxInfo,
                                            isAuthorization: false
                                        });
                                        console.log(self.data.isAuthorization);
                                        // self.getInfo()
                                    }
                                })
                            }).catch(err => {
                                console.log(err);

                            })

                        }
                    })
                }
            }
        });
    },

    // 取消授权
    cancel() {
        this.setData({
            isAuthorization: false
        })
    },

    // 二维码放大
    preview() {
        let self = this;
        wx.previewImage({
            current: self.data.qrCode, // 当前显示图片的http链接
            urls: [self.data.qrCode] // 需要预览的图片http链接列表
        })
    },

    // 去收货地址
    toAddress() {
        if (!wx.getStorageSync('token')) {
            wx.showToast({
                icon: "none",
                title: '请先登录'
            });
            wx.removeStorageSync('wxInfo')
        } else {
            wx.navigateTo({
                url: '/pages/personal/address/index/index',
            })
        }

    },
    toUserInfo() {
        if (!wx.getStorageSync('token')) {
            wx.showToast({
                icon: "none",
                title: '请先登录'
            });
            wx.removeStorageSync('wxInfo')
        } else {
            wx.navigateTo({
                url: "../information/information"
            })
        }
    },

    toAttache() {
        if (!wx.getStorageSync('token')) {
            wx.showToast({
                icon: "none",
                title: '请先登录'
            });
            wx.removeStorageSync('wxInfo')
        } else {

            if (this.data.user_id != undefined) {
                wx.navigateTo({
                    url: '/pages/personal/attache/attache?health_user=' + JSON.stringify(this.data.userInfo) + '&user_id=' + this.data.user_id,
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: '您未填写个人信息, 无法申请, 是否前往补充',
                    confirm: '确定',
                    cancel: '取消',
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                            wx.navigateTo({
                                url: "../information/information"
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })

            }

        }
    },

    getInfo() {
        var self = this;
        infomation.userInfo(wx.getStorageSync('token')).then(res => {
            console.log(res);
            if (res) {
                app.globalData.user_type = res.type;
                self.setData({
                    userInfo: res,
                    type: res.type,
                    user_id: res.user_id,
                })
                if (res.health_user) {
                    self.setData({
                        money: res.health_user.money
                    })
                }
            }
        })
    },
    // 查看会员全部订单
    toAllOrder() {
        if (!wx.getStorageSync('token')) {
            wx.showToast({
                icon: "none",
                title: '请先登录'
            });
            wx.removeStorageSync('wxInfo')
        } else {
            wx.navigateTo({
                url: '/pages/personal/order/index/index?sign=' + 'member',
            })
        }

    },
    // 普通
    toAllComOrder() {
        if (!wx.getStorageSync('token')) {
            wx.showToast({
                icon: "none",
                title: '请先登录'
            });
            wx.removeStorageSync('wxInfo')
        } else {
            wx.navigateTo({
                url: '/pages/personal/order/index/index?num=' + 0,
            })
        }

    },

    toPay(e) {
        console.log(e);
        var self = this;
        if (!wx.getStorageSync('token')) {
            wx.showToast({
                icon: "none",
                title: '请先登录'
            });
            wx.removeStorageSync('wxInfo')
        } else {
            wx.navigateTo({
                url: '../../personal/order/index/index?num=' + e.currentTarget.dataset.num,
            })
        }

    },
    toSend(e) {
        var self = this;
        if (!wx.getStorageSync('token')) {
            wx.showToast({
                icon: "none",
                title: '请先登录'
            });
            wx.removeStorageSync('wxInfo')
        } else {
            wx.navigateTo({
                url: '../../personal/order/index/index?num=' + e.currentTarget.dataset.num,
            })
        }

    },
    toCollect(e) {
        var self = this;
        if (!wx.getStorageSync('token')) {
            wx.showToast({
                icon: "none",
                title: '请先登录'
            });
            wx.removeStorageSync('wxInfo')
        } else {
            wx.navigateTo({
                url: '../../personal/order/index/index?num=' + e.currentTarget.dataset.num,
            })
        }

    },
    toDis(e) {
        var self = this;
        if (!wx.getStorageSync('token')) {
            wx.showToast({
                icon: "none",
                title: '请先登录'
            });
            wx.removeStorageSync('wxInfo')
        } else {
            wx.navigateTo({
                url: '../../personal/order/index/index?num=' + e.currentTarget.dataset.num,
            })
        }

    },
    toRefund(e) {},

    getComOrder() {
        var self = this;
        var param = {};
        var payArr = [];
        var sendArr = [];
        var collectArr = [];
        var disArr = [];
        wx.showLoading({
            title: '数据加载中...',
        })
        param = {
            token: wx.getStorageSync('token'),
            currentPage: self.data.page,
            perPage: self.data.limit,
        }
        orderAPI.orders(param).then(res => {
            console.log(res);
            if (res.data.length > 0) {
                res.data.forEach(item => {
                    if (item.status == 1) {
                        payArr.push(item)
                    } else if (item.status == 2) {
                        sendArr.push(item)
                    } else if (item.status == 3) {
                        collectArr.push(item)
                    } else if (item.status == 4) {
                        disArr.push(item)
                    }
                })
                self.setData({
                    payDot: payArr.length,
                    sendDot: sendArr.length,
                    collectDot: collectArr.length,
                    disDot: disArr.length
                })
            }
            wx.hideLoading()
        })
    },

    toWithdraw() {
        if (!wx.getStorageSync('token')) {
            wx.showToast({
                icon: "none",
                title: '请先登录'
            });
            wx.removeStorageSync('wxInfo')
        } else {
            wx.navigateTo({
                url: '/pages/personal/withdraw/withdraw'
            })
        }
    },
    // 下级会员
    toUnderling() {
        if (!wx.getStorageSync('token')) {
            wx.showToast({
                icon: "none",
                title: '请先登录'
            });
            wx.removeStorageSync('wxInfo')
        } else {
            wx.navigateTo({
                url: '/pages/personal/underling/underling'
            })
        }
    },
    // 佣金来源
    tosource() {
        if (!wx.getStorageSync('token')) {
            wx.showToast({
                icon: "none",
                title: '请先登录'
            });
            wx.removeStorageSync('wxInfo')
        } else {
            wx.navigateTo({
                url: '/pages/personal/commission-ource/commission-ource'
            })
        }
    },
})