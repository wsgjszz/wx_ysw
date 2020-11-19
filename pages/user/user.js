// pages/user/user.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    wxUserId: 0,
    avatarUrl: ''
  },
  //前往登录页面
  toLogin(){
    wx.redirectTo({
      url: '../login/login',
    })
  },
  //注销用户
  toLogout(){
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('wxUserId')
    this.onLoad()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('wxUserId')){
      this.setData({
        wxUserId: wx.getStorageSync('wxUserId'),
        userInfo: wx.getStorageSync('userInfo')
      })
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('wxUserId')) {
      this.setData({
        wxUserId: wx.getStorageSync('wxUserId'),
        userInfo: wx.getStorageSync('userInfo')
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})