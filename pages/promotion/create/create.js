// pages/promotion/create/create.js
var http = require("../../../utils/http.js");
var area = require("../../../utils/area.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '', //品种名称
    stock: '', //库存量
    price: '', //售价
    contact: '', //联系人
    phone: '', //联系电话
    source: '', //商品来源
    bz: '', //备注信息
    area: '', //选中地区
    city: '', //选中城市
    province: '', //选择省份
    filePath: '', //提交表单中的文件路径
    desc: '', //品种规格
    desc1: '', //品种规格中的冠幅
    desc2: '', //品种规格中的高度
    desc3: '', //品种规格中的地径
    desc4: '', //品种规格中的胸径
    desc5: '', //品种规格中的其它
    cid: 0, //分类id
    categoryList:[],//分类列表
    areaList: {}, //地区信息列表
    fileList: [], //文件上传列表
    show: false, //是否显示弹出层
    option: [
      { text: '产品分类', value: 0 },
    ], //下拉菜单实际使用的
    options: [
      { text: '产品分类', value: 0 },
    ],//为了赋值使用的
    value: 0, //初始下拉菜单选中的值
  },

  //下拉菜单选项值改变事件，即产品分类
  onChange(event) {
    this.setData({
      cid:event.detail
    })
  },
  //品种名称的值改变
  onChange1(event) {
    this.setData({
      title: event.detail
    })
  },
  //库存量的值改变
  onChange2(event) {
    this.setData({
      stock: event.detail
    })
  },
  //售价的值改变
  onChange3(event) {
    this.setData({
      price: event.detail
    })
  },
  //联系人的值改变
  onChange4(event) {
    this.setData({
      contact: event.detail
    })
  },
  //联系电话的值改变
  onChange5(event) {
    this.setData({
      phone: event.detail
    })
  },
  //品种规格的冠幅的值改变
  onChange6(event) {
    this.setData({
      desc1: event.detail
    })
  },
  //品种规格的高度的值改变
  onChange7(event) {
    this.setData({
      desc2: event.detail
    })
  },
  //品种规格的地径的值改变
  onChange8(event) {
    this.setData({
      desc3: event.detail
    })
  },
  //品种规格的胸径的值改变
  onChange9(event) {
    this.setData({
      desc4: event.detail
    })
  },
  //品种规格的其它的值改变
  onChange10(event) {
    this.setData({
      desc5: event.detail
    })
  },
  //商品来源的值改变
  onChange11(event) {
    this.setData({
      source: event.detail
    })
  },
  //备注信息的值改变
  onChange12(event) {
    this.setData({
      bz: event.detail
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
  //前往低价促销页面
  toCircle() {
    wx.switchTab({
      url: '/pages/promotion/promotion',
    })
  },
  //将获取到的分类列表信息赋值到菜单选项中
  setCategory(){
    let categoryList = this.data.categoryList
    let options = this.data.options
    for (var i in categoryList){
      let option = {}
      option['text'] = categoryList[i].categoryName
      option['value'] = categoryList[i].id
      options.push(option)
    }
    // 这里有个bug要注意，直接赋值页面不会重新渲染，需要使用setData方法
    this.setData({
      option: options
    })
  },
  //将获取到的各类品种规格的描述整理
  setDesc(){
    let desc = ''
    if(this.data.desc1){
      //如果不为空
      desc += '冠幅'+this.data.desc1+'厘米,'
    }
    if(this.data.desc2){
      //如果不为空
      desc += '高度'+this.data.desc2+'厘米,'
    }
    if(this.data.desc3){
      //如果不为空
      desc += '地径'+this.data.desc3+'厘米,'
    }
    if(this.data.desc4){
      //如果不为空
      desc += '胸径'+this.data.desc4+'厘米'
    }
    if(this.data.desc5){
      //如果不为空
      desc += ','+this.data.desc5
    }
    this.setData({
      desc:desc
    })
  },

  /**
   * 获取分类列表信息
   */
  getCategory() {
    let userId = wx.getStorageSync('wxUserId')
    if (userId) {
      var params = {
        url: '/promotion/categoryList',
        method: 'GET',
        data: {},
        callBack: res => {
          console.log(res)
          this.setData({
            categoryList: res.data
          })
          this.setCategory()
        },
        errBack: res => {
          console.log(res)
        }
      }
      http.request(params)
    }
  },
  /**
  * 发布促销信息
  */
  create() {
    //先整理描述信息
    this.setDesc()
    if (this.check()) {
      let userId = wx.getStorageSync('wxUserId')
      if (userId) {
        var params = {
          url: '/promotion/miniApp',
          method: 'POST',
          data: {
            "area": this.data.area,
            "bz": this.data.bz,
            "cid": this.data.cid,
            "city": this.data.city,
            "contact": this.data.contact,
            "creatorId": userId,
            "description": this.data.desc,
            "dw": '株',
            "phone": this.data.phone,
            "picture": this.data.filePath,
            "price": this.data.price,
            "province": this.data.province,
            "source": this.data.source,
            "stock": this.data.stock,
            "title": this.data.title,
          },
          callBack: res => {
            console.log(res)
            wx.showToast({
              title: '发布成功',
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
    if (this.data.title && this.data.stock && this.data.price != 0 && this.data.cid != 0 && this.data.source && this.data.bz && this.data.desc && this.data.province && this.data.city && this.data.area && this.data.filePath) {
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
  onLoad: function (options) {
    this.setData({
      areaList: area.areaList
    })
    this.getCategory()
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