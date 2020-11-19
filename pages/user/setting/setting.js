// pages/user/setting/setting.js
var http = require("../../../utils/http.js");
var area = require("../../../utils/area.js");
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '', //用户名
    gender: '', //性别选项
    phone: 0, //手机号码
    code: 0, //验证码
    time: 60, //等待时间，默认60s
    userInfo: {}, //用户信息
    waiting: false, //发送验证码后，是否等待
    setInterval: '', //定时器，用于计算验证码等候时间
  },
  //vant组件方法
  onChange(event) {
    this.setData({
      gender: event.detail
    });
  },
  //账户昵称
  onChange1(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      nickName: event.detail
    })
    console.log(this.data.nickName)
  },
  //手机
  onChange2(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      phone: event.detail
    })
    console.log(this.data.phone)
  },
  //验证码
  onChange3(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      code: event.detail
    })
    console.log(this.data.code)
  },

  //发送验证码
  sendCode() {
    let userId = wx.getStorageSync('wxUserId')
    if (userId) {
      var params = {
        url: '/wx/sendCode/' + this.data.phone + '/' + userId,
        method: 'POST',
        data: {},
        callBack: res => {
          console.log(res)
          console.log('发送验证码成功')
          this.setData({
            waiting: true
          })
          let that = this;
          this.data.setInterval = setInterval(function() {
            let times = that.data.time - 1;
            if (times < 0) {
              clearInterval(that.data.setInterval)
              that.setData({
                time: 60,
                waiting: false
              })
            } else {
              that.setData({
                time: times
              })
            }
          }, 1000)
        },
        errBack: res => {
          console.log(res)
        }
      }
    }
    http.request(params)
  },
  /**
   * 保存用户信息
   */
  save() {
    let userId = wx.getStorageSync('wxUserId')
    wx.showLoading({
      title: '保存中',
    })
    if (userId) {
      var code = this.data.code;
      var gender = this.data.gender;
      var phone = this.data.phone;
      var nickName = this.data.nickName;
      var params = {
        url: '/mine/updateWxUser/'+userId+'?code='+code+'&gender='+gender+'&phone='+gender+'&nickname='+nickName,
        method: 'POST',
        data: {
          "code": this.data.code,
          "gender": this.data.gender,
          "phone": this.data.phone,
          "nickname": this.data.nickName
        },
        callBack: res => {
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: '保存成功',
            success: res => {
              wx.switchTab({
                url: '../user',
              })
            }
          })
        },
        errBack: res => {
          console.log(res)
          wx.hideLoading()
        }
      }
      http.request(params)
    }
  },

  /**
* 从服务端获取登录的用户Id
*/
  login: function (userInfo) {
    var params = {
      url: "/wx/login",
      method: "POST",
      data: {
        "avatarUrl": userInfo.avatarUrl,
        "city": userInfo.city,
        "country": userInfo.country,
        "gender": userInfo.gender,
        "language": userInfo.language,
        "nickName": userInfo.nickName,
        "openId": app.globalData.openId,
        "province": userInfo.province
      },
      callBack: res => {
        console.log(res)
        app.globalData.wxUserId = res.data.wxUserId
        this.setData({
            userInfo: res.data,
            gender: res.data.gender+''
        })
        wx.setStorage({
          key: 'wxUserId',
          data: res.data.wxUserId,
        })
        wx.setStorage({
          key: 'userInfo',
          data: res.data,
        })
      },
      errBack: res => {
        console.log(res)
      }
    }
    http.request(params);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.login(wx.getStorageSync('userInfo'))
    console.log(this.data.userInfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})