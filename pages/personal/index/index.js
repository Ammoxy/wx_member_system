let app = getApp();
let user = require('../../../model/user');
var infomation = require('../../../model/personal/infomation')

Page({

    data: {
        isAuthorization: false,
        userInfo: null,
        qrCode: '/icon/qrcode.jpg',
        wxInfo: null,
        type: '',
        user_id: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (wx.getStorageSync('token')) {
            this.getInfo() 
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
                                console.log(111, response.info.avatarUrl);
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
            wx.navigateTo({
                url: '/pages/personal/attache/attache?health_user=' + JSON.stringify(this.data.userInfo) + '&user_id=' + this.data.user_id,
            })
        }
        console.log(JSON.stringify(null));
        
    },

    getInfo() {
        var self = this;
        infomation.userInfo(wx.getStorageSync('token')).then(res => {
            console.log(res);
            if (res) {
                self.setData({
                    userInfo: res,
                    type: res.type,
                    user_id: res.user_id
                })
            }
        })
    },

})