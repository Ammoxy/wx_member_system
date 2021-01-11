var api = require('../../api/index')

var infomation = {};

// 新增/修改个人信息
infomation.register = function (token, name, phone, type, weight, stature, profession, sex, age) {
    return new Promise((resolve, reject) => {
        api.post(api.baseUrl.host, api.url.UserInfo, {
            token: token,
            name: name,
            phone: phone,
            type: type,
            weight: weight,
            weight: weight,
            stature: stature,
            profession: profession,
            sex: sex,
            age: age,
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

// 获取个人信息
infomation.userInfo = function (token) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.UserInfo, {
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

infomation.user = function (token, type, address_id, address, room_id) {
    return new Promise((resolve, reject) => {
        api.post(api.baseUrl.host, api.url.Household, {
            token: token,
            type: type,
            address_id: address_id,
            address: address,
            room_id: room_id
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

// 获取身份信息
infomation.idenInfo = function (token, page, limit) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.MyHouseholds, {
            token: token,
            page: page,
            limit: limit
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
infomation.children = function (token, href, name, sex, address_id, address, room_id, card_number, phone, number_type) {
    return new Promise((resolve, reject) => {
        api.post(api.baseUrl.host, api.url.Child, {
            token: token,
            href: href,
            name: name,
            sex: sex,
            address_id: address_id,
            address: address,
            room_id: room_id,
            card_number: card_number,
            phone: phone,
            number_type: number_type
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
// 获取审核列表
infomation.auditList = function (page, limit, token, address_id, type1, type2) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.Households, {
            page: page,
            limit: limit,
            token: token,
            address_id: address_id,
            type1: type1,
            type2: type2
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

infomation.search = function (page, limit, token, address_id, type1, type2, name) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.Households, {
            page: page,
            limit: limit,
            token: token,
            address_id: address_id,
            type1: type1,
            type2: type2,
            name: name
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

// 审核租客/物业
infomation.audit = function (token, id, state, type, self) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.CheckHousehold, {
            token: token,
            id: id,
            state: state,
            type: type,
            self: self
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

module.exports = infomation;