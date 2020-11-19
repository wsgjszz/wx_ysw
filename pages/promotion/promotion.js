// pages/promotion/promotion.js
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
    categoryList: [{
      categoryName: '不限',
      id: 0
    }], //分类列表
    areaList: {}, //地区信息列表
    show: false, //是否显示弹出层
  },
  //分类选项改变事件
  onChange(event) {
    if (event.detail.index != 0) {
      this.getPromotion3(1, 6, event.detail.index)
    } else {
      this.getPromotion(1, 6)
    }
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
          this.getPromotion2(1, 6, province, city, area)
        } else {
          this.getPromotion2(1, 6, province, city)
        }
      } else {
        this.getPromotion2(1, 6, province)
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
  handleChange({
    detail
  }) {
    const type = detail.type;
    if (type === 'next') {
      this.setData({
        current: this.data.current + 1
      });
      this.getPromotion(this.data.current, 5)
    } else if (type === 'prev') {
      this.setData({
        current: this.data.current - 1
      });
      this.getPromotion(this.data.current, 5)
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
  //将获取到的分类列表信息设置到分类菜单里
  setCategory(categorys) {
    let categoryList = this.data.categoryList
    for (var i in categorys) {
      let option = {}
      option['categoryName'] = categorys[i].categoryName
      option['id'] = categorys[i].id
      categoryList.push(option)
    }
    // 这里有个bug要注意，直接赋值页面不会重新渲染，需要使用setData方法
    this.setData({
      categoryList: categoryList,
      active: 0
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
          this.setCategory(res.data)
        },
        errBack: res => {
          console.log(res)
        }
      }
      http.request(params)
    }
  },

  /**
   * 分页查询人脉圈信息
   */
  getPromotion(page, size) {
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
        url: '/promotion/promotionList/miniApp' + page + size,
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
  getPromotion2(page, size, province, city, area) {
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
      console.log('/promotion/promotionList/miniApp' + page + size + area + city + province)
      var params = {
        url: '/promotion/promotionList/miniApp' + page + size + area + city + province,
        method: 'GET',
        data: {},
        callBack: res => {
          console.log(res)
          if (res.data != null) {
            // 查询结果不为空
            this.setData({
              list: res.data.items,
              total: res.data.totalPage
            })
          } else {
            wx.showToast({
              title: '该地区没有促销信息',
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
   * 带分类条件的分页查询人脉圈信息
   */
  getPromotion3(page, size, cid) {
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
      if (cid) {
        //如果cid不为空的话
        cid = '&cid=' + cid
      } else {
        cid = ''
      }
      var params = {
        url: '/promotion/promotionList/miniApp' + page + size + cid,
        method: 'GET',
        data: {},
        callBack: res => {
          console.log(res)
          if (res.data != null) {
            // 查询结果不为空
            this.setData({
              list: res.data.items,
              total: res.data.totalPage
            })
          } else {
            wx.showToast({
              title: '该项没有促销信息',
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      areaList: area.areaList
    })
    this.getPromotion(1, 5)
    this.getCategory()
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