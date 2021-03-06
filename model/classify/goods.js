var api = require('../../api/index');
const tools = require('../../utils/tools');

var goods = {};

// 商品列表
goods.goodsList = function (currentPage, perPage, name, classify_id, order, type) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.GoodsList, {
            currentPage: currentPage,
            perPage: perPage,
            name: name,
            classify_id: classify_id,
            order: order,
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

// 详情
goods.goodDetail = function (id) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.GoodDetail, {
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
goods.memberGoodsList = function (token, currentPage, perPage, name, order, type) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.MemberGoodsList, {
            token: token,
            currentPage: currentPage,
            perPage: perPage,
            name: name,
            order: order,
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