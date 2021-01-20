// pages/personal/order/index/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 0,

    },

    onLoad(option) {
        console.log(option);
        
        this.setData({
            current: Number(option.num)
        })

        console.log(this.data.current);
        
    },

    currentTag(e) {
        let self = this;
        self.setData({
            current: e.currentTarget.dataset.num,
        })
    },

  
})