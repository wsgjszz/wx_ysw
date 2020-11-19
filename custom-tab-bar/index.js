Component({
  data: {
    active: 0,
    list: [
      {
        icon: 'column',
        text: '供求信息',
        url: '/pages/index/index'
      },
      {
        icon: 'flower-o',
        text: '优质苗圃',
        url: '/pages/garden/garden'
      },
      {
        icon: 'location-o',
        text: '人脉圈',
        url: '/pages/circle/circle'
      },
      {
        icon: 'balance-o',
        text: '低价促销',
        url: '/pages/promotion/promotion'
      },
      {
        icon: 'user-o',
        text: '我的',
        url: '/pages/user/user'
      }
    ]
  },

  methods: {
    onChange(event) {
      this.setData({ active: event.detail });
      console.log('跳转到' + this.data.list[event.detail].url)
      wx.switchTab({
        url: this.data.list[event.detail].url
      });
    },

    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
});
