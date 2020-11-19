// pages/user/release/release.js
var http = require("../../../utils/http.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//已发布信息的数据列表
    userInfo:{}, //该用户信息
    id: '', //要执行删除操作的Id
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
    this.delRelease()

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

  /**
   * 删除该用户已发布的信息
   */
  delRelease(){
    let userId = wx.getStorageSync('wxUserId')
    let id = this.data.id
    if(userId){
      var params = {
        url: '/mine/deleteReleased/'+id,
        method: 'DELETE',
        data:{},
        callBack:res=>{
          console.log(res)
          this.getRelease()
        },
        errBack:res=>{
          console.log(res)
        }
      }
      http.request(params)
    }
  },
  /**
   * 获取该用户已发布的信息
   */
  getRelease(){
    let userId = wx.getStorageSync('wxUserId')
    if(userId){
      var params = {
        url: '/mine/getReleased/miniApp/'+userId,
        method: 'GET',
        data:{},
        callBack:res=>{
          console.log(res)
          this.setData({
            list:res.data
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
   * 获取用户信息
   */
  getUserInfo(){
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
    this.getRelease()
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