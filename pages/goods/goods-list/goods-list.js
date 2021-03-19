// pages/goods/goods-list/goods-list.js
var goods = require('../../../model/classify/goods');
var infomationAPI = require('../../../model/personal/infomation')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        paramData: {},
        page: 1,
        limit: 10,
        id: '',
        goodsList: [],
        detailId: '',
        user_id: '',
        user_type: '',
        current: 1,
        isSelected: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.scene) {
            console.log('扫码', options.scene);
            this.setData({
                user_id: options.scene
            })
        }
        this.setData({
            id: options.id,
        })
        this.getList();
        this.getInfo()
    },

    currentTag(e) {
        let self = this;
        self.setData({
            current: e.currentTarget.dataset.num,
            isSelected: !e.currentTarget.dataset.selected,
        })
        if (e.currentTarget.dataset.num == 1) {
            if (self.data.isSelected) {
                self.setData({
                    paramData: {
                        token: wx.getStorageSync('token'),
                        currentPage: self.data.page,
                        perPage: self.data.limit,
                        order: 'sort',
                        type: 'asc'
                    }
                })
            } else {
                self.setData({
                    paramData: {
                        token: wx.getStorageSync('token'),
                        currentPage: self.data.page,
                        perPage: self.data.limit,
                        order: 'sort',
                        type: 'desc'
                    }
                })
            }
        } else if (e.currentTarget.dataset.num == 2) {
            if (self.data.isSelected) {
                self.setData({
                    paramData: {
                        token: wx.getStorageSync('token'),
                        currentPage: self.data.page,
                        perPage: self.data.limit,
                        order: 'sales',
                        type: 'desc'
                    }
                })
            } else {
                self.setData({
                    paramData: {
                        token: wx.getStorageSync('token'),
                        currentPage: self.data.page,
                        perPage: self.data.limit,
                        order: 'sales',
                        type: 'asc'
                    }
                })
            }

        } else if (e.currentTarget.dataset.num == 3) {
            if (self.data.isSelected) {
                self.setData({
                    paramData: {
                        token: wx.getStorageSync('token'),
                        currentPage: self.data.page,
                        perPage: self.data.limit,
                        order: 'price',
                        type: 'desc'
                    }
                })
            } else {
                self.setData({
                    paramData: {
                        token: wx.getStorageSync('token'),
                        currentPage: self.data.page,
                        perPage: self.data.limit,
                        order: 'price',
                        type: 'asc'
                    }
                })
            }

        } else if (e.currentTarget.dataset.num == 4) {
            if (self.data.isSelected) {
                self.setData({
                    paramData: {
                        token: wx.getStorageSync('token'),
                        currentPage: self.data.page,
                        perPage: self.data.limit,
                        type: 'desc'
                    }
                })
            } else {
                self.setData({
                    paramData: {
                        token: wx.getStorageSync('token'),
                        currentPage: self.data.page,
                        perPage: self.data.limit,
                        type: 'asc'
                    }
                })
            }
        }
        if (self.data.user_id != '') {
            self.getMemberGoodList(self.data.paramData)
        } else {
            self.getGoodList(self.data.paramData);
        }
    },

    // 普通商品
    getGoodList(val) {
        var self = this;
        wx.showLoading({
            title: '数据加载中...',
        })
        goods.goodsList(val).then(res => {
            self.setData({
                goodsList: res.data
            })
            wx.hideLoading()
        })
    },
    // 会员商品
    getMemberGoodList(val) {
        var self = this;
        wx.showLoading({
            title: '数组加载中...',
        })
        goods.memberGoodsList(val).then(res => {
            self.setData({
                goodsList: res.data
            })
            wx.hideLoading()
        })
    },
    // 商品数据
    getList() {
        var self = this;
        self.setData({
            paramData: {
                token: wx.getStorageSync('token'),
                currentPage: self.data.page,
                perPage: self.data.limit,
            }
        })
        if (self.data.user_id != '') {
            self.getMemberGoodList(self.data.paramData)
        } else {
            self.getGoodList(self.data.paramData);
        }
    },

    toDetail(e) {
        console.log(e);
        var self = this;
        self.setData({
            detailId: e.currentTarget.dataset.id
        })

        wx.navigateTo({
            url: '../detail/detail?id=' + self.data.detailId + '&user_type=' + self.data.user_type + '&user_id=' + self.data.user_id,
        })
    },

    getInfo() {
        var self = this;
        infomationAPI.userInfo(wx.getStorageSync('token')).then(res => {
            console.log(res);
            if (res.user_id) {
                self.setData({
                    user_type: res.type
                })
            }
        })
    },
})