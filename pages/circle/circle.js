// pages/circle/circle.js
var http = require("../../utils/http.js");
var area = require("../../utils/area.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], //人脉圈信息
    area: '', //选中地区
    city: '', //选中城市
    province: '', //选择省份
    current: 1, //当前页
    total: 0, //总页数
    hot: ['郑州', '信阳', '武汉', '成都'], //热门地区
    areaList: {}, //地区信息列表
    show: false, //是否显示弹出层
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
    let province = ''
    let city = ''
    let area = ''
    try {
      province = event.detail.values[0].name
      if (event.detail.values[1].name) {
        //城市选项不为空
        city = event.detail.values[1].name
        if (event.detail.values[2].name) {
          //地区选项不为空
          area = event.detail.values[2].name
          this.getCircle2(1, 6, province, city, area)
        } else {
          this.getCircle2(1, 6, province, city)
        }
      } else {
        this.getCircle2(1, 6, province)
      }
      //设置弹出层显示状态
      this.setData({
        show: false
      });
    } catch (e) {
      //选择了不正确选项
      wx.showToast({
        title: '请选择正确的地区',
        icon: 'none'
      })
    }
  },
  //分页事件
  handleChange({ detail }) {
    const type = detail.type;
    if (type === 'next') {
      this.setData({
        current: this.data.current + 1
      });
      this.getCircle(this.data.current, 5)
    } else if (type === 'prev') {
      this.setData({
        current: this.data.current - 1
      });
      this.getCircle(this.data.current, 5)
    }
  },
  //前往详情页面
  toDetail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: './detail/detail?id=' + id,
    })
  },
  //前往创建苗圃页面
  toCreate(event) {
    wx.navigateTo({
      url: './create/create',
    })
  },

  /**
 * 分页查询人脉圈信息
 */
  getCircle(page, size) {
    let userId = wx.getStorageSync('wxUserId')
    if (userId) {
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
        url: '/circle/getCircleList/miniApp' + page + size,
        method: 'GET',
        data: {},
        callBack: res => {
          console.log(res)
          this.setData({
            list: res.data.items,
            total: res.data.totalPage
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
* 带地区条件的分页查询人脉圈信息
*/
  getCircle2(page, size, province, city, area) {
    let userId = wx.getStorageSync('wxUserId')
    if (userId) {
      if (area) {
        area = '&area=' + area
      } else {
        area = ''
      }
      if (city) {
        city = '&city=' + city
      } else {
        city = ''
      }
      if (province) {
        //如果province不为空的话
        province = '&province=' + province
      } else {
        province = ''
      }
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
      console.log('/circle/getCircleList/miniApp' + page + size + area + city + province)
      var params = {
        url: '/circle/getCircleList/miniApp' + page + size + area + city + province,
        method: 'GET',
        data: {},
        callBack: res => {
          console.log(res)
          if(res.data!=null){
            // 查询结果不为空
            this.setData({
              list: res.data.items,
              total: res.data.totalPage
            })
          }else{
            wx.showToast({
              title: '该地区没有人脉圈',
              icon: 'none'
            })
          }
        },
        errBack: res => {
          console.log(res)
        }
      }
      http.request(params)
    }
  },
  /**
   * 前往热门地区
   */
  toHot(event){
    console.log(event.currentTarget.dataset.area)
    this.getCircle2(1, 6,'', event.currentTarget.dataset.area+'市')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      areaList: area.areaList
    })
    this.getCircle(1, 5)
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