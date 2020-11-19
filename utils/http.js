var config = require("config.js");
var domain = config.domain;

//统一的网络请求方法
function request(params, isLogin) {
  // 全局变量
  var globalData = getApp().globalData;
  // 如果正在进行登陆，就将非登陆请求放在队列中等待登陆完毕后进行调用
  if (!isLogin && globalData.isLanding) {
    globalData.requestQueue.push(params);
    return;
  }

  wx.request({
    url: config.domain + params.url, //接口请求地址
    data: params.data,
    header: {
      // 'content-type': params.method == "GET" ? 'application/x-www-form-urlencoded' : 'application/json;charset=utf-8',
      // 'Authorization': params.login ? undefined : wx.getStorageSync('token')
    },
    method: params.method == undefined ? "POST" : params.method,
    dataType: 'json',
    responseType: params.responseType == undefined ? 'text' : params.responseType,
    success: function(res) {
      console.log('request成功')
      if (res.statusCode == 200) {
        //如果有定义了params.callBack，则调用 params.callBack(res.data)
        if (params.callBack) {
          params.callBack(res.data);
        }

      } else if (res.statusCode == 500) {
        wx.showToast({
          title: "服务器出了点小差",
          icon: "none"
        });
      } else if (res.statusCode == 401) {
        // 添加到请求队列
        globalData.requestQueue.push(params);
        // 是否正在登陆
        if (!globalData.isLanding) {
          globalData.isLanding = true
          //重新获取openId,再次请求接口
          getOpenId();
        }
      } else if (res.statusCode == 400) {
        wx.showToast({
          title: res.data,
          icon: "none"
        })

      } else {
        //如果有定义了params.errCallBack，则调用 params.errCallBack(res.data)
        if (params.errCallBack) {
          params.errCallBack(res);
        }
      }
      if (!globalData.isLanding) {
        wx.hideLoading();
      }
    },
    fail: function(err) {
      console.log('request失败')
      wx.hideLoading();
      wx.showToast({
        title: "服务器出了点小差",
        icon: "none"
      });
    }
  })
}

//通过code获取openId,并保存到缓存
var getOpenId = function () {
  wx.login({
    success: res => {
      console.log('code:' + res.code)
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      request({
        login: true,
        url: '/wx/getOpenId',
        method: "GET",
        data: {
          code: res.code
        },
        callBack: result => {
          console.log('请求获取OpenId成功:'+result.data)
          // 没有获取到用户昵称，说明服务器没有保存用户的昵称，也就是用户授权的信息并没有传到服务器
          // if (!result.nickName) {
          //   updateUserInfo();
          // }
          if (result.code == 50000) {
            wx.showModal({
              showCancel: false,
              title: '提示',
              content: '服务器忙碌'
            })
            wx.setStorageSync('openId', '');
          } else {
            //把openId存入缓存，请求接口数据时要用
            wx.setStorageSync('openId', result.data);
            //把openId存入全局变量，请求接口数据时使用
            var globalData = getApp().globalData;
            globalData.openId = result.data;
          }
          var globalData = getApp().globalData;
          globalData.isLanding = false;
          while (globalData.requestQueue.length) {
            request(globalData.requestQueue.pop());
          }
        }
      }, true)
    }
  })
}

//暴露接口
exports.request = request;
exports.getOpenId = getOpenId;