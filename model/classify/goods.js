var api = require('../../api/index');
const tools = require('../../utils/tools');

var goods = {};

// 商品列表
goods.goodsList = function (data) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.GoodsList, data, function (response) {
            if (response.code === 10000) {
                var res = response.result
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

// 详情
goods.goodDetail = function (token, id) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.GoodDetail, {
            token: token,
            id: id
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

// 商品会员列表
goods.memberGoodsList = function (data) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.MemberGoodsList, data, function (response) {
            if (response.code === 10000) {
                var res = response.result
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

// 会员详情
goods.memberGoodDetail = function (token, id) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.MemberGoodDetail, {
            token: token,
            id: id
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


module.exports = goods;