// pages/garden/garden.js
var http = require("../../utils/http.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[], //优质苗圃信息
    current: 1, //当前页
    total: 0, //总页数
  },
  //前往详情页面
  toDetail(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: './detail/detail?id=' + id,
    })
  },
  //前往创建苗圃页面
  toCreate(event) {
    wx.navigateTo({
      url: './create/create' ,
    })
  },
  //分页事件
  handleChange({detail}) {
    const type = detail.type;
    if (type === 'next') {
      this.setData({
        current: this.data.current + 1
      });
      this.getNursery(this.data.current, 5)
    } else if (type === 'prev') {
      this.setData({
        current: this.data.current - 1
      });
      this.getNursery(this.data.current, 5)
    }
  },

  /**
   * 分页获取优质苗圃信息
   */
  getNursery(page,size){
    let userId=wx.getStorageSync('wxUserId')
    if(userId){
      if (page) {
        //如果page不为空的话
        page = '?pageNum=' + page
      } else {
        page = ''
      }
      if (size) {
        //如果size不为空的话
        size = '&pageSize=' + size
      } else {
        size = ''
      }
      var params = {
        url:'/nursery/nurseryList/miniApp'+page+size,
        method: 'GET',
        data: {},
        callBack:res=>{
          console.log(res)
          this.setData({
            list: res.data.items,
            total: res.data.totalPage
          })
        },
        errBack:res=>{
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
    this.getNursery(1,5)
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