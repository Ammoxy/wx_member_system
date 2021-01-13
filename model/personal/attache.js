var api = require('../../api/index')

var attache = {};

// 新增
attache.register = function (data) {
    return new Promise((resolve, reject) => {
        api.post(api.baseUrl.host, api.url.CreationHealthUser, data, function (response) {
            if(response.code === 10000) {
                var res = response.result
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

// 详情
attache.healthDetail = function (token, user_id) {
  return new Promise((resolve, reject) => {
      api.get(api.baseUrl.host, api.url.HealthDetail, {
        token: token,
        user_id: user_id
      }, function (response) {
          if(response.code === 10000) {
              var res = response.result
              resolve(res);
          } else {
              reject(response);
          }
      })
  })
}

// 获取健康专员等级列表
attache.healthUser = function (token) {
  return new Promise((resolve, reject) => {
      api.get(api.baseUrl.host, api.url.HealthUser, {
        token: token
      }, function (response) {
          if(response.code === 10000) {
              var res = response.result
              resolve(res);
          } else {
              reject(response);
          }
      })
  })
}

// 部门列表
attache.merchantSelList = function (token) {
  return new Promise((resolve, reject) => {
      api.get(api.baseUrl.host, api.url.MerchantSelList, {
        token: token
      }, function (response) {
          if(response.code === 10000) {
              var res = response.result
              resolve(res);
          } else {
              reject(response);
          }
      })
  })
}

module.exports = attache;