// pages/index/index.js
const app = getApp()
var http = require("../../utils/http.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[]
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
  //前往急需买界面
  toBuyPage(){
    wx.navigateTo({
      url: './buy/buy',
    })
  },
  //前往正在卖界面
  toSalePage() {
    wx.navigateTo({
      url: './sale/sale',
    })
  },
  //前往免费发布界面
  toReleasePage() {
    wx.navigateTo({
      url: './release/release',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('首页加载了')
    var params = {
      url: "/wx/banner",
      method: "GET",
      data: {},
      callBack: res => {
        this.setData({
          banner: res.data
        })
        console.log(res)
        console.log('openId:' + wx.getStorageSync('openId'))
      },
      errCallBack: res => {
        console.log(res)
      }
    };
    http.request(params);
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
    console.log(this.getTabBar())
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