var api = require('../../api/index');

var orderAPI = {};

// 列表会员
orderAPI.userOrderList = function (token) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.UserOrderList, {
            token: token,
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
// 普通订单
orderAPI.orders = function (data) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.Orders, data, function (response) {
            if (response.code === 10000) {
                var res = response.result
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

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

// 支付
orderAPI.orderPay = function (token, order_id, type) {
    return new Promise((resolve, reject) => {
        api.post(api.baseUrl.host, api.url.OrderPay, {
            token: token,
            order_id: order_id,
            type: type
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

// 取消订单
orderAPI.cancelOrder = function (token, order_id, type) {
    return new Promise((resolve, reject) => {
        api.post(api.baseUrl.host, api.url.CancelOrder, {
            token: token,
            order_id: order_id,
            type: type
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

// 收货
orderAPI.cofimReceive = function (token, order_id, type) {
    return new Promise((resolve, reject) => {
        api.post(api.baseUrl.host, api.url.CofimReceive, {
            token: token,
            order_id: order_id,
            type: type
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