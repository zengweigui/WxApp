// pages/douban-movie/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中..'
    });
    this.setData({
      movie: JSON.parse(options.movie)
    })
    wx.hideLoading();
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
  
  },
  loadMovie() {
    let self = this;
    // 请求电影数据
    wx.request({
      url: "http://t.yushu.im/v2/movie/top250",
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        q:'战狼',
        start: 0,
        count: 10
      },
      success: function (res) {
        console.log(res)
      }
    });
  }
})