var api = require('../../api/index');

var car = {};

// 列表
car.cars = function (token) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.Cars, {
            token: token
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

// 新增
car.creationCar = function (data) {
    return new Promise((resolve, reject) => {
        api.post(api.baseUrl.host, api.url.CreationCar, data, function (response) {
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
car.delCar = function (token, goods) {
    return new Promise((resolve, reject) => {
        api.del(api.baseUrl.host, api.url.DelCar, {
            token: token,
            goods: goods
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

module.exports = car;