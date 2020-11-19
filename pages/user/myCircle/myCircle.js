// pages/user/myCircle/myCircle.js
var http = require("../../../utils/http.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], //我的人脉圈信息
  },
  //前往详情页面
  toDetail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../circle/detail/detail?id=' + id,
    })
  },

  /**
   * 获取我的苗圃信息
   */
  getNursery() {
    let userId = wx.getStorageSync('wxUserId')
    if (userId) {
      var params = {
        url: '/mine/myCircle/miniApp/' + userId,
        method: 'GET',
        data: {},
        callBack: res => {
          console.log(res)
          this.setData({
            list: res.data
          })
        },
        errBack: res => {
          console.log(res)
        }
      }
      http.request(params)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNursery()
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