var api = require('../../api/index')
var banner = {};

// 获取轮播图
banner.banners = function () {
  return new Promise((resolve, reject) => {
    api.get(api.baseUrl.host, api.url.Banners, {}, function (response) {
      if (response.code === 10000) {
        var res = response.result
        resolve(res);
      } else {
        reject(response);
      }
    })
  })
}

module.exports = banner;