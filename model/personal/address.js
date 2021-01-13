var api = require('../../api/index')

var address = {};

// 获取用户配送地址列表
address.addList = function (token) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.AddList, {
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
},
// 修改/新增
address.createAdd = function (data) {
    return new Promise((resolve, reject) => {
        api.post(api.baseUrl.host, api.url.CreateAdd, data, function (response) {
            if(response.code === 10000) {
                var res = response.result
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
},

// 删除
address.delAdd = function (token, id) {
    return new Promise((resolve, reject) => {
        api.del(api.baseUrl.host, api.url.DelAdd, {
            token: token,
            id: id
        }, function (response) {
            if(response.code === 10000) {
                var res = response.result
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
},

// 获取省市区
address.chinaAreas = function (token, type, parent_id) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.ChinaAreas, {
            token: token,
            type: type,
            parent_id: parent_id
        }, function (response) {
            if(response.code === 10000) {
                var res = response.result
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
},

module.exports = address;