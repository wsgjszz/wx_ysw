// pages/user/feedback/feedback.js
var http = require("../../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, //当前用户信息
    problemInfo: '', //问题描述
    type: '', //反馈问题类型
    //下拉菜单数据
    option: [{
        text: '问题类型',
        value: 0
      },
      {
        text: '性能问题',
        value: 1
      },
      {
        text: '功能建议',
        value: 2
      },
      {
        text: '使用遇到问题',
        value: 3
      },
      {
        text: '其它',
        value: 4
      },
    ],
    value: 0,
  },

  //下拉菜单选项值改变事件
  onChange(event) {
    if (event.detail != 0) {
      this.setData({
        type: this.data.option[event.detail].text
      })
    }
  },
  //问题描述的值改变事件
  onChange0(event) {
    this.setData({
      problemInfo: event.detail
    })
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
   * 提交反馈
   */
  submit() {
    if (this.check()) {
      let userId = wx.getStorageSync('wxUserId')
      if (userId) {
        var params = {
          url: '/feedback/miniApp',
          method: 'POST',
          data: {
            "creatorId": userId,
            "picture": this.data.userInfo.avatarUrl,
            "problemInfo": this.data.problemInfo,
            "type": this.data.type
          },
          callBack: res => {
            console.log(res)
            wx.showToast({
              title: '提交成功',
              success:res=>{
                wx.switchTab({
                  url: '../user',
                })
              }
            })
          },
          errBack: res => {
            console.log(res)
          }
        }
        http.request(params)
      }
    }
  },
  check() {
    if (this.data.type) {
      //问题类型不为空
      return true
    } else {
      wx.showToast({
        title: '请选择问题类型',
        icon: 'none'
      })
      return false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserInfo()
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