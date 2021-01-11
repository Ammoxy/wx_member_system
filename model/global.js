var api = require('../api/index')
var global = {}
// 手机号登录
global.configs = function(version) {
    return new Promise((resolve, reject) => {
        api.get(api.baseUrl.host, api.url.Configs, {
            version: version
        }, function(response) {
            if(response.code === 10000) {
                var res = response.result
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

module.exports = global;