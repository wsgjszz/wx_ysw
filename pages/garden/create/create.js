// pages/garden/create/create.js
var http = require("../../../utils/http.js");
var util = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    description: '', //苗圃品种描述的值
    title: '', //基地名称的值
    address: '', //基地地址的值
    resp: '', //联系人
    telephone: '', //联系电话
    filePath: '', //提交表单中的文件路径
    fileList: [], //文件上传列表
    show: false, //是否显示弹出层
  },

  //苗圃简介的值改变
  onChange0(event) {
    this.setData({
      description: event.detail
    })
  },
  //基地名称的值改变
  onChange1(event) {
    this.setData({
      title: event.detail
    })
  },
  //基地地址的值改变
  onChange2(event) {
    this.setData({
      address: event.detail
    })
  },
  //联系人的值改变
  onChange3(event) {
    this.setData({
      resp: event.detail
    })
  },
  //联系电话的值改变
  onChange4(event) {
    this.setData({
      telephone: event.detail
    })
  },
  //文件上传事件
  afterRead(event) {
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    this.setData({
      fileList: [{
        url: file.path,
        name: '图片',
        statue: 'uploading',
        message: '上传中'
      }]
    })
    wx.uploadFile({
      url: 'https://www.yyy888.wang/api/upload/image',
      filePath: file.path,
      name: 'file',
      formData: {},
      success: res => {
        console.log(res)
        if (res.statusCode == 200) {
          this.data.filePath = this.data.fileList[0].url
        } else {
          this.setData({
            fileList: []
          })
        }
      },
      error: err => {
        console.log('上传失败')
        cons.log(err)
        this.setData({
          fileList: []
        })
      }
    });
  },
  //前往优质苗圃页面
  toGarden() {
    wx.switchTab({
      url: '/pages/garden/garden',
    })
  },

  /**
   * 创建苗圃
   */
  create() {
    if (this.check()) {
      let userId = wx.getStorageSync('wxUserId')
      if (userId) {
        var params = {
          url: '/nursery/addNursery/miniApp/' + userId,
          method: 'POST',
          data: {
            "address": this.data.address,
            "description": this.data.description,
            "picture": this.data.filePath,
            "resp": this.data.resp,
            "telephone": this.data.telephone,
            "title": this.data.title
          },
          callBack: res => {
            console.log(res)
            wx.showToast({
              title: '创建成功',
              success:res=>{
                this.toGarden()
              }
            })
          },
          errBack: res => {
            console.log(res)
            wx.showToast({
              title: '提交失败',
              icon: 'none'
            })
          }
        }
        http.request(params)
      }
    }
  },
  //表单检验
  check() {
    if (this.data.description && this.data.title && this.data.address && this.data.resp && this.data.telephone && this.data.filePath) {
      console.log('表单校验通过')
      return true;
    } else {
      wx.showToast({
        title: '请将信息填完整',
        icon: 'none'
      })
      console.log('表单校验不通过')
      return false;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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