const url = {
    'Login': '/login', // 手机号授权登录

    'UserInfo': '/user/info', // 获取/新增用户信息

    'AddList': '/shipping/info/list', // 获取用户配送地址列表
    'CreateAdd': '/user/shipping/info', // 新增用户收货地址
    'DelAdd': '/del/shipping/info', // 删除收货地址
    'ChinaAreas': '/china/areas', // 获取省市区

    'HealthUser': '/health/user', // 获取健康专员等级列表
    'CreationHealthUser': '/creation/health/user', // 提交健康专员申请
    'MerchantSelList': '/merchant/select/list', // 获取商家选择列表
    'HealthDetail': '/health/user/detail', // 获取健康专员详情
    'HealthApplyDetail': '/health/apply/detail', // 获取健康专员详情
    'Withdraw': '/withdraw', // 提现
    'UnderlingUser': '/underling/user', // 获取下级会员
    'CommissionSource': '/commission/source', // 获取健康专员佣金来源

    'ClassifyList': '/classify', // 获取分类列表
    'GoodsList': '/goods/list', // 获取商品列表
    'GoodDetail': '/good', // 获取商品详情
    'MemberGoodsList': '/goods/user/list', // 获取会员商品列表
    'MemberGoodDetail': '/user/good', // 获取会员商品详情

    'CreationCar': '/creation/cart', // 新增购物车
    'Cars': '/carts', // 获取购物车列表
    'DelCar': '/cart', // 删除购物车

    'UserOrder': '/creation/user/order', // 创建会员订单
    'CreationOrder': '/creation/order', // 创建订单
    'OrderPay': '/order/pay', // 订单支付
    'UserOrderList': '/user/orders', // 获取会员订单列表
    'Orders': '/orders', // 获取订单列表
    'CofimReceive': '/confirm/receive', // 确定收货
    'CancelOrder': '/cancel/order', // 取消订单

    'Banners': '/banner/list', // 获取轮播图列表
    'DocType': '/document/type/list', // 获取资讯类型列表
    'DocList': '/document/list', // 获取资讯

};

module.exports = url;