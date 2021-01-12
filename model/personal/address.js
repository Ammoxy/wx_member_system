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

// 新增用户收货地址
address.createAdd = function (token, province_id, city_id, district_id, address, name, phone, is_default) {
    return new Promise((resolve, reject) => {
        api.post(api.baseUrl.host, api.url.CreateAdd, {
            token: token,
            province_id: province_id,
            city_id: city_id,
            district_id: district_id,
            address: address,
            name: name,
            phone: phone,
            is_default: is_default
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

// 修改
address.amendAdd = function (token, province_id, city_id, district_id, address, name, phone, is_default, id) {
    return new Promise((resolve, reject) => {
        api.post(api.baseUrl.host, api.url.CreateAdd, {
            token: token,
            province_id: province_id,
            city_id: city_id,
            district_id: district_id,
            address: address,
            name: name,
            phone: phone,
            is_default: is_default,
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