var api = require('../../api/index');

var orderAPI = {};

// 列表
// orderAPI.cars = function (token) {
//     return new Promise((resolve, reject) => {
//         api.get(api.baseUrl.host, api.url.Cars, {
//             token: token
//         }, function (response) {
//             if (response.code === 10000) {
//                 var res = response.result
//                 resolve(res);
//             } else {
//                 reject(response);
//             }
//         })
//     })
// }

// 新增会员订单
orderAPI.userOrder = function (data) {
    return new Promise((resolve, reject) => {
        api.post(api.baseUrl.host, api.url.UserOrder, data, function (response) {
            if (response.code === 10000) {
                var res = response.result
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

// 新增订单
orderAPI.creationOrder = function (data) {
  return new Promise((resolve, reject) => {
      api.post(api.baseUrl.host, api.url.CreationOrder, data, function (response) {
          if (response.code === 10000) {
              var res = response.result
              resolve(res);
          } else {
              reject(response);
          }
      })
  })
}

// 删除
// orderAPI.delCar = function (token, goods) {
//     return new Promise((resolve, reject) => {
//         api.del(api.baseUrl.host, api.url.DelCar, {
//             token: token,
//             goods: goods
//         }, function (response) {
//             if (response.code === 10000) {
//                 var res = response.result
//                 resolve(res);
//             } else {
//                 reject(response);
//             }
//         })
//     })
// }

module.exports = orderAPI;