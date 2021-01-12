var classify = require('../../model/classify/classify');

Page({
  data: {
    classifyData: [],
    num: 0,
    leftId: '',
    rightId: '',
    heightArr: []
  },

  onLoad() {
    this.getClassify();

  },

  getClassify() {
    var self = this;
    classify.classifyList().then(res => {
      self.setData({
        classifyData: res,
        leftId: 'left' + res[0].id,
        rightId: 'right' + res[0].id
      })
    })
  },
  nav(e) {
    console.log(e);
    var self = this;;
    self.setData({
      num: e.currentTarget.dataset.index,
      leftId: "left" + e.currentTarget.dataset.id,
      rightId: "right" + e.currentTarget.dataset.id
    })
    console.log(self.data.leftId);

  },

  onReady() {
    let self = this;
    setTimeout(() => {
      let initArr = [0]; // 初始数组
      let initNum = 0; // 初始数值
      const query = wx.createSelectorQuery()
      query.selectAll('.rightblock').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        console.log(res[0]);
        res[0].map(val => {
          initNum += val.height; // 实现高度的累加
          initArr.push(initNum) // 初始数值加进数组中
        })
        console.log(initArr); // 拿到每一个height  存起来
        self.setData({
          heightArr: initArr
        })
      })
    }, 300)
  },

  rightScrollTop(e) {
    var self = this;
    console.log(e);

    let st = e.detail.scrollTop;
    let myarr = self.data.heightArr;
    for (let i = 0; i < myarr.length; i++) {
      if (st >= myarr[i] && st < myarr[i + 1] - 10) {
        self.setData({
          leftId: "left" + i,
          num: i
        })
        return;
      }
    }
    console.log(self.data.heightArr);

  }

})