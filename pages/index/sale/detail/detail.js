// pages/index/sale/detail/detail.js
var http = require("../../../../utils/http.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0, //当前页面的用户id
    info: {}, //当前页面的信息
    saleList: [], //当前用户其它正在卖的信息列表
    hasSale: false, //当前用户是否有其它正在卖的
  },

  /**
   * 根据id查询急需买信息
   */
  getInfo(id) {
    let userId = wx.getStorageSync('wxUserId')
    if (userId) {
      var params = {
        url: '/trade/supply/' + id,
        // url: '/trade/supply/14',
        method: 'GET',
        data: {},
        callBack: res => {
          console.log(res)
          this.setData({
            info: res.data
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
    this.setData({
      id: options.id
    })
    this.getInfo(options.id)
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