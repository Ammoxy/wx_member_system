// pages/goods/goods-list/goods-list.js
var goods = require('../../../model/classify/goods');
var infomationAPI = require('../../../model/personal/infomation')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // paramData: {},
        page: 1,
        limit: 10,
        // classify_id: '',
        order: 'sort',
        type: 'asc',
        name: '',
        id: '',
        goodsList: [],
        detailId: '',
        user_id: '',
        user_type: '',
        current: 1,
        isSelected: false,
        showFoot: false,
        keyword: ''
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
            page: 1,
            goodsList: [],
            showFoot: false
        })
        if (e.currentTarget.dataset.num == 1) {
            self.setData({
                order: 'sort',
                type: 'asc'

            })
        } else if (e.currentTarget.dataset.num == 2) {
            if (self.data.isSelected) {
                self.setData({
                    order: 'sales',
                    type: 'desc'
                })
            } else {
                self.setData({
                    order: 'sales',
                    type: 'asc'
                })
            }

        } else if (e.currentTarget.dataset.num == 3) {
            if (self.data.isSelected) {
                self.setData({
                    order: 'price',
                    type: 'desc'

                })
            } else {
                self.setData({
                    order: 'price',
                    type: 'asc'
                })
            }

        } else if (e.currentTarget.dataset.num == 4) {
            self.setData({
                order: 'sort',
                type: 'asc',
                keyword: '',
                name: ''
            })
        }
        if (self.data.user_id != '') {
            self.getMemberGoodList()
        } else {
            self.getGoodList();
        }
    },

    // 普通商品
    getGoodList() {
        var self = this;
        wx.showLoading({
            title: '数据加载中...',
        })
        goods.goodsList(wx.getStorageSync('token'), self.data.page, self.data.limit, self.data.name, self.data.id, self.data.order, self.data.type).then(res => {
            self.setData({
                goodsList: self.data.goodsList.concat(res.data)
            })
            if (res.data.length == 0) {
                self.setData({
                    showFoot: true
                })
            }
            wx.hideLoading()
        })
    },
    // 会员商品
    getMemberGoodList() {
        var self = this;
        wx.showLoading({
            title: '数组加载中...',
        })
        goods.memberGoodsList(wx.getStorageSync('token'), self.data.page, self.data.limit, self.data.name, self.data.order, self.data.type).then(res => {
            self.setData({
                goodsList: self.data.goodsList.concat(res.data)
            })
            if (res.data.length == 0) {
                self.setData({
                    showFoot: true
                })
            }
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
            self.getMemberGoodList()
        } else {
            self.getGoodList();
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

    onReachBottom() {
        console.log('上拉')
        var self = this;
        var page = self.data.page + 1; //获取当前页数并+1
        self.setData({
            page: page, //更新当前页数
        })
        if (!self.data.showFoot) {
            if (self.data.user_id != '') {
                self.getMemberGoodList()
            } else {
                self.getGoodList();
            }
        }
    },

    searchName(e) {
        this.setData({
            keyword: e.detail.value
        })
    },

    toSearch() {
        let self = this;
        self.setData({
            page: 1,
            goodsList: [],
            showFoot: false,
            name: self.data.keyword
        })
        console.log(self.data.keyword);
        if (self.data.user_id != '') {
            self.getMemberGoodList()
        } else {
            self.getGoodList();
        }
    },
})