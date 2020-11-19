// pages/index/sale/sale.js
var http = require("../../../utils/http.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    demandList: [], //急需买信息列表
    stars: [], //当前用户的收藏列表
    show: true, //true显示全部，false显示收藏
    //vant组件数据
    option: [{
      text: '全部',
      value: 0
    },
    {
      text: '收藏',
      value: 1
    }
    ],
    value: 0, //菜单选项值
    current: 1, //当前页
    total: 0, //总页数
  },

  //vant组件方法
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onClick(event) {
    wx.showToast({
      title: `点击标签 ${event.detail.name}`,
      icon: 'none'
    });
  },
  //下拉菜单选项值改变事件
  onChange(event) {
    if (event.detail != this.data.option.value) {
      //选项值发生变化
      let value = this.data.option[event.detail].value
      if (value == 0) {
        //获取全部
        console.log('获取全部')
        this.setData({
          show: true,
          current: 1
        })
        this.selectInfo(1, 6)
      } else if (value == 1) {
        //获取收藏
        console.log('获取收藏')
        this.setData({
          show: false,
          current: 1
        })
        this.getStars(1, 6)
      }
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
      if (this.data.show) {
        this.selectInfo(this.data.current, 6)
      } else {
        this.getStars(this.data.current, 6)
      }
      this.goTop();
    } else if (type === 'prev') {
      this.setData({
        current: this.data.current - 1
      });
      if (this.data.show) {
        this.selectInfo(this.data.current, 6)
      } else {
        this.getStars(this.data.current, 6)
      }
      this.goTop();
    }
  },
  //前往联系详情页面
  toDetail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: './detail/detail?id=' + id,
    })
  },

  /**
   * 分页获取急需买信息
   * page:当前页码，size:每页数量
   */
  selectInfo(page, size) {
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
        url: '/trade/supplyList/miniApp/' + userId + page + size,
        method: 'GET',
        data: {},
        callBack: res => {
          console.log(res)
          this.setData({
            demandList: res.data.items,
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
   * 获取当前用户的收藏信息
   */
  getStars(page, size) {
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
        url: '/trade/supplyList/collection/miniApp/' + userId + page + size,
        method: 'GET',
        data: {},
        callBack: res => {
          console.log('获取收藏信息成功')
          console.log(res)
          this.setData({
            stars: res.data.items,
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
  //发送收藏请求
  onStar(event) {
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    let userId = wx.getStorageSync('wxUserId')
    if (userId) {
      var params = {
        url: '/trade/collection/' + userId + '/' + id,
        method: 'PUT',
        data: {},
        callBack: res => {
          console.log(res)
          console.log('收藏成功')
          console.log(this.data.show)
          if (this.data.show) {
            let listCollectioned = 'demandList[' + index + '].collectioned'
            this.setData({
              [listCollectioned]: true
            })
          } else {
            let listCollectioned = 'stars[' + index + '].collectioned'
            this.setData({
              [listCollectioned]: true
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
   * 发送取消收藏请求
   */
  downStar(event) {
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id;
    let userId = wx.getStorageSync('wxUserId')
    if (userId) {
      var params = {
        url: '/trade/uncollection/' + userId + '/' + id,
        method: 'PUT',
        data: {},
        callBack: res => {
          console.log(res)
          console.log('取消收藏成功')
          if (this.data.show) {
            let listCollectioned = 'demandList[' + index + '].collectioned'
            this.setData({
              [listCollectioned]: false
            })
          } else {
            let listCollectioned = 'stars[' + index + '].collectioned'
            this.setData({
              [listCollectioned]: false
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


  // 获取滚动条当前位置
  onPageScroll(e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  //回到顶部
  goTop(e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.selectInfo(1, 6)
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