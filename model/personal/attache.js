var api = require('../../api/index')

var attache = {};

// 新增
attache.register = function (data) {
    return new Promise((resolve, reject) => {
        api.post(api.baseUrl.host, api.url.CreationHealthUser, data, function (response) {
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
attache.healthDetail = function (token, user_id) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.HealthDetail, {
            token: token,
            user_id: user_id
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

// 申请详情
attache.healthApplyDetail = function (token, user_id) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.HealthApplyDetail, {
            token: token,
            user_id: user_id
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

// 获取健康专员等级列表
attache.healthUser = function (token) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.HealthUser, {
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

// 部门列表
attache.merchantSelList = function (token, type) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.MerchantSelList, {
            token: token,
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

// 提现
attache.withdraw = function (token, money) {
    return new Promise((resolve, reject) => {
        api.post(api.baseUrl.host, api.url.Withdraw, {
            token: token,
            money: money
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

// 获取下级会员
attache.underlingUser = function (token, currentPage, perPage) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.UnderlingUser, {
            token: token,
            currentPage: currentPage,
            perPage: perPage
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

// 获取健康专员佣金来源
attache.commissionSource = function (token, currentPage, perPage) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.CommissionSource, {
            token: token,
            currentPage: currentPage,
            perPage: perPage
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

module.exports = attache;