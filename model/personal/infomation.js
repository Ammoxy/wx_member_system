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



module.exports = infomation;