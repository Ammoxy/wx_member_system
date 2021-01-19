// pages/personal/order/index/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 1,

    },

    currentTag(e) {
        let self = this;
        self.setData({
            current: e.currentTarget.dataset.num,
        })
    },

  
})