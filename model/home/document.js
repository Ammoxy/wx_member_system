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

// 获取资讯
doc.docList = function (document_type) {
  return new Promise((resolve, reject) => {
    api.get(api.baseUrl.host, api.url.DocList, {
      document_type: document_type
    }, function (response) {
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
