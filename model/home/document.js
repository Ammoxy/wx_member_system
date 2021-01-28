var api = require('../../api/index')
var doc = {}

// 获取资讯类型
doc.docType = function () {
  return new Promise((resolve, reject) => {
    api.get(api.baseUrl.host, api.url.DocType, {}, function (response) {
      if (response.code === 10000) {
        var res = response.result
        resolve(res);
      } else {
        reject(response);
      }
    })
  })
}


module.exports = doc;
