// pages/promotion/detail/detail.js
var http = require("../../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0, //当前页面的用户id
    info: {}, //当前页面的信息,
    recommend:[], //给当前用户的推荐信息列表
  },

  //前往详情页面
  toDetail(event){
    let id = event.currentTarget.dataset.id
    wx.redirectTo({
      url: './detail?id=' + id,
    })
  },
  /**
   * 根据id查询急需买信息
   */
  getInfo(id) {
    let userId = wx.getStorageSync('wxUserId')
    if (userId) {
      var params = {
        url: '/promotion/' + id,
        // url: '/promotion/161',
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
 * 根据id查询给用户推荐的低价促销信息
 */
  getRecommend(id) {
    let userId = wx.getStorageSync('wxUserId')
    if (userId) {
      //排序方法，使用随机数实现打乱数组顺序
      var randomNumber = function () {return 0.5 - Math.random()}
      var params = {
        // url: '/promotion/recommend/miniApp/' + id,
        url: '/promotion/recommend/miniApp/161',
        method: 'GET',
        data: {},
        callBack: res => {
          console.log(res)
          this.setData({
            recommend: res.data.sort(randomNumber).slice(0,4) //先将数组顺序打乱，数组太长，只取前4个
          })
          console.log(this.data.recommend)
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
    this.getRecommend(options.id)
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