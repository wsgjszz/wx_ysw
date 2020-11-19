// pages/user/stars/stars.js
var http = require("../../../utils/http.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],//已发布信息的数据列表
    userInfo: {}, //该用户信息
    id: '', //要执行删除操作的Id
    buyOrSale: false, //false代表是急需买页面，true代表是正在卖页面
    //组件数据
    visible: false,
    //小程序没有refs，所以只能用动态布尔值控制关闭
    toggle: false,
    actions: [{
      name: '删除',
      color: '#ed3f14'
    }],
  },
  //取消删除
  handleCancel() {
    this.setData({
      visible: false,
      toggle: this.data.toggle ? false : true
    });
  },
  //确认删除
  handleClickItem() {
    //赋值
    const action = [...this.data.actions];
    action[0].loading = true;
    this.setData({
      actions: action
    });

    console.log(this.data.id)
    this.delStar()

    //异步执行操作
    setTimeout(() => {
      action[0].loading = false;
      this.setData({
        visible: false,
        actions: action,
        toggle: this.data.toggle ? false : true
      });
    }, 800);
  },
  //点击删除按钮事件
  actionsTap(event) {
    this.setData({
      visible: true,
      id: event.currentTarget.dataset.id
    });
    console.log(event)
  },
  //前往详情页面
  toDetail(event) {
    let flag = event.currentTarget.dataset.buyorsale
    let id = event.currentTarget.dataset.id
    if(flag){
      //正在卖页面
      wx.navigateTo({
        url: '../../index/sale/detail/detail?id=' + id,
      })
    }else{
      //急需买页面
      wx.navigateTo({
        url: '../../index/buy/detail/detail?id=' + id,
      })
    }
  },

  /**
   * 取消收藏的信息
   */
  delStar() {
    let userId = wx.getStorageSync('wxUserId')
    let id = this.data.id
    if (userId) {
      var params = {
        url: '/trade/uncollection/'+userId+'/' + id,
        method: 'PUT',
        data: {},
        callBack: res => {
          console.log(res)
          this.getStars()
        },
        errBack: res => {
          console.log(res)
        }
      }
      http.request(params)
    }
  },
  /**
   * 获取该用户已收藏的信息
   */
  getStars() {
    let userId = wx.getStorageSync('wxUserId')
    if (userId) {
      var params = {
        url: '/mine/collectedList/miniApp/' + userId,
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
   * 获取用户信息
   */
  getUserInfo() {
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
        phone: wx.getStorageSync('userInfo').phone,
        nickName: wx.getStorageSync('userInfo').nickName,
        gender: wx.getStorageSync('userInfo').gender == 0 ? '0' : '1'
      })
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          });
          wx.setStorage({
            key: 'userInfo',
            data: res.userInfo,
          })
        }
      })
    }
    console.log(wx.getStorageSync('userInfo'))
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
    this.getStars()
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