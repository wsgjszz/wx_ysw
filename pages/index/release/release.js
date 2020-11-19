// pages/index/release/release.js
var http = require("../../../utils/http.js");
var area = require("../../../utils/area.js");
var util = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: '', //品种描述的值
    show: false, //是否显示弹出层
    time: '3', //选择的求购期限,3代表三天，7代表一周。30代表一个月
    contact: '', //联系人
    phone: '', //手机号
    area: '', //选中地区
    city: '', //选中城市
    province: '', //选择省份
    filePath: '', //提交表单中的文件路径
    fileList: [], //文件上传列表
    areaList: {}, //地区信息列表
    currentPage: true, //true代表急需买页面，false代表正在卖页面
  },
  //事件方法
  onClick(event) {
    this.setData({
      currentPage: !this.data.currentPage
    })
    this.clear()
  },
  //弹出层
  showPopup() {
    this.setData({
      show: true
    });
  },
  //品种描述的值改变
  onChange1(event) {
    // event.detail 为当前输入的值
    this.setData({
      message: event.detail
    })
  },
  //联系人的值改变
  onChange2(event) {
    // event.detail 为当前输入的值
    this.setData({
      contact: event.detail
    })
  },
  //电话的值改变
  onChange3(event) {
    // event.detail 为当前输入的值
    this.setData({
      phone: event.detail
    })
  },
  //选择地区取消
  onClose() {
    this.setData({
      show: false
    });
  },
  //选择地区提交
  onConfirm(event) {
    this.setData({
      show: false,
      province: event.detail.values[0].name,
      city: event.detail.values[1].name,
      area: event.detail.values[2].name,
    });
    console.log(event)
  },
  //求购期限的值改变事件
  onChangeTime(event) {
    this.setData({
      time: event.detail
    });
  },
  //文件上传事件
  afterRead(event) {
    const {file} = event.detail;
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

  /**
   * 发布急需买信息
   */
  release() {
    if (this.check()) {
      let userId = wx.getStorageSync('wxUserId')
      var upDate = util.formatTime(new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * Number(this.data.time)));
      if (userId) {
        var params = {
          url: '/trade/demand/miniApp',
          method: 'POST',
          data: {
            "area": this.data.area,
            "city": this.data.city,
            "contact": this.data.contact,
            "creatorId": userId,
            "limitTime": upDate,
            "phone": this.data.phone,
            "province": this.data.province,
            "remarks": "联系时请说明是在园商网上看到的，谢谢",
            "title": this.data.message
          },
          callBack: res => {
            console.log(res)
            wx.showToast({
              title: '提交成功',
            })
            this.clear()
          },
          errBack: res => {
            console.log(res)
            wx.showToast({
              title: '提交失败',
              icon: 'none'
            })
            this.clear()
          }
        }
        http.request(params)
      }
    }
  },
  /**
   * 发布正在卖信息
   */
  release2() {
    if (this.check()) {
      let userId = wx.getStorageSync('wxUserId')
      var upDate = util.formatTime(new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * Number(this.data.time)));
      if (userId) {
        var params = {
          url: '/trade/supply/miniApp',
          method: 'POST',
          data: {
            "area": this.data.area,
            "city": this.data.city,
            "contact": this.data.contact,
            "creatorId": userId,
            "picture": "string",
            "limitTime": upDate,
            "phone": this.data.phone,
            "province": this.data.province,
            "remarks": "联系时请说明是在园商网上看到的，谢谢",
            "title": this.data.message
          },
          callBack: res => {
            console.log(res)
            this.clear()
          },
          errBack: res => {
            console.log(res)
          }
        }
        http.request(params)
      }
    }
  },
  //表单检验
  check() {
    if (this.data.province && this.data.area && this.data.city && this.data.contact && this.data.message && this.data.phone) {
      if (!this.data.currentPage) {
        //当前是正在卖页面，需要校验文件路径
        if (this.data.filePath) {
          console.log('表单校验通过')
          return true;
        } else {
          wx.showToast({
            title: '请将信息填完整',
            icon: 'none'
          })
          console.log('正在卖页面表单校验不通过')
          return false;
        }
      } else {
        console.log('表单校验通过')
        return true;
      }
    } else {
      wx.showToast({
        title: '请将信息填完整',
        icon: 'none'
      })
      return false;
    }
  },
  //表单提交后把数据清空
  clear() {
    this.setData({
      message: '', //品种描述的值
      contact: '', //联系人
      phone: '', //手机号
      area: '', //选中地区
      city: '', //选中城市
      province: '', //选择省份
      fileList: [], //文件上传列表
      filePath: '', //提交表单中的文件路径
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      areaList: area.areaList
    })
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