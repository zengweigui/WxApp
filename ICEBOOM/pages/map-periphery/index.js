let amapFile = require('../../libs/amap-wx.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    aroundList: [{
        name: '地铁',
        id: '150500'
      },
      {
        name: '公交',
        id: '150700'
      },
      {
        name: '餐饮',
        id: '050000'
      },
      {
        name: '购物',
        id: '060000'
      },
      {
        name: '体育休闲',
        id: '080000'
      },
      {
        name: '医疗',
        id: '090000'
      },
      {
        name: '银行',
        id: '160000'
      },
      {
        name: '学校',
        id: '141200'
      }
    ],
    latitude: 22.552499,
    longitude: 114.061543,
    scale: 12,
    markers: [],
    points: [],
    location: '',
    showLocation: true,
    word: '',
    category: '',
    aroundDetails: []
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
    this.getLocation()
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

  },
  getLocation: function() {
    let self = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        let latitude = res.latitude
        let longitude = res.longitude
        let speed = res.speed
        let accuracy = res.accuracy

        self.setData({
          latitude: latitude,
          longitude: longitude,
          scale: 20
        });
      }
    })
  },
  search: function(e) {
    wx.showLoading({
      title: '加载中..'
    });
    let word = e.target.dataset.word
    let category = e.target.dataset.category
    this.setData({
      word: word,
      category: category
    })
    this.getAround(word, category)
  },
  getAround(word, category) {
    //通过关键词获取附近的点，只取前十个，同时保证十个点在地图中显示
    let self = this;
    let myAmapFun = new amapFile.AMapWX({
      key: '5829f3bd7941a46f21acf2cbe0e36970'
    });
    myAmapFun.getPoiAround({
      // iconPath: '/images/marker-sprite-bg.png',
      // iconPathSelected: '/images/markers-red-icon.png',
      querykeywords: word,
      querytypes: category,
      location: self.data.longitude + ',' + self.data.latitude,
      radius: 100,
      sortrule: 'distance',
      success(data) {
        console.log(data)
        if (data.poisData.length != 0) {
          let markers = [],
            points = [];
          for (let value of data.markers) {
            if (value.id > 9) break;
            if (value.id == 0) {
              self.setData({
                name: value.name,
                address: value.address,
                isShow: true
              })
            }
            markers.push({
              id: value.id,
              latitude: value.latitude,
              longitude: value.longitude,
              title: value.name,
              iconPath: value.iconPath,
              width: 32,
              height: 32,
              anchor: {
                x: .5,
                y: 1
              }
            });
            points.push({
              latitude: value.latitude,
              longitude: value.longitude
            })
          }
          self.setData({
            markers: markers,
            points: points,
            showLocation: true
          })
          wx.hideLoading();
        }
        if (data.poisData.length != 0) {
          let aroundDetails = [];
          for (let value of data.poisData) {
            let obj = {}
            obj.name = value.name
            obj.address = value.address
            obj.distance = value.distance

            aroundDetails.push(obj)
          }
          self.setData({
            aroundDetails: aroundDetails
          })
        }
      },
      fail: function(error) {
        console.log(error.errMsg)
        wx.showToast({
          title: error.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})