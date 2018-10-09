Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    start: 0,
    loadmore: '加载更多...',
    loadmoreShow: false,
    isFinish: false,
    isEmpty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.showLoading({
      title: '加载中'
    })
    let start = this.data.start
    this.loadMovie(start);
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
    let start = this.data.start + 10
    this.loadMovie(start);
    this.setData({
      start: start
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  loadMovie(start) {
    let self = this;
    // 判断是否全部加载
    let isFinish = self.data.isFinish
    if (isFinish) return;

    if (start != 0) {
      this.setData({
        loadmoreShow: true,
        loadmore: '加载更多...'
      })
    }

    // 请求电影数据
    wx.request({
      url: "http://t.yushu.im/v2/movie/top250",
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        start: start,
        count: 10
      },
      success: function(res) {
        let movies = self.data.movies
        let subjects = res.data.subjects;
        // 如果为返回数据长度为0，则全部加载完成
        if (subjects.length === 0) {
          self.setData({
            loadmoreShow: true,
            loadmore: '数据已全部加载',
            isFinish: true
          });
          return;
        }
        movies = [...movies, ...subjects]
        let isEmpty;
        if (movies.length === 0) {
          isEmpty == true
        }
        self.setData({
          "movies": movies,
          "isEmpty": isEmpty
        });
        wx.hideLoading()
      }
    });
  },
  // 进入影片详情
  clickMovie: function (e) {
    console.log(e.detail)
    wx.navigateTo({
      url: '../detail/index?movie=' + JSON.stringify(e.detail)
    })
  }
})