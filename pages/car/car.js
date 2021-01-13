// pages/car/car.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        total: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    choseShop() {
        
    },

    toSubtract() {
        var self = this;
        if (self.data.total > 1) {
            self.setData({
                total: self.data.total - 1
            })
        }
      
    },

    toAdd() {
        var self = this;
        console.log(111);
        
        self.setData({
            total: self.data.total + 1
        })
    },
  
})