// pages/goods/goods-list/goods-list.js
var goods = require('../../../model/classify/goods');
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
        user_id: 2,
        user_type: '',
        sortList: [{
                value: 0,
                name: '顺序'
            },
            {
                value: 1,
                name: '倒序'
            }
        ],
        current: 1,
        isSelected: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            id: options.id,
            user_type: app.globalData.userType
        })
        this.getList();

    },

    currentTag(e) {
        let self = this;
        console.log(e);
        
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
                        type: 'asc'
                    }
                })
            } else {
                self.setData({
                    paramData: {
                        token: wx.getStorageSync('token'),
                        currentPage: self.data.page,
                        perPage: self.data.limit,
                        order: 'sales',
                        type: 'desc'
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
                        type: 'asc'
                    }
                })
            } else {
                self.setData({
                    paramData: {
                        token: wx.getStorageSync('token'),
                        currentPage: self.data.page,
                        perPage: self.data.limit,
                        order: 'price',
                        type: 'desc'
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
                        type: 'asc'
                    }
                })
            } else {
                self.setData({
                    paramData: {
                        token: wx.getStorageSync('token'),
                        currentPage: self.data.page,
                        perPage: self.data.limit,
                        type: 'desc'
                    }
                })
            }
        }

        if (self.data.user_id == 1) {
            self.getMemberGoodList(self.data.paramData)
        } else {
            self.getGoodList(self.data.paramData);
        }
    },

    getGoodList(val) {
        var self = this;
        wx.showLoading({
            title: '数组加载中...',
        })
        goods.goodsList(val).then(res => {
            self.setData({
                goodsList: res.data
            })
            wx.hideLoading()
        })
    },
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

    getList() {
        var self = this;
        self.setData({
            paramData: {
                token: wx.getStorageSync('token'),
                currentPage: self.data.page,
                perPage: self.data.limit,
            }
        })
        if (self.data.user_id == 1) {
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
            url: '../detail/detail?id=' + self.data.detailId,
        })
    },

    sortChange(e) {
        console.log(e);
        var self = this;
        if (e.detail.value == 0) {
            if (self.data.user_id == 1) {
                self.setData({
                    paramData: {
                        token: wx.getStorageSync('token'),
                        currentPage: self.data.page,
                        perPage: self.data.limit,
                        type: 'asc'
                    }
                })
                self.getMemberGoodList(self.data.paramData)
            } else {
                self.setData({
                    paramData: {
                        token: wx.getStorageSync('token'),
                        currentPage: self.data.page,
                        perPage: self.data.limit,
                        type: 'asc'
                    }
                })
                self.getGoodList(self.data.paramData);
            }
        } else if (e.detail.value == 1) {
            if (self.data.user_id == 1) {
                self.setData({
                    paramData: {
                        token: wx.getStorageSync('token'),
                        currentPage: self.data.page,
                        perPage: self.data.limit,
                        type: 'desc'
                    }
                })
                self.getMemberGoodList(self.data.paramData)
            } else {
                self.setData({
                    paramData: {
                        token: wx.getStorageSync('token'),
                        currentPage: self.data.page,
                        perPage: self.data.limit,
                        type: 'desc'
                    }
                })
                self.getGoodList(self.data.paramData);
            }
        }
    },

    synthesize() {
        var self = this;
        self.setData({
            paramData: {
                token: wx.getStorageSync('token'),
                currentPage: self.data.page,
                perPage: self.data.limit,
                order: 'sort'
            }
        })
        if (self.data.user_id == 1) {
            self.getMemberGoodList(self.data.paramData)
        } else {
            self.getGoodList(self.data.paramData);
        }
    },
    toSales() {
        var self = this;
        self.setData({
            paramData: {
                token: wx.getStorageSync('token'),
                currentPage: self.data.page,
                perPage: self.data.limit,
                order: 'sales'
            }
        })
        if (self.data.user_id == 1) {
            self.getMemberGoodList(self.data.paramData)
        } else {
            self.getGoodList(self.data.paramData);
        }
    },
    toPrice() {
        var self = this;
        self.setData({
            paramData: {
                token: wx.getStorageSync('token'),
                currentPage: self.data.page,
                perPage: self.data.limit,
                order: 'price'
            }
        })
        if (self.data.user_id == 1) {
            self.getMemberGoodList(self.data.paramData)
        } else {
            self.getGoodList(self.data.paramData);
        }
    },
})