var api = require('../../api/index')

var classify = {};

// 分类列表
classify.classifyList = function () {
  return new Promise((resolve, reject) => {
      api.get(api.baseUrl.host, api.url.ClassifyList, {}, function (response) {
          if(response.code === 10000) {
              var res = response.result
              resolve(res);
          } else {
              reject(response);
          }
      })
  })
}

module.exports = classify;
