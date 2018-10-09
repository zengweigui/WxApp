import { IndexModel } from '../../models/index.js'
let indexModel = new IndexModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    autoplay: true,
    interval: 3000,
    indicatorDots: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中..'
    });
    indexModel.getBanner((res) => {
      console.log(res);
      let imgUrls = this.data.imgUrls
      for (let i = 0; i < res.feedList.length; i++) {
        if (res.feedList[i].images.length != 0) {
          imgUrls.push('https://photo.tuchong.com/' + res.feedList[i].images[0].user_id + '/f/' + res.feedList[i].images[0].img_id + '.jpg')
        }
      }
      this.setData({
        imgUrls: imgUrls
      })
      wx.hideLoading();
    })
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