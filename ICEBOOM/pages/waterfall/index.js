import {
  IndexModel
} from '../../models/index.js'
let indexModel = new IndexModel();

let leftH = 0;
let rightH = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    imgList: [],
    left: [],
    right: []
  },
  getImages: function() {
    wx.showLoading({
      title: '加载中..'
    });
    indexModel.getBanner((res) => {
      let list = this.data.list
      let imgList = this.data.imgList

      let oImgW //图片原始宽度
      let oImgH //图片原始高度
      let scale //比例计算
      let imgHeight //自适应高度
      let left = [];
      let right = [];

      for (let i = 0; i < res.feedList.length; i++) {
        if (res.feedList[i].images.length != 0) {
          // list赋值
          let obj = {}
          let url = 'https://photo.tuchong.com/' + res.feedList[i].images[0].user_id + '/f/' + res.feedList[i].images[0].img_id + '.jpg'
          oImgW = res.feedList[i].images[0].width;
          oImgH = res.feedList[i].images[0].height;
          obj.url = url
          obj.width = oImgW
          obj.height = oImgH
          list.push(obj)
          // imgList赋值
          imgList.push(url)
          // 
          scale = 350 / oImgW; //比例计算
          imgHeight = oImgH * scale; //自适应高度

          let imageObj = obj;
          imageObj.height = imgHeight;

          left = this.data.left;
          right = this.data.right;

          //判断当前图片添加到左列还是右列
          if (leftH <= rightH) {
            left.push(imageObj);
            leftH += imgHeight;
          } else {
            right.push(imageObj);
            rightH += imgHeight;
          }
        }
      }
      this.setData({
        list: list,
        imgList: imgList,
        left: left,
        right: right
      })
      wx.hideLoading();
    })
  },
  preview: function(e) {
    let src = e.currentTarget.dataset.src; //获取data-src
    console.log(src, this.data.imgList);
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: this.data.imgList // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getImages();
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
    this.getImages();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})