// pages/home/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftId: "left0",
    rightId: "right0",
    lifeActiveNum: 0,
    heightArr: [],
    menuArr: [{
        "id": 0,
        "title": "人气Top",
        "subArr": [{
            "imgSrc": "../../icon/add.png",
            "imgDesc": "拿铁"
          },
          {
            "imgSrc": "../../icon/add.png",
            "imgDesc": "桃桃芝士红宝石"
          }
        ]
      },
      {
        "id": 1,
        "title": "大师咖啡",
        "subArr": [{
            "imgSrc": "../../icon/add.png",
            "imgDesc": "冲绳黑糖拿铁"
          }
        ]
      },
      {
        "id": 2,
        "title": "小鹿茶精选",
        "subArr": [{
            "imgSrc": "../../icon/add.png",
            "imgDesc": "标准美式"
          }
        ]
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let _this = this
    setTimeout(() => {
      let initArr = [0]; //初始数组
      let initNum = 0; //初始数值
      const query = wx.createSelectorQuery()
      query.selectAll('.rightblock').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        console.log(res[0]);
        res[0].map(val => {
          initNum += val.height; //实现高度的累加
          initArr.push(initNum) //初始数值加进数组中
        })
        console.log(initArr); //拿到每一个height  存起来
        _this.setData({
          heightArr: initArr
        })
      })
    }, 300)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  leftClick(e) {
    this.setData({
      lifeActiveNum: e.target.dataset.myid,
      leftId: "left" + e.target.dataset.myid,
      rightId: "right" + e.target.dataset.myid
    })
  },

  // 右边滚动事件
  rightScrollTop(e){
    let st=e.detail.scrollTop;
    let myarr=this.data.heightArr;
    for(let i=0;i<myarr.length;i++){
      if(st>=myarr[i]&&st<myarr[i+1]-10){
        this.setData({
          leftId:"left"+i,
          lifeActiveNum:i
        })
        return;
      }

    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})