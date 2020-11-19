# 园商网
### 项目简介

- 基于微信小程序端的圆木交易平台网站
- 开发技术：前后端分离开发
  - 小程序端使用原生微信小程序框架和Vant和iview组件库
  - 后台管理web端使用layui框架
  - 后台使用springboot框架（本项目不包含）

#### 摘要

1. 产品定位：从用户角度出发，简化线上操作，以苗木为主的供求需求多于线下交易的资源，开发微信小程序端的园商网

2. 目标用户：有苗木供求需求的移动端用户；善于使用微信、了解线上操作的年轻从业者；

3. 需求描述：园林从业者从线下到线上的痛点在于：

   a) 不会线上操作（需要简化操作步骤和界面）

   b) 线上真正功能转化率低（在自然数据流量稳定前，需要大量人工匹配撮合）

   c) 传统行业固有观念(线下人脉交易，线上如何弥补资源人脉的需求）

#### 总体功能

1. 用户端（小程序端）
   （1）用户登录，个人中心

   （2）供求信息模块，展示供求信息，发布信息

   （3）苗圃模块，展示苗圃，创建苗圃

   （4）人脉圈模块，展示人脉圈，加入人脉圈

   （5）低价促销模块，展示促销信息，发布促销信息

2. 管理端（web后台端）
   （1）管理员登录认证

   （2）用户信息管理

   （3）用户反馈信息管理

   （4）供求信息管理

   （5）苗圃信息管理

   （6）人脉圈信息管理

   （7）促销信息管理

   （8）首页轮播图管理

#### 项目架构图

<img src=".\md_img\项目架构图.png" style="zoom:67%;" />

#### 成品效果图

##### 小程序端

<img src=".\md_img\首页.png" style="zoom:67%;" />

<img src=".\md_img\免费发布1.png" style="zoom:67%;" />

<img src=".\md_img\个人中心1.png" style="zoom:67%;" />

<img src=".\md_img\账户详情.png" style="zoom:67%;" />

<img src=".\md_img\低价促销1.png" style="zoom:67%;" />

##### 后台管理端

<img src=".\md_img\登录界面.png" style="zoom:67%;" />

<img src=".\md_img\用户列表.png" style="zoom:67%;" />

<img src=".\md_img\促销信息管理-信息列表.png" style="zoom:67%;" />

### 小程序端

#### 技术原理

- 原生小程序框架：wxml+wxss+json+JavaScript
- View Weapp组件库+Vant Weapp组件库
- 自定义组件化，实现自定义tabbar
- 自定义工具类，统一reque请求方法

#### 目录结构

- compoments：各类自定义组件，如iview和vant等UI组件库
- custom-tab-bar：自定义的tabbar组件
- icons：项目所需图片，图标
- pages：各个页面信息
- utils：各个抽取封装的工具类，如util.js和http.js
- 目录结构图：

<img src=".\md_img\目录结构.png" style="zoom: 67%;" />

#### 功能模块

##### 登录

功能描述： 用户点击授权用户信息，并向服务器获取用户ID

##### 首页

功能描述：首页显示急需买、正在卖、免费发布等模块，点击不同按钮进入相关列表或者链接

- 急需买
  - 需求方发布需要购买的苗木信息列表，点开详细可以看到联系方式、具体要求、联系人等详细信息
- 正在卖
  - 供求方可以发布自己的需要卖的品种信息列表，点开详细可以看到联系方式、联系人、图片等相关信息
- 供求信息详情页面
  - 展示当前的供求信息，有展示图，信息描述，联系人，联系方式等信息
- 免费发布
  - 用户可以免费发布需求的信息或者供求信息，发布供求信息的用户要求是已经过后台管理员审核
  - 用户可选择发布"急需买"或“正在卖”信息，然后填写描述信息，联系人，联系方式，展示图，用苗地和出苗地等信息后提交

##### 优质苗圃

功能描述：后台推荐或者用户自行付费进行苗圃展示，点击链接后进入苗圃首页，点击创建苗圃可生成自己的苗圃信息

- 苗圃首页
  - 分页展示苗圃列表信息，点开可进入苗圃详情页面，展示苗圃详细介绍
- 苗圃详情页面
  - 展示当前的苗圃信息，有展示图，基地名称，基地地址，联系人，联系方式，苗木品种等信息
- 创建苗圃
  - 用户可以填写苗圃名称，基地地址，联系人，联系方式以及展示图片等信息后提交，创建自己的苗圃

##### 人脉圈

功能描述：显示加入人脉圈的用户信息展示，点击链接可查看该用户的详细信息和联系方式，点击加入人脉圈可生成自己的人脉圈信息

- 人脉圈首页
  - 分页展示人脉圈列表信息以及至今联系人数，点击卡片可前往详情页面
  - 顶部有地区选择模块，可以通过地区选择进行条件筛选人脉圈信息
  - 有热门地区模块，可点击直接显示该地区的人脉圈信息
- 人脉圈详情页面
  - 展示当前的人脉圈信息，有头像，姓名，地区，联系方式，个人介绍等信息
- 加入人脉圈
  - 用户可以填写姓名，联系方式，个人头像以及个人介绍等信息后提交，创建自己的人脉圈信息

##### 低价促销

功能描述：是苗圃用户发布的低价处理的苗木信息列表，打开即可查看详细信息

- 促销信息首页
  - 分页展示促销信息列表信息，点击卡片可千万详情页面
  - 顶部有地区选择模块，可以通过地区选择进行条件筛选促销信息
  - 有分类模块，可通过类别进行条件筛选促销信息
- 促销信息详情页面
  - 展示当前的促销详细信息，如图片、联系人、联系电话、规格、价格等
- 发布促销信息
  - 用户可以填写商品名称，商品分类，联系人，联系方式，展示图以及出苗地等信息后提交，创建自己的人脉圈信息

##### 个人中心

功能描述：可以查看已经发布的信息、收藏信息、系统消息、创建的苗圃信息、加入的人脉圈信息，账户信息和客服中心等板块

- 个人中心首页
  - 展示用户头像等信息，显示各类选项列表，如账号信息，已收藏，已发布等
- 已发布信息
  - 展示当前用户发布的供求信息列表，包括“正在卖”和“急需买”信息，可滑动删除该信息
- 已收藏信息
  - 展示当前用户收藏的供求信息列表，包括“正在卖”和“急需买”信息，可点击查看详情，也可滑动取消收藏
- 账号信息设置
  - 展示并修改当前用户信息，如昵称，手机号，性别等，修改信息前需要发送验证码并验证
- 我的苗圃
  - 展示当前用户创建的苗圃信息，可点击查看苗圃详情
- 我的人脉圈
  - 展示当前用户创建的人脉圈信息，可点击查看人脉圈详情
- 联系客服
  - 填写问题类型，问题描述信息后可提交反馈信息至后台处，可以联系客服

#### 重点功能技术

##### 自定义Tabbar

- 使用Vant Weapp的tabbar组件，需要先开启自定义功能

<img src=".\md_img\自定义tabbar.png" style="zoom: 60%;" />

- tabbar的具体代码

```js
//js
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
```

```html
<!-- wxml -->
<van-tabbar active="{{ active }}" bind:change="onChange" 
  active-color="#5bc32c" inactive-color="#9f9f9f">
  <van-tabbar-item wx:for="{{ list }}" wx:key="index" icon="{{ item.icon }}">
    {{item.text}}
  </van-tabbar-item>
</van-tabbar>
```

##### 自定义http工具类，实现reques方法统一

- config.js

```js
//配置信息

var domain = "https://www.yyy888.wang/api"; //统一接口域名，便于测试环境

exports.domain = domain;
```

- http.js

```js
var config = require("config.js");
var domain = config.domain;

//统一的网络请求方法
function request(params, isLogin) {
  // 全局变量
  var globalData = getApp().globalData;
  // 如果正在进行登陆，就将非登陆请求放在队列中等待登陆完毕后进行调用
  if (!isLogin && globalData.isLanding) {
    globalData.requestQueue.push(params);
    return;
  }

  wx.request({
    url: config.domain + params.url, //接口请求地址
    data: params.data,
    header: {}, //小程序端无需token认证
    method: params.method == undefined ? "POST" : params.method,
    dataType: 'json',
    responseType: params.responseType == undefined ? 'text' : params.responseType,
    success: function(res) {
      console.log('request成功')
      if (res.statusCode == 200) {
        //如果有定义了params.callBack，则调用 params.callBack(res.data)
        if (params.callBack) {
          params.callBack(res.data);
        }

      } else if (res.statusCode == 500) {
        wx.showToast({
          title: "服务器出了点小差",
          icon: "none"
        });
      } else if (res.statusCode == 401) {
        // 添加到请求队列
        globalData.requestQueue.push(params);
        // 是否正在登陆
        if (!globalData.isLanding) {
          globalData.isLanding = true
          //重新获取openId,再次请求接口
          getOpenId();
        }
      } else if (res.statusCode == 400) {
        wx.showToast({
          title: res.data,
          icon: "none"
        })

      } else {
        //如果有定义了params.errCallBack，则调用 params.errCallBack(res.data)
        if (params.errCallBack) {
          params.errCallBack(res);
        }
      }
      if (!globalData.isLanding) {
        wx.hideLoading();
      }
    },
    fail: function(err) {
      console.log('request失败')
      wx.hideLoading();
      wx.showToast({
        title: "服务器出了点小差",
        icon: "none"
      });
    }
  })
}

//通过code获取openId,并保存到缓存
var getOpenId = function () {
  wx.login({
    success: res => {
      console.log('code:' + res.code)
      // 发送 res.code 到后台换取 openId
      request({
        login: true,
        url: '/wx/getOpenId',
        method: "GET",
        data: {
          code: res.code
        },
        callBack: result => {
          console.log('请求获取OpenId成功:'+result.data)
          if (result.code == 50000) {
            wx.showModal({
              showCancel: false,
              title: '提示',
              content: '服务器忙碌'
            })
            wx.setStorageSync('openId', '');
          } else {
            //把openId存入缓存，请求接口数据时要用
            wx.setStorageSync('openId', result.data);
            //把openId存入全局变量，请求接口数据时使用
            var globalData = getApp().globalData;
            globalData.openId = result.data;
          }
          var globalData = getApp().globalData;
          globalData.isLanding = false;
          while (globalData.requestQueue.length) {
            request(globalData.requestQueue.pop());
          }
        }
      }, true)
    }
  })
}

//暴露接口
exports.request = request;
exports.getOpenId = getOpenId;
```

##### 使用Vant Weapp和iView Weapp等UI组件库示例

- 在app.json中导入自定义组件

<img src=".\md_img\导入组件.png" style="zoom:67%;" />

- 直接使用导入组件的自定义标签

<img src=".\md_img\使用自定义标签.png" style="zoom:67%;" />

- 有些组件还需要js的data数据和监听事件

<img src=".\md_img\组件js代码.png" style="zoom:67%;" />



### web后台端

#### 技术原理

- 原生web技术：HTML5+CSS3+JavaScript
- jQuery库的ajax异步交互技术
- layui模块化前端UI框架

#### 功能模块

##### 登录

功能描述：管理员输入账号密码进行验证，获取服务器传输过来的token认证信息，并保存数据

##### 用户信息管理

功能描述：查询在小程序端已注册的用户

- 用户列表
  - 分页表格展示用户信息

##### 反馈信息管理

功能描述：查询用户提交的反馈信息，处理并删除

- 反馈信息列表
  - 分页表格展示反馈信息，可点击查看详情或点击删除

##### 供求信息管理

功能描述：查询用户发布的供求信息，可执行修改，删除，置顶等操作

- 供求信息列表
  - 分页表格展示供求信息，可点击查看详情，修改和删除
- 修改供求信息
  - 可修改当前的供求信息，点击保存

##### 苗圃信息管理

功能描述：查询用户发布的苗圃信息，审批信息是否通过，可执行修改，删除等操作

- 待审批列表
  - 分页表格展示待审核的苗圃信息，可点击查看详情，审批通过和审批不通过
- 优质苗圃列表
  - 分页表格展示已通过审核的苗圃信息，可点击查看详情，修改和删除
- 修改供求信息
  - 可修改当前的苗圃信息，点击保存

##### 人脉圈信息管理

功能描述：查询用户发布的人脉圈信息，审批信息是否通过，可执行修改，删除等操作

- 待审批列表
  - 分页表格展示待审核的人脉圈信息，可点击查看详情，审批通过和审批不通过
- 人脉圈列表
  - 分页表格展示已通过审核的人脉圈信息，可点击查看详情，修改和删除
- 修改供求信息
  - 可修改当前的人脉圈信息，点击保存

##### 低价促销信息管理

功能描述：查询用户发布的低价促销信息，可执行修改，删除等操作

- 人脉圈列表
  - 分页表格展示低价促销信息，可点击查看详情，修改和删除
- 修改供求信息
  - 可修改当前的低价促销信息，点击保存
- 分类列表
  - 分页表格展示当前的低价促销分类列表信息，可新增和删除

##### 首页轮播图管理

功能描述：查询当前的首页轮播图信息，可执行新增，更新，删除，是否生效等操作

- 轮播图列表
  - 分页表格展示当前的首页轮播图，可新增，更新和删除，以及是否生效

#### 重点功能技术

##### token认证处理

- 问题描述

  - 由于layui使用的ajax请求是基于jQuery的，所以无法设置请求头，也就无法携带token认证信息

- 解决途径

  - 在登录界面从服务器获取到token信息后，存入layui的data数据中

  ```js
      layui.use(['form', 'jquery'], function () {
          var form = layui.form,
              $ = layui.jquery;
              
          form.on('submit(login)', function (data) {
              $.ajax({
                  url: 'https://www.yyy888.wang/api/manage/login',
                  method: 'post',
                  data: data.field,
                  dataType: 'JSON',
                  success: function (res) {
                      if (res.code === 20000) {
                          //请求成功后，写入 access_token
                          layui.data('header', {
                              key: "token",
                              value: res.data
                          });
                          //登入成功的提示与跳转
                          layer.msg(res.msg, {
                              offset: '15px',
                              icon: 1,
                              time: 1000
                          }, function () {
                              location.href = "./index.html"
                          });
                      } else {
                          layer.msg(res.msg, {
                              offset: '15px',
                              icon: 1,
                              time: 1000
                          });
                      }
                  },
                  error: function (data) {
                      alert("服务器繁忙");
                  }
              })
              return false;//阻止表单跳转
          })
      });
  ```

  - 修改layui的table.js源码

  ```js
              //修改源码，使得ajax请求带上token请求头
              a.contentType && 0 == a.contentType.indexOf("application/json") && (d = JSON.stringify(d)), t.ajax({
                  type: a.method || "get",
                  url: a.url,
                  contentType: a.contentType,
                  data: d,
                  dataType: "json",
                  headers: {"token": layui.data('header')['token']},
                  success: function (t) {
                      if (t.code == 801) {
                          top.location.href = "index";
                      } else {
                          "function" == typeof a.parseData && (t = a.parseData(t) || t), t[n.statusName] != n.statusCode ? (i.renderForm(), i.layMain.html('<div class="' + f + '">' + (t[n.msgName] || "返回的数据不符合规范，正确的成功状态码 (" + n.statusName + ") 应为：" + n.statusCode) + "</div>")) : (i.renderData(t, e, t[n.countName]), o(), a.time = (new Date).getTime() - i.startTime + " ms"), i.setColsWidth(), "function" == typeof a.done && a.done(t, e, t[n.countName])
                      }
                  },
                  error: function (e, t) {
                      i.layMain.html('<div class="' + f + '">数据接口请求异常：' + t + "</div>"), i.renderForm(), i.setColsWidth()
                  },
                  complete: function (xhr, data) {
                      layui.data('header', {
                          key: "token",
                          value: xhr.getResponseHeader("token") == null ? layui.data('header')['token'] : xhr.getResponseHeader("token")
                      })
                  }
              })
              //修改源码结束
  ```

  - 修改jquery源码

  ```js
  //修改ajax源码，使得每次请求带上token的请求头
      pe.extend({
          active: 0,
          lastModified: {},
          etag: {},
          ajaxSettings: {
              url: en,
              type: "GET",
              isLocal: Vt.test(tn[1]),
              global: !0,
              processData: !0,
              async: !0,
              headers: {"token": layui.data('header')['token']},
              contentType: "application/x-www-form-urlencoded; charset=UTF-8",
              accepts: {
                  "*": Zt,
                  text: "text/plain",
                  html: "text/html",
                  xml: "application/xml, text/xml",
                  json: "application/json, text/javascript"
              },
              contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
              responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
              converters: {"* text": String, "text html": !0, "text json": pe.parseJSON, "text xml": pe.parseXML},
              flatOptions: {url: !0, context: !0}
          },
       //修改源码结束
  ```

  - 修改layui.all.js源码(若不使用非模块化，则无需修改)

  ```js
      //修改ajax源码，使得每次请求带上token的请求头
      pe.extend({
          active: 0,
          lastModified: {},
          etag: {},
          ajaxSettings: {
              url: en,
              type: "GET",
              isLocal: Vt.test(tn[1]),
              global: !0,
              processData: !0,
              async: !0,
              headers: {"token": layui.data('header')['token']},
              contentType: "application/x-www-form-urlencoded; charset=UTF-8",
              accepts: {
                  "*": Zt,
                  text: "text/plain",
                  html: "text/html",
                  xml: "application/xml, text/xml",
                  json: "application/json, text/javascript"
              },
              contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
              responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
              converters: {"* text": String, "text html": !0, "text json": pe.parseJSON, "text xml": pe.parseXML},
              flatOptions: {url: !0, context: !0}
          },
          //修改源码结束
  ```

- 处理效果

  - 待登录获取token后，后续的ajax请求都可以直接访问，请求头会自动携带token认证信息
  - 若layui的data数据中的token信息为空，自动跳转回登录页面
