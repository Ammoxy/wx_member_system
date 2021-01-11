var classify = require('../../model/classify/classify');

Page({
  data: {
    classifyDataLeft: [],
    classifyDataRight: [],
    num: 0,
  },

  onLoad() {
    this.getClassify();
  },

  getClassify() {
    var self = this;
    classify.classifyList().then(res => {
      self.setData({
        classifyDataLeft: res,
        classifyDataRight: res
      })
    })
  },
  nav(e) {
    console.log(e);
    var self = this;;
    self.setData({
      num: e.currentTarget.dataset.index
    })
  },
})