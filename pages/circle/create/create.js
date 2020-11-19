// pages/circle/create/create.js
var http = require("../../../utils/http.js");
var area = require("../../../utils/area.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selfIntroduction: '', //自我介绍
    name: '', //姓名
    phone: '', //联系电话
    area: '', //选中地区
    city: '', //选中城市
    province: '', //选择省份
    filePath: '', //提交表单中的文件路径
    areaList: {}, //地区信息列表
    fileList: [], //文件上传列表
    show: false, //是否显示弹出层
  },

  //姓名的值改变
  onChange1(event) {
    this.setData({
      name: event.detail
    })
  },
  //电话的值改变
  onChange2(event) {
    this.setData({
      phone: event.detail
    })
  },
  //自我介绍的值改变
  onChange3(event) {
    this.setData({
      selfIntroduction: event.detail
    })
  },
  //弹出层
  showPopup() {
    this.setData({
      show: true
    });
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
        console.log('上传成功')
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
  toCircle() {
    wx.switchTab({
      url: '/pages/circle/circle',
    })
  },

  /**
   * 加入人脉圈
   */
  create() {
    if (this.check()) {
      let userId = wx.getStorageSync('wxUserId')
      if (userId) {
        var params = {
          url: '/circle/miniApp',
          method: 'POST',
          data: {
            "province": this.data.province,
            "city": this.data.city,
            "area": this.data.area,
            "address": this.data.province + this.data.city+this.data.area,
            "creatorId": userId,
            "name": this.data.name,
            "phone": this.data.phone,
            "picture": this.data.filePath,
            "selfIntroduction": this.data.selfIntroduction
          },
          callBack: res => {
            console.log(res)
            wx.showToast({
              title: '创建成功',
              duration: 500,
              success: res => {
                this.toCircle()
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
    let name = this.data.name
    if (this.data.name && this.data.phone && this.data.selfIntroduction && this.data.province && this.data.city && this.data.area && this.data.filePath) {
      console.log('表单校验通过')
      return true;
    } else {
      wx.showToast({
        title: '请将信息填完整',
        icon: 'none'
      })
      console.log('表单校验不通过')
      this.setData({
        test: true
      })
      return false;
    }
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