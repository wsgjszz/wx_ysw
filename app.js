//app.js
var http = require("utils/http.js");

App({
  onLaunch: function () {
    http.getOpenId();
    //确认用户是否授权登录，没有则跳转到登录界面
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
  globalData: {
    // 定义全局请求队列
    requestQueue: [],
    // 是否正在进行登陆
    isLanding: true,
    // 购物车商品数量
    totalCartCount: 0,
    //用户信息
    userInfo:{},
    //用户OpenId
    openId: ''
  }
})