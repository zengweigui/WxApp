let amapFile = require('../../libs/amap-wx.js');
let app = getApp()
Page({
  data: {
    showAgree: true,
    lis: [{
        name: '轮播图',
        explain: '轮播图应用',
        rightArrow: true,
        category: {
          type: 'link',
          value: '/pages/swiper/index'
        }
      },
      {
        name: '瀑布流',
        explain: '图片瀑布流 && 无限加载的效果',
        rightArrow: true,
        category: {
          type: 'link',
          value: '/pages/waterfall/index'
        }
      },
      {
        name: '地铁线路',
        explain: '展示所在城市的地铁线路图',
        rightArrow: true,
        category: {
          type: 'pop',
          value: '开发中'
        }
      },
      {
        name: '地图周边',
        explain: '根据位置搜索周边配套',
        rightArrow: true,
        category: {
          type: 'link',
          value: '/pages/map-periphery/index'
        }
      },
      // {
      //   name: '地图找房',
      //   explain: '搜索定位城市中的房源',
      //   rightArrow: true,
      //   category: {
      //     type: 'link',
      //     value: '/pages/map/index'
      //   }
      // },
      {
        name: '计算器',
        explain: '模拟手机计算器',
        rightArrow: true,
        category: {
          type: 'link',
          value: '/pages/calculator/index/index'
        }
      },
      {
        name: '豆瓣电影',
        explain: '豆瓣API查询影院热映',
        rightArrow: true,
        category: {
          type: 'link',
          value: '/pages/douban-movie/index/index'
        }
      }
    ],
    avatar: '',
    nickName: '',
    city: '',
    temperature: '',
    weather: '',
    weatherIcon: ''
  },
  onLoad: function(options) {
    let self = this;
    // 获取天气数据
    let myAmapFun = new amapFile.AMapWX({
      key: '5829f3bd7941a46f21acf2cbe0e36970'
    });
    myAmapFun.getWeather({
      success: function(data) {
        let city = data.city.data
        let temperature = data.temperature.data
        let weather = data.weather.data
        let weatherIcon;
        if (weather == '晴') {
          weatherIcon = 'icon-qing'
        } else if (weather == '多云') {
          weatherIcon = 'icon-duoyun'
        } else if (weather == '小雨') {
          weatherIcon = 'icon-xiaoyu'
        } else if (weather == '阴天') {
          weatherIcon = 'icon-yintian'
        } else {
          weatherIcon = 'icon-tianqi-fengxiang'
        }
        self.setData({
          city: city,
          temperature: temperature,
          weather: weather,
          weatherIcon: weatherIcon
        })
      },
      fail: function(info) {
        console.log(info)
        self.setData({
          city: '-',
          temperature: '-',
          weather: '-'
        })
      }
    })
    // 判断用户是否授权获取信息
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        showAgree: false
      })
      this.setData({
        avatar: userInfo.avatarUrl,
        nickName: userInfo.nickName
      })
    }
  },
  getUserInfo: function() {
    let self = this
    // 登录
    wx.login({
      success: res => {
        app.globalData.code = res.code
        //取出本地存储用户信息，解决需要每次进入小程序弹框获取用户信息
        app.globalData.userInfo = wx.getStorageSync('userInfo')
        //wx.getuserinfo接口不再支持
        wx.getSetting({
          success: (res) => {
            //判断用户已经授权。不需要点击授权按钮
            if (!res.authSetting['scope.userInfo']) {
              self.setData({
                showAgree: true
              })
            } else { //没有授权需要点击授权按钮
              self.setData({
                showAgree: false
              })
              wx.showLoading({
                title: '加载中...'
              })
            }
          },
          fail: function() {
            wx.showToast({
              title: '系统提示:网络错误',
              icon: 'warn',
              duration: 1500,
            })
          }
        })
      },
      fail: function() {
        wx.showToast({
          title: '系统提示:网络错误',
          icon: 'warn',
          duration: 1500,
        })
      }
    })
  },
  //获取用户信息新接口
  agreeGetUser: function(e) {
    //设置用户信息本地存储
    try {
      this.setData({
        avatar: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName
      })
      wx.setStorageSync('userInfo', e.detail.userInfo)
    } catch (e) {
      wx.showToast({
        title: '系统提示:网络错误',
        icon: 'warn',
        duration: 1500,
      })
    }
    this.setData({
      showAgree: false
    })
    wx.hideLoading()
  },
  clickLi: function(e) {
    if (e.detail.type === "link") {
      wx.navigateTo({
        url: e.detail.value
      })
    } else if (e.detail.type === "pop") {
      wx.showToast({
        title: e.detail.value,
        icon: 'none'
      })
    }
  }
})